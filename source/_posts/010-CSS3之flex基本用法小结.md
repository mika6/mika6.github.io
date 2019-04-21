---
title: CSS3之flex基本用法小结
date: 2019-04-20 23:21:24
tags: flex
categories: CSS
---



# 伸缩容器 display

- 语法

```css
display: flex | inline-flex
flex: 块伸缩容器
inline-flex:内联伸缩容器
```

**注意**：`float`,`clear`,`vertical-align`在伸缩项目上没有效果



# 伸缩流方向 flex-direction

主要用来定义主轴，从而定义了伸缩项目在容器中的伸缩方向

- 语法

```css
flex-direction: row | row-reverse | column | column-reverse
```

- 参数功能

  + **row**：ltr排版下从左向右排列，rtl排版下从右向左
  + **row-reverse**：与row排列相反
  + **column**：类似row，方向是从上到下

  + **column-reverse**：类似于row-reverse，方向是从下到上



# 伸缩换行flex-wrap

主要用来定义伸缩容器里是单行显示还是多行显示，侧轴的方向决定了新行堆放的方向

- 语法

```css
flex-wrap: nowrap | wrap | wrap-reverse
```

- 参数功能
  - **nowrap**：伸缩容器单行显示，ltr从左到右，rtl从右到左
  - **wrap**：伸缩容器多行显示，ltr从左到右，rtl从右到左
  - **wrap-reverse**：伸缩容器多行显示，ltr从右到左，rtl从左到右（与wrap相反）

# 伸缩流方向与换行flex-flow

这是`flex-direction`和`flex-wrap`属性的简写版,同时定义主轴和侧轴

```css
flex-flow: <'flex-direction'> | <'flex-wrap'>
```

- 参数功能
  - **flex-direction**：主轴
  - **flex-wrap**：侧轴

**注意**：`flex-flow`与`writing-mode`有直接联系,当使用`writing-mode: vertical-rl`时转向垂直布局，`flex-flow:row`将垂直排列伸缩项目，`column`将水平排列项目



# 主轴对齐justify-content

主要用来设置伸缩项目沿主轴线的对齐方式

- 语法

```css
justify-content: flex-start | flex-end | center | space-between | space-around
```

- 参数功能
  - **flex-start**：伸缩项目向一行的起始位置靠齐。
  - **flex-end**：伸缩项目向一行的结束位置靠齐。
  - **center**：伸缩项目向一行中间位置靠齐。
  - **space-between**：伸缩项目会平均地分布在行里，第一个项目在开始位置，最后一个项目在终点位置。
  - **space-around**：伸缩项目会平均分布在行里，两端保留一半的空间。
![justify-content](https://upload-images.jianshu.io/upload_images/10160199-b6abc2dbc12497d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240#pic_center)

 侧轴对齐align-items和align-self

align-items控制伸缩项目在侧轴的对齐方式，align-self控制伸缩项目自身在侧轴的对齐方式。

**align-items**

- 语法

```css
align-items: flex-start | flex-end | center | baseline | stretch
```

- 参数功能：
    - **flex-start**：伸缩项目靠侧轴起始边。
    - **flex-end**：伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点边。
    - **center**：伸缩项目的外边距盒在该行的侧轴上居中放置。
    - **baseline**：伸缩项目根据伸缩项目的基线对齐。
    - **stretch**：默认值，伸缩项目拉伸填充整个伸缩容器。
![align-items](https://upload-images.jianshu.io/upload_images/10160199-7ba1363d531dfc28.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240#pic_center)


 **align-self**

`align-self`属性主要用来设置**单独伸缩项目**在侧轴的对齐方式。可以覆盖该伸缩项目的伸缩容器的`align-items`属性。

- 语法

```css
align-self: flex-start | flex-end | center | baseline | stretch
```

如果伸缩项目的任一个侧轴上的外边距为auto，则`align-self`没有效果。
![align-self](https://upload-images.jianshu.io/upload_images/10160199-b200a78c3b6e67b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240#pic_center)
# 伸缩行align-content
`align-content`属性会更改`flex-wrap`的行为，它和`align-items`相似。主要来调准伸缩行在伸缩容器中的对齐方式，与调准伸缩项目在主轴上对齐方式的`justify-content`类似。

- 语法

```css
align-content: flex-start | flex-end | center | space-between | space-around | stretch
```

- 参数功能
  - **flex-start**：各行向伸缩容器起点位置堆叠。
  - **flex-end**:各行向伸缩容器结束位置堆叠。
  - **center**：各行向伸缩容器的中间位置堆叠。
  - **space-between**：各行在伸缩容器中平均分布。
  - **space-around**：各行在在伸缩容器中平均分布，两边处各有一般的空间。
  - **stretch**：默认值，各行将会伸展以占用额外的空间。

# 伸缩性flex
- 语法
```css
flex: none | [<flex-grow> <flex-shrink>? || <flex-basis>]
```
- 参数功能
  - **flex-grow:** 定义伸缩项目的拉伸因子，**默认值`0`**，不可继承。
  - **flex-shrink:** 指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。**默认值为`1`**，不可继承。
  - **flex-basis:** 指定了 flex 元素在主轴方向上的初始大小,默认值`auto`。

大多数情况下，需要将 flex 设置为 auto，initial，none，或一个无单位正数。
 - `flex: 0 auto` = `flex: initial` = `felx: 0 1 auto`
 - `flex: auto` = `flex: 1 1 auto`
 - `flex: none` = `flex: 0 0 auto`
 - `flex:正数` = `flex: 正数 1 0`

