---
title: Promise的队列与setTimeout的队列有何关联
date: 2019-04-20 22:53:19
tags: promise
categories： JS
---
**一个栗子：**
```js
setTimeout(function(){
  console.log(4)
},0); 
new Promise(function(resolve){
  console.log(1) 
  for( var i=0 ; i<10000 ; i++ ){ 
    i==9999 && resolve() 
  } 
  console.log(2) 
}).then(function(){
  console.log(5) 
}); 
console.log(3);
```
为什么结果是：1,2,3,5,4 
而不是：1,2,3,4,5

原因：

1.一个浏览器只能有一个事件循环，但是**任务队列可以有多个**。整个script代码，放在了macrotask queue中，setTimeout也放入macrotask queue。
2.但是，promise.then放到了另一个任务队列**microtask queue**中。这两个任务队列执行顺序如下，**取1个macrotask queue中task，执行之**。**然后把所有microtask queue顺序执行完**，再取macrotask queue中的下一个任务。
3.代码开始执行时，所有这些代码在macrotask queue中，取出来执行之。后面遇到了setTimeout，又加入到macrotask queue中，然后，遇到了promise.then，**放入到了另一个队列microtask queue**。
4.等整个execution context stack执行完后，下一步该取的是**microtask queue**中的任务了。因此promise.then的回调比setTimeout先执行。

任务队列：
**macro-task:**（整体代码）、`settimeout`、`setInterval`、`setImmediate`、`requestAnimationFarme`、`I/O`、`UI rendering`
**micro-task:**`process.nextTick`、`Promises`(浏览器原生Promise)、`Object.observe`、`MutationObserver`

```js
setImmediate(function(){ 
  console.log(1); 
},0); 
setTimeout(function(){ 
  console.log(2); 
},0); 
new Promise(function(resolve){ 
  console.log(3); resolve(); 
  console.log(4); 
}).then(function(){ 
  console.log(5); 
}); console.log(6); 
process.nextTick(function(){ 
  console.log(7); 
}); 
console.log(8);

```
结果：3 4 6 8 7 5 2 1

事件注册顺序：
**setImmediate - setTimeout - promise.then - process.nextTick**

我们得到了优先级关系如下：
**process.nextTick > promise.then > setTimeout > setImmediate**
