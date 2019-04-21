---
title: for、for...of、for...in
date: 2019-04-20 22:38:16
tags: 
categories: JS
---

# for 、for...of、for...in区别

- forEach()
  - foeEach()不能使用break语句跳出循环，或者使用return从函数体内返回
- for-in()
  - 为循环“enumerable”对象设计的
  - 循环遍历对象自身和继承的可枚举属性（不含Symbol）
  - 会循环原型链和手动添加的键，返回**键名**key
  - 某些情况下，循环**顺序随机**的
- for-of()（ES6）
  - 可以使用break,continue,return
  - 支持**数组**和**类数组**对象的遍历，循环读取**键值**
  - 也支持**字符串**的遍历
