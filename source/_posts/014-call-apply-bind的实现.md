---
title: call/apply/bind的实现
date: 2019-04-27 15:38:28
tags:
categories: JS
---

三个方法的作用：

- 改变`this`的指向
- 传参
- call/apply 返回函数结果，bind 返回新的函数

## call 的实现

- ES3 的写法

```js
FUnction.prototype.mycall = function(obj){
    var obj = obj || window
    obj.fn = this
    var args = []
    // 使用eval，会将传入的字符串当做JS解析，所以下面push的是字符串
    for(var i=1, len = arguments.length; i<len; i++){
        args.push('arguments['+ i +'])
    }
    var res = eval('obj.fn('+ args +')')
    delete obj.fn
    return res
}
```

- 使用 ES6

```js
Function.prototype.mycall = function(obj) {
  let obj = obj || window;
  obj.fn = this;
  let args = [...arguments].slice(1);
  let res = obj.fn(...args);
  delete obj.fn;
  return res;
};
```

## apply 实现

- ES3 的写法

```js
Function.prototype.myApply(obj,arr){
    var obj = obj || window
    obj.fn = this
    var res
    var args = []
    if(!arr){
        res = obj.fn()
    }else{
    // 使用eval，会将传入的字符串当做JS解析，所以下面push的是字符串
        for(var i=1, len = arr.length; i<len; i++){
            args.push('arr['+ i +']')
        }
        res = eval('obj.fn('+ args+')')
    }
    delete obj.fn
    return res
}
```

- 使用 ES6

```js
Function.prototype.myApply(obj, arr){
    let obj = obj || window
    obj.fn = this
    let res
    if(!arr){
        res = obj.fn()
    }else{
        res = obj.fn(...arr)
    }
    delete obj.fn
    return res
}
```

## bind 的实现

- ES3 的写法

```JS
Function.prototype.myBind = function(obj) {
  if (typeof this !== "function") {
    throw new TypeError("this is not a function")
  }
  var self = this
  var arg = [].slice.call(arguments, 1)
  var fBind = function() {
    var bindArgs = [].slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : obj || window,
      args.concat(bindArgs)
    )
  }
  //创建中转函数，让fBind间接继承目标的原型
  var fNOP = function() {
    fNOP.prototype = this.prototype
    fBInd.prototype = new fNOP()
  }
  return fBind
}
```
