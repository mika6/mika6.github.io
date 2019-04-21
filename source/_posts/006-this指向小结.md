---
title: 006-this指向小结
date: 2019-04-20 22:57:56
tags: this
---
- 在**全局环境下**，this始终指向全局对象（window），无论严格与否

- **函数上下文调用**
  - 函数直接调用
    - 非严格模式：this指向全局对象window
    - 严格模式：this为undefined
  - 对象中的this
    - 函数的定义位置不影响其this指向，this指向只和调用函数的对象有关。
    - 多层嵌套的对象，内部方法的this指向离被调用函数最近的对象（window也是对象，其内部对象调用方法的this指向内部对象， 而非window）。
- **原型链中的this**，指向调用它的对象（谁调用指向谁），以上对于函数作为getter & setter 调用时同样适用。
- **构造函数中**，构造函数中的this与被创建的新对象绑定。
  - 注意：当构造器返回的默认值是一个this引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回this。
- **call&apply**
  - 当函数通过Function对象的原型中继承的方法 call() 和 apply() 方法调用时， 其函数内部的this值可绑定到 call() & apply() 方法指定的第一个对象上， 如果第一个参数不是对象，JavaScript内部会尝试将其转换成对象然后指向它。
- **bind**
  - bind方法在ES5引入， 在Function的原型链上， `Function.prototype.bind`。**通过bind方法绑定后， 函数将被永远绑定在其第一个参数对象上， 而无论其在什么情况下被调用。**
- **DOM事件处理函数中的this & 内联事件中的this**
  - DOM事件处理函数：当函数被当做监听事件处理函数时，其this指向触发该事件的元素（针对addEvenetListener）
  - 内联事件
    - 当代码被内联处理函数调用时，它的this指向监听器所在元素
    - 当代码被包括在函数内部执行时，其this指向等同于**函数直接调用**的情况，
      - 在非严格模式下指向全局对象window
      - 在严格模式下指向undefined
- **setTineout&setInterval**
  - 对于延时函数内部的回调函数的this指向全局对象window（当然我们可以通过bind方法改变其内部函数的this指向）
- **箭头函数中的this**
  - 由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，
  - 所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
  - 考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）
  - 作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象

参考：https://www.cnblogs.com/dongcanliang/p/7054176.html