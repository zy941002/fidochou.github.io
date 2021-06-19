---
layout:
title: HTTPS 使用与原理
date: 2019-01-29 12:46:47
categories: 前端
---

# HTTPS
Http 和 TCP 之间多了一层(SSL/TLS)
<!-- more -->
# 加密

## 对称加密
将加密的 内容 + 钥匙 都发送给对方，如：（DES/AES）

## 非对称加密
生成一对密钥 (k1, k2)，公/私钥匙
凡是 k1 加密的数据，k1 自身不能解密，而需要 k2 才能解密；
凡是 k2 加密的数据，k2 不能解密，需要 k1 才能解密。
如：(RSA、DSA)

## 散列加密
SHA-1、MD5 (128 bit)
HTTPS把对称加密、非对称加密和 CA 结合起来以保证数据安全。如果想对对称加密和非对称加密以及 SSL/TLS 要更多了解可以参考下面两篇文章：


## CA 证书
解决公钥、godaddy

# HTTP 延迟因素

影响 Http 的因素主要有两个：

## 带宽
这个是无法解决的

## 延迟

* [HOL 浏览器的阻塞](https://en.wikipedia.org/wiki/Head-of-line_blocking)，基于同一个域名，超过最大请求连接个数，请求会被阻塞。
	1. HTTP/1.1 中 HOL 阻塞的一种形式是当浏览器中允许的<font color="red">并行请求数量用完时</font>，后续请求需要等待前一个请求完成。
	2. HTTP/2 通过<font color="red">多路复用</font>解决了这个问题，在应用层消除了 HOL 阻塞，但在传输 (TCP) 层仍然存在 HOL。
	3. HTTP/3 使用 QUIC 而不是 TCP 它消除了传输层中的 HOL 阻塞。
*  DNS 的查询
*  TCP 的建立：HTTP（1/2）是基于 TCP 协议的

# HTTP1.1

##  缓存
1. HTTP1.0：If-Modified-Since，Expires
2. HTTP1.1：Etag（基于 lIf-Modified ms 级别的补充），If-Unmodified-Since, If-Match, If-None-Match

## 带宽优化以及网络连接的使用

请求头引入range头域。它允许只请求资源的某个部分.即返回码是206（Partial Content）

## 错误通知的管理

1. 409（Conflict）表示请求的资源与资源的当前状态发生冲突。
2. 410（Gone）表示服务器上的某个资源被永久性的删除。

## Host处理：

在 HTTP1.0 中认为每台服务器都绑定唯一的IP地址，因此，请求消息中的 URL 并没有（hostname）
虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers）共享一个IP地址。HTTP1.1 的请求消息和响应消息都应支持 Host 头域，请求消息没有 Host 头域会报告一个错误（400 Bad Request）。

## 长连接（PersistentConnection）Pipelining。

一个 TCP 的连接，允许建立多个 Http 和请求和响应，减少了建立和关闭的消耗和延迟，默认开启 Connection：keep-alive。弥补 Http1.0 每次请求都要重新建立新连接的缺点。


##  HTTP1.0 和 1.1 现存的一些问题

1. 明文传输
2. keep-alive 使用过多会给服务器增加压力，单个文件不断被请求的服务，keep-alive 可能会极大的影响性能，因为它在文件被请求之后还保持了不必要的连接很长时间。
3. header 内容过大

# SPDY：HTTP1.x的优化
## 多路复用（Multiplexing）
二进制帧层（header + 数据体）多个请求 stream 共享一个tcp连接的方式，每个 stream 需携带一个 id（从应用层解决 HOL 问题，但 是TCP 层面没有解决，多个 stream 是串行）

## 请求优先级（request Prioritization）

多路复用：关键请求被阻塞。每个 request 设置优先级，比如浏览器加载首页，首页的 html 内容应该优先展示，之后才是各种静态资源文件，脚本文件等加载，保证用户看到网页内容。
[Web 性能优化：控制关键请求的优先级](https://mp.weixin.qq.com/s/XKYWFzgiFizhTXdv2WmHlg)

## Header压缩：（Compression）
前面提到 HTTP1.x 的 header 很多时候都是重复多余的选择合适的压缩算法可以减小包的大小和数量。

## 安全

必须使用HTTPS的加密协议传输，大大提高了传输数据的可靠性。
## 服务端推送（Server Push）

采用了SPDY的网页，例如我的网页有一个 sytle.css 的请求，在客户端收到 sytle.css 数据的同时，服务端会将 sytle.js 的文件推送给客户端，当客户端再次尝试获取 sytle.js 时就可以直接从缓存中获取到，不用再发请求了。


# HTTP2.0 的升级改造

HTTP2 多个请求可同时在一个连接上并行执行。某个请求任务耗时严重，不会影响到其它连接的正常执行；

当你的网站已经升级HTTPS之后，那么升级HTTP2.0就简单很多。如果你使用NGINX，只要在配置文件中启动相应的协议就可以了
可以参考NGINX白皮书，[NGINX 配置 HTTP2.0官方指南](https://www.nginx.com/blog/nginx-1-9-5/)

## 头部压缩
HTT2：HPACK
SPDY：DEFLATE

## 安全
非必需的 HTTPS的。主流浏览器：chrome，firefox 表示还是只支持基于 TLS 部署的 HTTP2.0协议。所以要想升级成 HTTP2.0 还是先升级 HTTPS 为好。

# HTTP3（OUIC）

1. 流量控制、传输可靠性功能
2. 集成 TLS 加密功能
3. 多路复用
4. 快速握手
