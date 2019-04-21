---
title: == & === & Object.is()
date: 2019-04-20 22:41:27
tags: 
categories: JS
---
# ==

- **==** 会进行隐式类型转换

  - undefined和null与其他类型的值比较时，结果都为false，它们互相比较时结果为true。

  ```js
    false == null     // false
    false == undefined  // flase
    null == undefined   // true
    
    '' == '0'       // false
    0 == ''     // true
    0 == '0'    // true
    
    false == "false"  // false
    false == '0'      // true
    ```

  - 一个基本数据类型与一个引用数据类型 ：会将对象转化为它的原始值，在与基本数据类型进行比较。

  ```js
      var arr = [1,2];
      var str = "1,2";
      alert(arr == str);  //内部执行valueOf()，将arr值转化为原始值，但是arr并没有变化，显示true
  ```

# ===
- **===** 严格等于， 要求类型相同，并且值相等；类型不同就会返回false

  - 数值比较时，如果有一个是NaN，则不相等。
    - NaN === NaN // false  
      - 判断一个值是否是NaN可以用isNaN()或者Object.is()
  - +0 === -0  // true

# Object.is()
- **Object.is()** ES6新增的用来比较严格相等的方法，基本行为与 === 一致

  - 不同之处：
    - Object.is(+0, -0)   //false
    - Object.is(NaN, NaN) //true
