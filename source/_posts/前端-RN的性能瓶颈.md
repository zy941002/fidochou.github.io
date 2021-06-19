---
layout:
title: RN - 性能优化手段
date: 2019-01-22 12:46:47
tags: 混合开发
categories: 前端
---
# 基础优化

<!-- more -->

1. 比较吃性能的、耗时的操作可以放到componentDidMount中，然后再用 Interaction manager 在包裹一下，比如网络请求。
2. 无状态组件不会被实例化
3. 对于同层级的相同类型的组件，要给每个组件指定唯一的key值
4. 用 FlatList 替换 scrollView，因为在用 scrollView 的时候它会一下子把他上面的所有子组件都渲染出来，而 FlatList 可以设置首屏渲染的行数，这样就不会导致在刚进入这一页的时候出现卡顿现象。

#
本地分包： 把bundle拆分成公共基础bundle和业务bundle

预加载： 预加载公共基础bundle

缓存一部分数据

预加载

处理JS Bundle包大小、文件压缩、缓存




