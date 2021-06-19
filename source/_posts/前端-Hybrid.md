---
layout: post
title: 混合开发-原理记录
date: 2019-01-27 14:40:32
categories: 前端
---

# 混合方案
* WebView
* Native UI
* 小程序方案
<!-- more -->

以上的三种方案，其实同样都是基于 JSBridge 完成的通讯层，第二三种方案，其实可以看做是在方案一的基础上，继续通过不同的新技术进一步提高了应用的混合程度。因此，JSBridge 也是整个混合应用最关键的部分，例如我们在设置微信分享时用到的 JS-SDK，wx对象 便是我们最常见的 JSBridge:


# Hybrid的通信原理
Hybrid App的本质，其实是在原生的 App 中，使用 WebView 作为容器直接承载 Web页面。因此，最核心的点就是 Native端 与 H5端 之间的双向通讯层，其实这里也可以理解为我们需要一套跨语言通讯方案，来完成 Native(Java/Objective-c/...) 与 JavaScript 的通讯。

这个方案就是我们所说的 JSBridge，而实现的关键，便是作为容器的 WebView，一切的原理都是基于 WebView 的机制。

## 实现原理

在 WebView 中发出的网络请求，客户端都能进行监听和捕获

## 协议定制

* 不同的协议头代表着不同的含义，这样便能清楚知道每个协议的适用范围。

##  协议的拦截

## 协议回调

## 参数传递方式

