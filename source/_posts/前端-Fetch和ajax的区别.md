---
layout: post
title: fecth 和 Ajax 的区别
date: 2020-07-07 14:43:46
categories: 前端
---

# fetch
window 的一个对象, 他是更加底层的一个API。

1. 默认的请求为get请求 可以使用 method:post 来进行配置
2. 第一步中的 response 有许多方法 json() text() formData()
3. Fetch跨域的时候默认不会带 cookie 需要手动的指定 credentials:'include'
4. fetch 是一个 low-level 的 API，所以你需要自己 encode HTTP 请求的 payload，还要自己指定 HTTP Header 中的 Content-Type 字段。
5. 按照 MDN 的说法，fetch 只有在遇到网络错误的时候才会 reject 这个 promise，比如用户断网或请求地址的域名无法解析等。只要服务器能够返回 HTTP 响应（甚至只是 CORS preflight 的 OPTIONS 响应），promise 一定是 resolved 的状态。

# Ajax

```
var xml=new XMLHttpRequest();
    xml.open('GET','a.json',true);  //第三个参数表示是否异步
    xml.send(null);//参数为要给服务器传递的参数  若只是单纯的向服务器取数据  则传递null
  xml.onreadystatechange=function () {
      if(xml.readyState==4){
          c onsole.log(11)
          if(xml.status==200){
              console.log(xml.responseText)
          }
      }
  }
```
