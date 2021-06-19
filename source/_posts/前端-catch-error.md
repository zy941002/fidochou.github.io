---
layout: post
title: 如何优雅地处理前端异常？
date: 2020-07-09 18:02:25
categories: 前端
---

原文：[如何优雅处理前端异常？](https://zhuanlan.zhihu.com/p/51800345)

<!-- more -->

# 异常的种类
1. JS 语法错误、代码异常
2. Ajax 请求异常
3. 静态资源加载异常
4. Promise 异常
6. iframe 异常
7. 跨域 Script error
8. 崩溃和卡顿

对于第二点：Ajax 异常，我更偏好称之为 http 异常；对于第四点：Promise 异常，我更偏好称之为异步异常。

# 异常的处理

针对以上异常的种类，我们来看一下怎么处理：

## try-catch  的误区

> try-catch 只能捕获到同步的运行时错误，对语法和异步错误却无能为力

## window.onerror 并不是万能的

1. 同步异常可捕获
2. 语法错误不能捕获
3. 异步异常可捕获

> onerror 最好写在所有 JS 脚本的前面，否则有可能捕获不到错误；onerror 无法捕获语法错误；

## window.addEventListener

当静态资源加载失败会触发 error 事件。由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等，所以还需要配合服务端日志才进行排查分析才可以。

## Promise Catch

promise 的 catch 可以非常容易地捕获异步的错误。

没有 catch 的 Promise 中抛出的错误无法被 onError 或 try-catch 捕获到。所以务必要写 catch 处理抛出异常。

解决方案： 为了防止有漏掉的 Promise 异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听 Uncaught Promise Error。

使用方式：

```js
window.addEventListener("unhandledrejection", function(e) {
  console.log(e)
})
```
那如果对 Promise 不进行 catch 呢:

```js
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('捕获到异常：', e)
  return true
})

new Promise((resolve, reject) => {
  reject('jartto: promise error')
})
```

<font color="red">如果去掉控制台的异常显示，需要加上：</font>

```
event.preventDefault()
```

## React 的异常处理

UI 的某部分引起的 JS 错误不应该破坏整个程序，为了帮 React的使用者解决这个问题，React 16介绍了一种关于错误边界

注意： error boundaries并不会捕捉这些错误：

1. 事件处理器

2. 异步代码

3. 服务端的渲染代码

4. 在 error boundaries 区域内的错误


## iframe 异常
借助 window.onerror


## script 异常

## 崩溃和卡顿

1. 利用 window 对象的 「load」 和 「beforeunload」 事件实现了「网页崩溃」的监控
2. 使用 Service Worker 来实现网页崩溃的监控：
	1. Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker 下不会崩溃；
	2. Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态；
	3. 网页可以通过 navigator.serviceWorker.controller.postMessage API 向掌管自己的 SW 发送消息

# 错误上报
1. 利用 Ajax 请求上报
2. 动态创建 img 标签的形式

上报时，设置采集率以减少服务器压力

```js
Reporter.send = function(data) {
  // 只采集 30%
  if (Math.random() < 0.3) {
    send(data)      // 上报错误信息
  }
}
```