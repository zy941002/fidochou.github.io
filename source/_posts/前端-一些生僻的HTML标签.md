---
layout: post
title: 一些生僻的 HTML 标签
date: 2021-11-08 14:49:01
categories: 前端
---
# map 和 area

图片上定义一个热点区域，可以关联一个超链接；area 元素仅在 map 元素内部使用。

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/area

# base 文档根 URL 元素

<!-- more -->

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base
如果指定了以下任一属性，这个元素必须在其他任何属性是URL的元素之前。例如：<link> 的 href 属性。

1. href：用于文档中相对 URL 地址的基础 URL。允许绝对和相对URL。
2. target

值得注意的是：
1. 多个 base 元素会默认只用第一个。
2. [Open Graph（开放图谱协议）](https://ogp.me/)不接受 base 元素
其实就是一些 Meta 标签，是 facebook 制定的协议。在 facebook 分享链接链接时能够，分享信息呈现出


# object
object 标签作用跟 embed 相似，也是插入外部资源，由浏览器插件处理。它可以视为 embed 的替代品，有标准化行为，只限于插入少数几种通用资源，没有历史遗留问题，因此更推荐使用。

https://www.bookstack.cn/read/html-tutorial/spilt.6.docs-multimedia.md


# track
https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track