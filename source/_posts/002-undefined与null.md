---
title: undefined与null
date: 2019-04-20 22:29:23
tags: 
categories: JS
---
# undefined与null的区别

undefined与null 都是JS的原始类型，

null转换为数值为0，undefined转换为数值为NaN

undefined和null与其他类型的值比较时，结果都为false，它们互相比较时结果为true。

- **undefined**
  - 当声明的变量还未被初始化时，变量的默认值为undefined
  - 调用函数时，应该提供的参数没提供，则该参数为undefined
  - 函数没有返回值时，默认返回undefined
  - 对象没有赋值的属性

- **null**
  - null表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象
  - 作为函数的参数，表示参数不是对象
  - 作为对象原型链的终点( Object.getPrototypeOf(Object.prototype) )

```js
typeof( undefined ) //undefined

typeof( null )  // object

null == undefined  //true

null === undefined // false
```
