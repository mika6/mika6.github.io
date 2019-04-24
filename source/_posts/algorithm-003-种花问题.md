---
title: LeetCode-605 种花问题
date: 2019-04-22 18:34:28
tags: 算法
categories: 数据结构与算法
---
## 题目描述

假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

示例 1:

输入: flowerbed = [1,0,0,0,1], n = 1
输出: True
示例 2:

输入: flowerbed = [1,0,0,0,1], n = 2
输出: False
注意:

数组内已种好的花不会违反种植规则。
输入的数组长度范围为 [1, 20000]。
n 是非负整数，且不会超过输入数组的大小。

## 问题分析

=> 如果题目没有给出1、0的描述，应该首先将问题抽象成出来；
=>怎么才能种花？两种情况
    => 边界情况：
        => 左边界：00...,01...只有在第第一个位置为0，且第二个位置为零的时候，左边第一个位置才能种花
        => 右边界：...00,...10 右边能不能种花，取决于倒数第二个位置，如果为零，则最右边可以种花
    =>中间情况： 000... 只有某元素左右两边都是0的时候，中间该元素才能种花

## 代码

```js
let flowers = (field, n) => {
    //记录最多能种多少
    let count = 0
    // 为了最右边位置能够比较左右元素值，这里添加一个默认元素0
    field.push(0)
    for(let i=0, len=field.length-1; i<len; i++){
        // 如果i位置上的元素是0，才进行判断，否则直接跳到下个元素
        if(field[i] === 0){
            if(i === 0 && field[1] === 0){
                count++
                // 这里应该多跳过一个元素
                i++
            }else if(field[i-1] === 0 && field[i+1] === 0){
                count ++
                i++
            }
        }
    }
    return count >= n
}

// test
let field1 = [1,0,0,0,1]
let field2 = [0,0,1,0,0,0,1,0]
let field3 = [0,0,1,0,0,0,1,0,0]
console.log('field1-1',flowers(field1, 1)) // true
console.log('field1-2',flowers(field1, 2)) // false
console.log('field2-2',flowers(field2, 2)) // true
console.log('field3-3',flowers(field3, 3)) // true
```
