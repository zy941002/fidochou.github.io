---
layout: post
title: Next.js v12的理解
date: 2021-11-06 13:33:49
tags:
categories: Node.js
---

https://nextjs.org/blog/next-12

<!-- more -->

1. Rust 编译器：约 3 倍的快速刷新和约 5 倍的构建速度
2. 中间件（beta）：通过配置代码在 Next.js 中实现完全的灵活性
3. React 18 支持：现在支持原生 Next.js API，以及 Suspense
4. <Image />AVIF 支持：选择性压缩 20% 的图像
4. Bot-aware ISR Fallback：为网络爬虫优化 SEO
5. 原生 ES 模块支持：与标准化模块系统保持一致
6. URL Imports（alpha）：从任何 URL 导入包，无需安装
7. React Server Components (alpha)：立即试用，包括 SSR 流

# 使用 Rust 编译器实现更快的构建和快速刷新

1. 大型代码库的进一步速度提升
2. 提高了对性能的可观察性
3. 底层 webpack 改进

使用 Rust 替代 Babel，包括用于实现转换的全新 Rust CSS 解析器「styled-jsx」，压缩比 Terser 快 7 倍。


# 中间件

[中间件 + 边缘节点 = edge function？](https://www.youtube.com/watch?v=WlP2TB2ORL4)
[edge-functions](https://vercel.com/features/edge-functions)

# Preparing for React 18

[react-18](https://nextjs.org/docs/advanced-features/react-18)

React 18 的新 feature 包括：Suspense、自动批量更新、startTransition 还有一些新的为服务端渲染准备的流式 API。

## Server-Side Streaming
React 18 中的并发功能包括对服务端 Suspense 和 SSR 流支持的内置支持。这允许使用 HTTP 流来服务器呈现页面。这是 Next.js 12 中的一项实验性功能，但一旦启用，SSR 将使用与中间件相同的严格运行时。

## React Server Components

React Server Components 允许我们在服务器上渲染所有内容包括组件本身。这与在服务器上预先生成 HTML 的服务器端呈现有着根本的不同。 <font size="blod">zero client-side JavaScript needed</font>，使页面呈现速度更快。这改善了应用程序的用户体验，将服务器渲染的最佳部分与客户端交互性相结合。


# ES 模块支持和 URL 导入

[url-imports](https://nextjs.org/docs/api-reference/next.config.js/url-imports)

# Bot-Aware ISR Fallback

https://juejin.cn/post/6977783923099041800

静态页面可以在运行时（按需）生成，而不是用 ISR 在构建时生成。使用分析、A/B 测试或其他指标，你可以灵活地对构建时间做出自己的权衡。



## 静态网站的生成

ISR 对于小型网站来说并不总是有意义的。如果你的重新验证期大于重建整个网站所需的时间，你还不如使用传统的静态网站生成。


ISR（增量静态再生）

# Smaller images using AVIF
# Output File Tracing
# Other Improvements


