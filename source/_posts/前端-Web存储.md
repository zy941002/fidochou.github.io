---
layout:
title: Web 的存储
date: 2019-01-29 12:46:47
categories: 前端
---
# 一、客户端 cookie

<!-- more -->
## [定义:](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/cookies)
cookie 是小量信息，由网络服务器发送出来以存储在网络浏览器上，从而下次这位独一无二的访客又回到该网络服务器时，可从该浏览器读回此信息。浏览器可以记住这位访客的特定信息，如上次访问的位置、花费的时间或用户首选项（如样式表）。cookie 是个存储在浏览器目录的文本文件，当浏览器运行时，存储在 RAM 中。一旦你从该网站或网络服务器退出，cookie 也可存储在计算机的硬驱上。当访客结束其浏览器对话时，即终止的所有 cookie。
## 注意事项:
1. 通过良好的编程，控制保存在 cookie 中的 session 对象的大小；
2. 通过加密和安全传输技术（SSL），减少 cookie 被破解的可能性；
3. 只在 cookie 中存放不敏感数据，即使被盗也不会有重大损失；
4. 控制 cookie 的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的 cookie。

## 限制:
1. 数量和长度的限制：每个 domain 最多只能有 20 条 cookie，每个 cookie 长度不能超过 4KB，否则会被截掉；
2. 安全性问题：如果 cookie 被人拦截，他只要原样转发 cookie 就可以达到目的了；
3. 隐私问题：隐私浏览模式，浏览器关闭之后，期间所有的  cookie 都消失。

# 二、服务器端 session
session：称为「会话控制」。session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web 页时，如果该用户还没有会话，则 Web 服务器将自动创建一个 session 对象。当会话过期或被放弃后，服务器将终止该会话。

因为很多第三方可以获取到这个 cookie，服务器无法判断 cookie 是不是真实用户发送的，所以 cookie 可以伪造，伪造 cookie 实现登录进行一些 HTTP 请求。如果从安全性上来讲，session 比 cookie 安全性稍微高一些，我们先要知道一个概念-- sessionID：
## [sessionID 定义](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/sessions)
客户端第一次请求服务器的时候，服务器会为客户端创建一个 session，并将通过特殊算法算出一个 session 的 ID，下次请求资源时（session 未过期），浏览器会将 sessionID(实质是 cookie)放置到请求头中，服务器接收到请求后就得到该请求的 sessionID，服务器找到该 ID 的 session 返还给请求者使用。

#  三、Webstorage
## [定义:](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
使用 HTML5 可以在本地存储用户的浏览数据。早些时候，本地存储使用的是 cookie。但是 Web 存储需要更加的安全与快速，这些数据不会被保存在服务器上，但是这些数据只用于用户请求网站数据上。它也可以存储大量的数据，而不影响网站的性能。数据以 键/值 对存在, Web 网页的数据只允许该网页访问使用。

* 提供一种在 C sookie 之外存储会话数据的途径。
* 提供一种存储大量可以跨会话存在的数据的机制。

## localStorage
localStorage的生命周期是永久性的。假若使用 localStorage 存储数据，即使关闭浏览器，也不会让数据消失，除非主动的去删除数据，使用的方法如上所示。localStorage有length属性，可以查看其有多少条记录的数据。

## sessionStorage
sessionStorage 的生命周期是在浏览器关闭前。也就是说，在整个浏览器未关闭前，其数据一直都是存在的。sessionStorage 也有length属性，其基本的判断和使用方法和 localStorage 的使用是一致的。需要注意的有以下几点：

1. 页面刷新不会消除数据；
2. 只有在当前页面打开的链接，才可以访 sessionStorage 的数据；
3. 使用 window.open 打开页面和改变 localtion.href 方式都可以获取到 sessionStorage 内部的数据。


