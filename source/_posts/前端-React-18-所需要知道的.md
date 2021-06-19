---
layout: post
title: React18 所需要知道的
date: 2021-06-23 15:29:35
tags: React
categories: 前端
---
[What You Need to Know About React 18](https://javascript.plainenglish.io/what-you-need-to-know-about-react-18-54070f6bc4a1)

# 自动的批量更新
<!-- more -->
批量更新：React 会尝试将同一上下文中触发的多个更新合并为一个好处是：

1. 避免页面重复渲染
2. 状态按顺序处理，不会出现竞争态问题，最终触发渲染的是异步流程。

但值得注意的是，在一<font color="red">异步的方法回调</font>中，React 并不能进行批量更新。
（这里可以尝试用看似同步的方式调用 async/await 的调用，是什么效果）

```js
// this code will be re-render-twice
const handleClick =()=> {
  fetch().then().catch(()=> {
    setCount(c => c+1)
    setF(f=> !f)
  })
}
```

解释：React 的批量更新只在浏览器的 event 中生效（比如点击时间），但是上面的代码更新状态是事件已经处理完成，在 fetch 的回调中。
那么V18 以后，状态管理无论是在哪里，只会被更新一次。

## 不需要批量更新

使用 `flushSync` 去重新渲染组件

# SSR support for Suspense
对典型 SSR 的基本扩展。在一个典型的 React SSR 应用中，流程基本上是：

1. 服务端获取 UI 相关的展示数据
2. 服务端渲染整个 APP 的 HTML 发送给客户端
3. 客户端除了 HTML 以外，还需下载 JS bundle 部分
4. 在最后一步，客户端连接 JS 的逻辑和 HTML 绑定。（称之为：脱水）

缺点：在下一步可以开始之前，整个应用程序的每个步骤都必须立即完成。这样会导致在初始化时加载时长变慢。

React 18 中 	`<Suspense>` 组件已经以这样的方式进行了革命性的变更：

它将应用程序分解为更小的独立单元，这些单元再经历上面提及的每一部分。

因此：这样一旦用户看到内容，都将是可交互的。


# Transition

这是即将发布的令人难以置信的功能。它可以让用户解决大屏幕频繁更新的问题。
例如，考虑在过滤数据列表的输入字段中键入。您需要将字段的值存储在 state 中，以便您可以过滤数据并控制该输入字段的值。您的代码可能如下所示：

```js
// Update the input value and search results
setSearchQuery(input)
```

在这里，每当用户键入一个字符时，我们都会更新输入值并使用新值来搜索列表并显示结果。

对于大屏幕更新，这可能会导致页面在呈现所有内容时出现延迟，从而使打字或其他交互感觉缓慢且无响应。即使列表不是太长，列表项本身也可能很复杂，每次击键都不同，并且可能没有明确的方法来优化它们的呈现.

从概念上讲，问题在于需要进行两种不同的更新。

第一次是紧急更新，用于更改输入字段的值
第二个是显示搜索结果的不太紧急的更新

```
// Urgent: Show what was typed
setInputValue(input)

// Not urgent: Show the results
setSearchQuery(input)
```

新的 `startTransition` API 通过让您能够将更新标记为「过渡」来解决这个问题：

```
import { startTransition } from 'react';
// Urgent: Show what was typed
setInputValue(input);
// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```