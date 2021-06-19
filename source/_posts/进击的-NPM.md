---
layout: post
title: 进击的 NPM
date: 2020-12-10 10:10:00
categories: Node.JS
---

# NPM2

优点：完整的依赖拓扑图
缺点：很暴力，重复依赖

# NPM3

公共依赖提升，但是由于下载顺序问题，最极端情况下还是 npm2，并不能完全解决依赖重复

# NPM4
npm-shrinkwrap.json 被认为是完整的安装清单，但是 npm2 就有 npm-shrinkwrap.json

# NPM5

## lockfile

<table style="width:100%">
  <tr>
    <th width="500px">npm@5 以前：npm-shrinkwrap.json</th>
    <th width="500px">npm@5 以后：package-lock.json</th>
  </tr>
  <tr>
    <td>发布包时如果有锁定需求，可用 npm shrinkwrap 命令把 package-lock.json 转为 npm-shrinkwrap.json 随包发布（向下兼容）</td>
    <td>开发时提交和使用，来保证不同环境、人员安装依赖的一致性。</td>
  </tr>
</table>

## cache 优化

<table style="width:100%">
  <tr>
    <th></th>
    <th width="500px">npm@5 以前</th>
    <th width="500px">npm@5 以后</th>
  </tr>
  <tr>
    <th width="120px">缓存路径</td>
    <td>~/.npm 文件夹中以模块名的形式直接存储 <br/>eg: koa 模块存储在 ~/.npm/koa </td>
    <td>路径存放在 ~/.npm/_cacache</td>
  </tr>
  <tr>
    <th width="120px">缓存管理</td>
    <td></td>
    <td>由系统统一管理，数据发生错误就会重新获取，除非需要释放磁盘空间。需要 --force 参数</td>
  </tr>
</table>

## 文件下载优化

如果将本地目录作为依赖来安装

npm@5 before：将会把文件目录作为「副本拷贝」到 node_modules 中。

npm@5 after： symlinks 的方式来实现（使用本地 tarball 包除外），而不再执行文件拷贝。这将会提升安装速度：

2. 安装耗时打印
3. 新的 [package-lock.json] 文件锁
4. 发包模块不包含 lock 文件
5. install 时默认 --save，除非使用 --no-save

## npx

npx 一个随着 npm 5.2.0 发布的命令，会帮你执行依赖包里的二进制文件。比如对于没有全局安装的命令你想执行的话就只能 ./node_modules/.bin/webpack -v，有 npx 之后就可以直接使用 npx webpack -v。

# NPM6

解决安全相关问题

npm audit：这个命令本地试过，但是貌似已经没撒用了 🤔

# NPM7

1. npm workspace
2. 自动安装 「对等依赖」（有些意思 🤔）
3. lock 文件格式向 yarn 看齐

## breaking Changes

1. npx 被「npm exec」重写


相关文章


[npm@5 新特性使用指南](https://github.com/Kimi-Gao/Program-Blog/issues/112)
[Announcing npm@6](https://medium.com/npm-inc/announcing-npm-6-5d0b1799a905)
[npm blog V6](https://blog.npmjs.org/post/173239798780/beyond-npm6-the-future-of-the-npm-cli)
[npm blog V7](https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major)
[Youtube: V7 Released](https://www.youtube.com/watch?v=7gFaBjY7fHs)
