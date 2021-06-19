---
layout: post
title: CSP
date: 2021-03-30 20:12:44
categories: 前端相关
---

PM 要求将 iframe 里面的某个元素，对 window 进行定位。
主要解决思路：我参考了👉[解决 iframe 中 fixed 失效的问题](https://blog.csdn.net/hejiancsdn/article/details/80495333)。

这个过程主要分为两步：

1.  使该元素 fixed。并且计算出相对真实 window 的 marginTop 值
2.  监听 window 的滚动事件，滚动偏移量即是 fixed 的 top 值

在实践的过程中，我主要遇到了以下问题

### Q1: iframe 通信问题
在本地开发模式中，由于a、b 两个项目，端口号不同，根据浏览器的同源策略，在 iframe 中监听上层 window 时报错如图下：

### A1: 解决方案
直接暴力启动一个允许跨域的浏览器，先保证开发正常进行

```sh
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

## 深入 [CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

既然问题出现，那就再深入一点，多剖析一下 CSP 相关内容：

Content Secure Policy：内容安全策略

### 如何使用：

1. 通过添加 ` Content-Security-Policy` 头部指定

2.  通过 `meta` 标签来指定

### 主要目标：
1. CSP 的主要目标是减少和报告 XSS 攻击 ，XSS 攻击利用了浏览器对于从服务器所获取的内容的信任。
2.  数据包嗅探攻击：除加载域以外，还可以限制协议。如：https

### 相关策略
* [default-src](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src): 这个是为其他以下几个指令提供 fallback 机制
* img-src
* [connect-src](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) a 标签、fetch、ajax
* frame-src
* mailto
* script-src
* style-src

### 上报机制

通过 ` report-uri` 进行一个 post 上报

开源的 [koa-hemlet](https://github.com/helmetjs/helmet/blob/042ee406c753c492a84d7c771010e38477f8c5cb/middlewares/content-security-policy/index.ts#L213)本质也就是设置 Content-Secuiry-Policy


# 总结

CSP 只是作为一种为网站策略增强的一种手段。和 iFrame 通信并没有什么联系。只是可以控制网站加载 iFrame 的源。所以我应该还去了解并且动手实现跨域的情况下，如何实现window 和 iframe 的通信。