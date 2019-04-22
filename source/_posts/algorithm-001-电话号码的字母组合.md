---
title: LeetCode-17 电话号码的字母组合
date: 2019-04-21 23:59:13
tags: 算法
categories: 数据结构与算法
---
# 题目描述
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![17](http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

**示例:**
```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**说明:**
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

# 问题分析

需要根据输入的数字映射到对应的字母，根据输入的数字对进行组合：
思路一：循环嵌套
思路二：两两组合，然后递归

# 代码
```js
 let phonenum = (str) => {
   // 1 建立电话号码键盘映射
  let map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mon', 'pqrs','tuv', 'wxyz']
  // 234 => [2,3,4]
  let num = str.split('')
  // 2 保存映射后的内容 23 => ['abc', 'def']
  let code = []
  num.forEach(item=>{
    if(map[item]){
      code.push(map[item])
    }
  })
  // 3. 进行组合
  let comb = (arr) => {
    // 临时变量用来保存前两项组合的结果
    let temp = []
    for(let i=0, il = arr[0].length; i<il; i++){
      for(let j=0,jl=arr[1].length; j<jl; j++){
        temp.push(`${arr[0][i]}${arr[1][j]}`)
      }
    }
    arr.splice(0, 2, temp)
    if(arr.length>1){
      comb(arr)
    }else{
      return temp
    }
    return arr[0]
  }
  // 4.调用并返回结果
  return comb(code)
}

//测试
phonenum('345')
// ["dgj", "dgk", "dgl", "dhj", "dhk", "dhl", "dij", "dik", "dil", "egj", "egk", "egl", "ehj", "ehk", "ehl", "eij", "eik", "eil", "fgj", "fgk", "fgl", "fhj", "fhk", "fhl", "fij", "fik", "fil"]
```



