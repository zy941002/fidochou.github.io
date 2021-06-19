---
layout: post
title: Node.js 单测框架
date: 2021-06-21 19:11:22
categories: Node.js
---
# assert - 断言

## Node 原生 assert 模块

<!-- more -->

* Node 的原生模块 [assert](https://nodejs.org/api/assert.html)
* 基于 Node assert 测试框架: [power-assert](https://github.com/power-assert-js/power-assert)


# 单测的意义：
[Egg.js 单元测试](https://eggjs.org/zh-cn/core/unittest.html)


# 单测框架对比
> 从 npm 搜索 [test framework](https://www.npmjs.com/search?q=test%20framework&page=1&ranking=popularity)

测试库         |优点           | 缺点|
--------------------|------------------|------------------|
[Mocha](http://mochajs.org/) |  |     |
[AVA](https://github.com/avajs/ava) | 简单的 API 测试 |  测试 case 本身比较复杂|
[power-assert](https://github.com/power-assert-js/power-assert) | 基于原生的 assert 模块| |
[SuperTest](https://github.com/visionmedia/supertest) | 适合接口测试  |  |
[Jest](https://jestjs.io/zh-Hans/) | elegant！simple！  |  |
[power-assert](https://github.com/power-assert-js/power-assert) | 基于原生 | 异步支持不优好|


社区使用情况
<img src="/images/test.png"  width="500px"/>

基于 Jest + supertest 一般可以打造出单测利器出来

## 总结

如果让我重新选择测试单测框架，我会优先选择 Mocha + SuperTest
