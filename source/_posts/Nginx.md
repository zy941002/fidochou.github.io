---
layout: post
title: Nginx 命令记录
date: 2019-01-27 14:40:32
categories: 前端
---

## 重载配置文件
./nginx -s reload
## 日志切割
备份当前日志

./nginx -s  reopen


 每周执行一次，写在脚本当中

 crontab

 gzip on
  gzip_comp_level 2  压缩级别
 压缩消耗GPU

autoindex_moduls

autoindex_on //  文件夹

set limite-rate 控制流量 以秒为单位

access.log

## 缓存
