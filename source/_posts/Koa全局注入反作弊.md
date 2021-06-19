---
layout: post
title: 关于在 Koa 中全局注入反作弊的思考
date: 2020-05-26 13:54:14
categories: Node.JS

---
我查阅过的资料

[一杯茶的时间，上手 Koa2 + MySQL 开发](https://juejin.im/post/5ece2a1e6fb9a048021466b0?utm_source=gold_browser_extension)

前言：我们的项目是借助 Wepack，配置两套打包的脚本，分别输出服务端渲染「SSR」以及客户端渲染「CSR」所需要的资源。服务端渲染是利用「Koa」 以及渲染引擎 「Mustache」输出首屏内容。

以上

反作弊的状态码由后端返回
```
const MEMBER_FROZEN_EXCEPTION_MAP = {
  40350: 'abuseip',
  40351: 'imfrozen',
  40352: 'unhuman'
}
```
http status 状态码为 403 时需要进行异常处理。

Node 端和 Client 端本身就是隔离的（所以有了同构技术），需要考虑在不同环境对`http status`的处理。

我可以联想到以下关键字👇

「中间件」「责任链模式」「洋葱模型」「你是否真的懂 try...catch」

# 中间件

> 为什么叫中间件？因为出于 Http 的 Request 和 Response 中间，用来实现某种功能。

我的老板提出这个问题时，我几乎立刻抖了个机灵：写个中间件呗？（因为我室友就是专业写中间件的，hahaha）

老板：嗯？Koa 基于洋葱模型，那能拿到 http 状态吗？

抖机灵：从 ctx 取呗？

老板：那 C 端怎么做呢？

抖机灵：从 fetch 请求直接 reject 出来！

<img src="/images/koa.png"  width="500px" />

哦! Koa 对标 Express 底层 [connect](https://github.com/senchalabs/connect)

<img src="/images/onion.png"  width="500px" />

嘿嘿嘿，虽然把网上这个图抄过来了。但是我们可以仔细看看这个中间件的设计！什么设计？顺序！

目前我们的 xen 项目已经有了各类错误上抛的机制，我在想在 中间件 的基础上是否能在加入

1. 缓存控制的中间件

还没想好，想好在补吧



