---
title: LeetCode-914 卡牌分组
date: 2019-04-22 15:45:23
tags: 算法
categories: 数据结构与算法
---
## 题目描述

给定一副牌，每张牌上都写着一个整数。

此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

每组都有 X 张牌。
组内所有的牌上都写着相同的整数。
仅当你可选的 X >= 2 时返回 true。

示例 1：

输入：[1,2,3,4,4,3,2,1]
输出：true
解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
示例 2：

输入：[1,1,1,2,2,2,3,3]
输出：false
解释：没有满足要求的分组。
示例 3：

输入：[1]
输出：false
解释：没有满足要求的分组。
示例 4：

输入：[1,1]
输出：true
解释：可行的分组是 [1,1]
示例 5：

输入：[1,1,2,2,2,2]
输出：true
解释：可行的分组是 [1,1]，[2,2]，[2,2]

提示：

1 <= deck.length <= 10000
0 <= deck[i] < 10000

## 问题分析：

题目要求每组都有 x 张牌，=> 那么只有当牌上整数对应的数量是 x 的倍数的时候，才能成功分组，
=> 也就是要求最大公约数，
=> 先对整副牌进行排序，统计不同整数的数量
=> 关键点在于求两个数的最大公约数，然后再与其他数求公约数
假設兩個數a,b
当 a = c*b 时，b就是最大公约数
当 a = c*b + d时，继续寻找 b 和 d 的关系
                  当 b = d 时，d就是最大公约数
                  当 b = e*d + f时，继续寻找 d 和 f 的关系
重复上述过程，直到能够被整除，这也就是一个递归的过程

## 代码

```js
let grouping = arr => {
    //求兩個數的最大公约数
  let greatestComDivisor = (a, b) => {
    if (b === 0) {
      return a;
    } else {
        return greatestComDivisor(b, a%b)
    }
  };
  // 用正则将不同整数分组存放，
  let cards = arr.sort((x,y)=>x-y).join('').match(/(\d)\1+|\d/g)
  while(cards.length > 1){
    let a = cards.shift().length
    let b = cards.shift().length
    let num = greatestComDivisor(a, b)
    if(num === 1){
      return false
    }else(
      //插入公约数个#号，进入下一轮比较
      cards.unshift('#'.repeat(num))
    )
  }
  // 如果cards为空，则没有最大公约数，否则看第一个元素长度，如果大于1，则为true
  return cards.length ? cards[0].length > 1 : false
};

//test
let ret = grouping([1,1,2,2,2,2])
console.log(ret) // true

let ret2 = grouping([1,1,1,2,2,2,3,3])
console.log(ret2) // false
```
