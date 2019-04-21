---
title: mongoose操作mongoDB笔记
date: 2019-04-20 23:02:15
tags: 数据库
categories: MongoDB
---

# Mongoose

第三方包`mongoose`基于MongoDB官方的`mongdb`包在一级做了封装

- 网址： https://mongoosejs.com/

# 起步

- 安装

```shell
npm i mongoose
```

- helloworld

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

//创建一个模型，就是在设计数据库
const Cat = mongoose.model('Cat', { name: String });

//实例化一个cat
const kitty = new Cat({ name: 'Zildjian' });

//持久化保存kitty实例
kitty.save().then(() => console.log('meow'));
```

# 官方指南

[官方增删查改demo](https://mongoosejs.com/docs/models.html)

### 设计Schema发布Model

```js
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1. 连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/itcast')

// 2. 设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

// 3. 将文档结构发布为模型
//    mongoose.model 方法就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//                 例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构 Schema
//   
//    返回值：模型构造函数
var User = mongoose.model('User', userSchema)


// 4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）
```

###  增加数据

```js
let admin = new User({
  username:'admin',
  password:'123456',
  email:'admin@admin.com'
})

admin.save((err, ret)=>{
  if(err){
    console.log('err')
  }else{
    console.log('success')
    console.log(ret)
  }
})
```

## 查询

查询所有：

```js
User.find((err, ret)=>{
  if(err){
    console.log('err')
  }else{
    console.log(ret)
  }
})
```



按条件查询所有：

```js
User.find({username:'ss'},(err, ret)=>{
  if(err){
    console.log('err')
  }else{
    console.log(ret)
  }
})
```



按条件查询单个：

```js
User.findOne({
  username:'ss'
},(err, ret)=>{
  if(err){
    console.log('err')
  }else{
    console.log(ret)
  }
})
```

## 删除数据

`deleteOne(), deleteMany()`

```js
User.deleteOne({
  username:'ss'
},(err, ret)=>{
  if(err){
    console.log('err')
  }else{
    console.log('sucdccess')
    console.log(ret)
  }
})
```

## 更新数据

- findByIdAndUpdate()

```js
User.findByIdAndUpdate('5c822c27de309b2e200fac3d',{
  password:'123'
},(err, ret)=>{
  if(err){
    console.log('err')
  }else{
    console.log('success')
  }
})
```

- findeOneAndUpdate()

```js
var query = { name: 'borne' };
Model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

// is sent as
Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback)
```

