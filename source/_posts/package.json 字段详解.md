---
layout:  post
title: package.json 字段
date: 2021-11-06 08:49:34
tags:
categories: Node.js
---

```json
{
	"name": "test-project",
	"version": "1.0.0",
	"description": "A test-project project",
	"main": "src/main.js",
	"private": true,
	"scripts": {},
	"dependencies": {},
	"devDependencies": {},
	"engines": {
	  "node": ">= 6.0.0",
	  "npm": ">= 3.0.0"
	},
	"browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```

# name 字段

如果有组织，一般都是「@org/package-name」的命名，（比如 @babel/cli）值得注意的是这里 packege-name 不再支持大写，需要以「_」或「-」命名

# version

需要遵循 [semver](https://semver.org/)，简单来说对于版本「A.B.C」

A 版本是 Major （主要）版本，一般会有比较大的 breaking change
B 版本是 Minor （次要）版本，其发版是包含新的 feature
C 版本是 Patch（补丁） 版本，bugfix 版本

# engines 和 engineStrict

<strike>目前已经 Node 弃用</strike>，但是会发出警告。
可以使用来严格控制 Node 的版本

```json
	{ 
	  "engines" : { 
	    "npm": "please-use-yarn",
	    "yarn": ">= 1.17.3",
	    "node": ">= 12.5.0"
	  } 
	}
```

# type

在 JS 的世界中，存在着两种影响力最大的模块规范: CommonJS Modules 以及 ECMAScript Modules。Node.js 从 v12 起就全部支持了

.js .cjs 文件默认以 CommonJS Modules 执行，.mjs 则默认以 ECMAScript Modules 执行。

而 「type」 字段的出现让我们更好得决定 .js 文件被哪种模块规范执行，它的值有两个，分别是 「module」 和 「commonjs」。

# exports 

「exports」 字段允许你通过引用自己的 package-name 来定义 package 的入口文件，举个例子：

```json
	{
	  "name": "pkg",
	  "exports": {
	    ".": "./main.mjs",
	    "./foo": "./foo.js"
	  }
	}
```
以上可以被解读为：

```json
{
  "exports": {
    "pkg": "pkg/main.mjs",
    "pkg/foo": "pkg/foo.js"
  }
}
```

从 Node.js v12 开始被支持，并作为 「main」 字段的替代方案。他最大的一个特性就是 「条件导出（Conditional Exports）」，当该 package 被导入时，能够判断被导入时的模块环境，从而执行不同的文件，简而言之就是，我们如果使用 import 命令，入口会加载 ECMAScript Modules 文件，如果使用 require 命令，入口则加载 CommonJS Modules 文件。

注意：<font color=red>对于所有在「exports」中定义的路径都必须是绝对路径。即 ./ 的形式。</font>

