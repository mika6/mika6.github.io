---
title: this指向小结
date: 2019-04-20 22:57:56
tags: this
categories: JS
---

- 在**全局环境下**，this 始终指向全局对象（window），无论严格与否

- **函数上下文调用**
  - 函数直接调用
    - 非严格模式：this 指向全局对象 window
    - 严格模式：this 为 undefined
  - 对象中的 this
    - 函数的定义位置不影响其 this 指向，this 指向只和调用函数的对象有关。
    - 多层嵌套的对象，内部方法的 this 指向离被调用函数最近的对象（window 也是对象，其内部对象调用方法的 this 指向内部对象， 而非 window）。
- **原型链中的 this**，指向调用它的对象（谁调用指向谁），以上对于函数作为 getter & setter 调用时同样适用。
- **构造函数中**，构造函数中的 this 与被创建的新对象绑定。
  - 注意：当构造器返回的默认值是一个 this 引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回 this。
- **call&apply**
  - 当函数通过 Function 对象的原型中继承的方法 call() 和 apply() 方法调用时， 其函数内部的 this 值可绑定到 call() & apply() 方法指定的第一个对象上， 如果第一个参数不是对象，JavaScript 内部会尝试将其转换成对象然后指向它。
- **bind**
  - bind 方法在 ES5 引入， 在 Function 的原型链上， `Function.prototype.bind`。**通过 bind 方法绑定后， 函数将被永远绑定在其第一个参数对象上， 而无论其在什么情况下被调用。**
- **DOM 事件处理函数中的 this & 内联事件中的 this**
  - DOM 事件处理函数：当函数被当做监听事件处理函数时，其 this 指向触发该事件的元素（针对 addEvenetListener）
  - 内联事件
    - 当代码被内联处理函数调用时，它的 this 指向监听器所在元素
    - 当代码被包括在函数内部执行时，其 this 指向等同于**函数直接调用**的情况，
      - 在非严格模式下指向全局对象 window
      - 在严格模式下指向 undefined
- **setTineout&setInterval**
  - 对于延时函数内部的回调函数的 this 指向全局对象 window（当然我们可以通过 bind 方法改变其内部函数的 this 指向）
- **箭头函数中的 this**
  - 由于箭头函数不绑定 this， 它会捕获其所在（即定义的位置）上下文的 this 值， 作为自己的 this 值，
  - 所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
  - 考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）
  - 作为方法的箭头函数 this 指向全局 window 对象，而普通函数则指向调用它的对象

参考：https://www.cnblogs.com/dongcanliang/p/7054176.html
