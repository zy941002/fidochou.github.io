---
layout:
title: 面试常考的 CSS 问题
date: 2022-09-15 16:54:14
categories: 前端
---

1. [用纯 CSS 实现三角形](https://juejin.cn/post/6844903882007511048)
```css
#demo {
  width: 0;
  height: 0;
  border-width: 100px;
  border-style: solid;
  border-color: transparent transparent red transparent;
  //原理，牢记 border 的值是从 border-top 顺时针的
}
```

2. 样式权重计算规则
```css
important 最高，内敛样式 1000 > id  1000 >  类/伪/属性 样式 100 > 标签/伪元素 1
```

3. [CSS 的继承](https://juejin.cn/post/6905539198107942919#heading-3)
```css
无继承属性：布局/定位/宽高相关，总结一下就是影响文档流
有继承属性：文本颜色、大小、行高之类
```

4. display 的属性值及其作用？
  1. **block**
  2. **inline**：不能设置宽高
  3. **inline-block**

5. 隐藏元素的方法有哪些？
    1. `display: none;` 渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件
    2. `visibility: hidden;` 元素在页面中仍占据空间，但是**不会响应**绑定的监听事件。
    3. `opacity: 0;`将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且**能够响应**元素绑定的监听事件。
6. link 和 @import 的区别？

| link | @import |
| --- | --- |
| CSS/RSS | CSS |
| 页面加载时，CSS 同步载入 | 页面加载完成时，资源才载入（比较实用特殊样式的字体 |
| 可以通过 JS 操作 DOM | 不可以通过 JS 操作 DOM |

7. transition 和 animation 的区别？
  transition 强调过渡、而 animation 强调动画

8. display:none 与 visibility:hidden 的区别
  1. `display:none;`
    1. 在页面 DOM 树是完全不可见的，渲染时不占据任何空间，但是在 Chrome 的审查面版可以看见，
    2. 非继承属性：子节点修改dislay: block 之类的也不会显示出来
    3. 修改值会造成重排
  2. `visibility:hidden;`
    1. 占据 DOM 的空间，只是内容不显示，
    2. 继承属性：修改子节点的属性可显示出来。
    3. 修改值会造成重绘

9. 「伪元素」和「伪类」的区别和作用？
    1. 伪元素
        1. 会产生额外的元素
        2. 两个冒号：常见的伪元素有 before/after/firs-letter/first-line
    2. 伪类：额外的样式
        1. 添加额外的样式
        2. 一个冒号：一般 hover/focus/first-child 之类的

10. 对于盒模型的理解
    1. IE 盒模型：width=padding/border/content
    2. 标准盒模型：width=content