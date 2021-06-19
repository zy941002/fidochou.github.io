---
layout: post
title: 不常见但实用的伪元素
date: 2021-07-28 14:33:08
categories: 前端
---

CSS 的伪元素目前一共有八种，孤陋寡闻的我只会「before」和 「after」:

<!-- more -->

* ::after
* ::before
* ::first-letter
* ::first-line
* [::marker](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::marker)
* ::selection

## Content 属性

1.「content」属性是必须的，Content 默认是 「display-inline」
2.「content」是不能被用户选择的

### 从 arrt() 属性获取现实的数据

可以从属性值上获取数据

`<p data-before-text="foo">hello world</p >
content: attr(data-before-text);
`

### 使用 url
=======
`<p data-before-text="foo">hello world</p>
content: attr(data-before-text);
`

### 使用 url

`content: url(https://unsplash.it/15/15);`

除了 url 还可以使用以下[属性](https://developer.mozilla.org/en-US/docs/Web/CSS/content)：

* [counter](https://developer.mozilla.org/en-US/docs/Web/CSS/counter())
* [quotes](https://developer.mozilla.org/en-US/docs/Web/CSS/quotes）)
