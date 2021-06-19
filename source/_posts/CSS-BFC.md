---
layout: post
title: CSS - BFC
date: 2019-01-29 16:40:32
categories: 前端
---

# BFC 概念

它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其<font  color="red">子元素</font>将如何定位，以及<font  color="red">和其他元素</font>的关系和相互作用。

<!-- more -->

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

# 触发 BFC
只要元素满足下面任一条件即可触发 BFC 特性：

* body 根元素
* 浮动元素：float 除 none 以外的值
* 绝对定位元素：position (absolute、fixed)
* display 为 inline-block、table-cells、flex
* overflow 除了 visible 以外的值 (hidden、auto、scroll)

#  BFC 特性及应用
* <font  color="red">同一个 BFC </font>下外边距会发生折叠
* BFC 可以包含浮动的元素（清除浮动）overflow: hidden
* BFC 可以阻止元素被浮动元素覆盖


