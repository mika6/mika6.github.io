---
title: 排序算法小结
date: 2019-05-05 10:34:49
tags: 算法
categories: 数据结构与算法
---
**摘要:**排序算法是算法中比较重要的基础算法，下面对常见的排序算进行简单的小结。目前只是一些基本实现，发现更好的实现方式再进行更新吧

## 各种排序算法的比较

|   类别   |    平均时间复杂度    |         最好         |         最坏         |        空间复杂度        | 稳定性 |
| :------: | :------------------: | :------------------: | :------------------: | :----------------------: | :----: |
| 冒泡排序 |   O(n<sup>2</sup>)   |         O(n)         |   O(n<sup>2</sup>)   |           O(1)           |  稳定  |
| 快速排序 | O(nlog<sub>2</sub>n) | O(nlog<sub>2</sub>n) |   O(n<sup>2</sup>)   | O(lob<sub>2</sub>n)~O(n) | 不稳定 |
| 插入排序 |   O(n<sup>2</sup>)   |         O(n)         |   O(n<sup>2</sup>)   |           O(1)           |  稳定  |
| 希尔排序 |  O(n<sup>1.3</sup>)  |         O(n)         |   O(n<sup>2</sup>)   |           O(1)           | 不稳定 |
| 选择排序 |   O(n<sup>2</sup>    |         O(n)         |   O(n<sup>2</sup>    |           O(1)           | 不稳定 |
|  堆排序  | O(nlog<sub>2</sub>n) | O(nlog<sub>2</sub>n) | O(nlog<sub>2</sub>n) |           O(1)           | 不稳定 |
| 归并排序 | O(nlog<sub>2</sub>n) | O(nlog<sub>2</sub>n) | O(nlog<sub>2</sub>n) |           O(n)           |  稳定  |
| 基数排序 |      O(d(r+n))       |      O(d(r+n))       |      O(d(r+n))       |         O(rd+n)          |  稳定  |

**注：** r 代表关键字基数，d 代表长度，n 代表关键字个数

### 冒泡排序

动图演示：
![冒泡排序](https://forum.mianbaoban.cn/data/attachment/forum/201803/20/140153i7562exzjrnagaja.gif)

实现代码：

```js
function bubbleSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}
function swap(arr, i, j) {
  let temp = null;
  temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// test
let arr = [3, 5, 2, 7, 2, 77, 3, 74, 34, 23];
bubbleSort(arr);
console.log(arr); // [2, 2, 3, 3, 5, 7, 23, 34, 74, 77]
```

### 快速排序

动图演示：

![快速排序](https://forum.mianbaoban.cn/data/attachment/forum/201803/20/140159bsq685wqc58h7zha.gif)

实现代码：

- 递归实现

```js
function quickSort(arr){
    let len = arr.length
    if(len<2){
        return arr
    }else{
        let flag = arr[0]
        let left = []
        let right = []
        for(let i=1, temp; i < len: i++){
            temp = arr[i]
            if(temp<flag){
                left.push(temp)
            }else{
                right.push(temp)
            }
        }
        return quickSort(left).concat(flag, quickSort(right))
    }
}

let arr = [3, 5, 2, 7, 2, 77, 3, 74, 34, 23];
console.log(quickSort(arr)); // [2, 2, 3, 3, 5, 7, 23, 34, 74, 77]
```

```js
function quickSort(arr, left, right) {
  if (left < right) {
    let center = partSort(arr, left, right);
    quickSort(arr, left, center - 1);
    quickSort(arr, center + 1, right);
  }
}
function partSort(arr, left, right) {
  if (left < right) {
    let key = arr[right];
    let cur = left;
    let prev = cur - 1;
    // for (let cur = left; cur < right; cur++) {
    //   if (arr[cur] < key && ++prev !== cur) {
    //     swap(arr, cur, prev);
    //   }
    // }
    while (cur < right) {
      if (arr[cur] < key && ++prev !== cur) {
        swap(arr, cur, prev);
      }
      ++cur;
    }
    // 将参考值放到正确的位置
    swap(arr, ++prev, right);
    return prev;
  }
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

//test
let arr = [3, 5, 2, 7, 2, 77, 3, 74, 34, 23];
quickSort(arr, 0, 9);
console.log(arr); // [2, 2, 3, 3, 5, 7, 23, 34, 74, 77]
```

- 非递归实现

```js
function quickSort(arr, left, right) {
  let stack = [];
  stack.push(left);
  stack.push(right);
  while (stack.length) {
    right = stack.pop();
    left = stack.pop();
    let flag = partSort(arr, left, right);
    if (flag - 1 > left) {
      stack.push(left);
      stack.push(flag - 1);
    }
    if (flag + 1 < right) {
      stack.push(flag + 1);
      stack.push(right);
    }
  }
}
```

### 插入排序

动图演示：

![插入排序](https://forum.mianbaoban.cn/data/attachment/forum/201803/20/140155h0at131fkz33j1af.gif)

代码实现：

```js
function insertSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let cur = null;
  for (let i = 0; i < len - 1; i++) {
    cur = arr[i + 1];
    let j = i;
    while (j >= 0 && cur < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = cur;
  }
  return arr;
}
//test
let arr = [3, 5, 2, 7, 2, 77, 3, 74, 34, 23];
insertSort(arr);
console.log(arr); // [2, 2, 3, 3, 5, 7, 23, 34, 74, 77]
```

### 选择排序

动图演示：

![选择排序](https://forum.mianbaoban.cn/data/attachment/forum/201803/20/140154j0ci8n9nvvn353n0.gif)

代码实现：

```js
function selectionSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  for (let i = 0; i < len; i++) {
    let min = 0;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    swap(arr, i, min);
  }
  return arr;
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// test
let arr = [3, 5, 2, 7, 2, 77, 3, 74, 34, 23];
selectionSort(arr);
console.log(arr); // [2, 2, 3, 3, 5, 7, 23, 34, 74, 77]
```

### 堆排序

动图演示：
![堆排序](https://forum.mianbaoban.cn/data/attachment/forum/201803/20/140202rklrnejx0lz4qkdx.gif)

代码实现：

```js
class Heap {
  constructor(data) {
    this.data = data;
  }
  // 一个点调整为最大堆
  static maxHeapify(arr, i, size) {
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    let max = i;
    if (l <= size && arr[max] < arr[l]) {
      max = l;
    }
    if (r <= size && arr[max] < arr[r]) {
      max = r;
    }
    if (max !== i) {
      Heap.swap(arr, max, i);
      Heap.maxHeapify(arr, max, size);
    }
  }
  sort() {
    let arr = this.data;
    let len = arr.length;
    if (len < 2) {
      return arr;
    } else {
      // 建立最大堆(从最后一个父节点开始)
      for (let i = Math.floor(len / 2); i >= 0; i--) {
        Heap.maxHeapify(arr, i, len);
      }
      // 排序，依次弹出最大值
      for (let j = 0; j < len; j++) {
        Heap.swap(arr, 0, len - 1 - j);
        Heap.maxHeapify(arr, 0, len - 1 - j - 1);
      }
      return arr;
    }
  }
  static swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

// test
let arr = [3, 5, 2, 7, 2, 77, 3, 74, 34, 23];
let newArr = new Heap(arr);
let res = newArr.sort();
console.log(res); // [2, 2, 3, 3, 5, 7, 23, 34, 74, 77]
```

### 归并排序

### 基数排序
