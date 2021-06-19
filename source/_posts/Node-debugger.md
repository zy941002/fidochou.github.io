---
layout: post
title: Node.js 调试 - Debugger
date: 2021-06-21 22:05:53
categories: Node.js
---

[原生 Debugger](https://nodejs.org/docs/latest-v12.x/api/debugger.html)
1. 使用参数 `inspect` 即可进入 debug 模式
1. 使用参数 `--inspect` 即可进入 V8 调试模式，Node 也是调用了 CDP 协议。同 Chrome 的开发者工具
1. 使用参数 ` --inspect-brk` 即可进入 V8 debug 模式

说明：
通过 `http://localhost:9229/json/list`

```json
[
	{
		description: "node.js instance",
		devtoolsFrontendUrl: "chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229/49972c2d-0d1e-4a1c-ac69-0b249b83fe01",
		devtoolsFrontendUrlCompat: "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/49972c2d-0d1e-4a1c-ac69-0b249b83fe01",
		faviconUrl: "https://nodejs.org/static/images/favicons/favicon.ico",
		id: "49972c2d-0d1e-4a1c-ac69-0b249b83fe01",
		title: "start.js",
		type: "node",
		url: "file:///Users/jojo/Developer/ecom/apps/parker/server/start.js",
		webSocketDebuggerUrl: "ws://127.0.0.1:9229/49972c2d-0d1e-4a1c-ac69-0b249b83fe01"
	}
]
```

可以看到相应信息。其中 id 为 uuid，是一个特定的标识，每一个进程都会分配一个 uuid，因此每一次调用会有出现不同的结果。`devtoolsFrontendUrl` 则为我们要访问的 chrome 地址，新窗口打开这个地址即可调试 (新版：devtools://xxx)。


