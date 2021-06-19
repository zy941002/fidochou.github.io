---
layout: post
title: 令人迷茫的 CSS 单位
date: 2019-01-29 16:40:32
categories: 前端
---

# 物理像素（DP Device Pixels）

例如 iPhone5 的分辨率是 640 x 1136px，代表屏幕由 640行 * 1136列像素点组成。

# CSS 像素 (逻辑像素)

桌面浏览器的 100% 缩放情况下，CSS 的 1 个像素往往都是对应着电脑屏幕的 1 个物理像素，会让你误以为 CSS 里的 1px 就是实际屏幕像素。

<!-- more -->

小结：用户的缩放比会影响单位CSS像素点对应的实际物理像素的多少。看到这里就应该知道，<font color="red">CSS 像素只是一个相对单位，与物理像素并不总是等价的。</font>CSS 中的 1px 并不是总代表设备像素上的 1px，尤其是在移动设备上。


# 像素密度(PPI，Pixels Per Inch)

$\sqrt{X平方+Y平方}$ / 尺寸

# 逻辑像素 (dp，pt)

为了抹去高密度分辨率屏幕(高清屏)所带来的适配问题，iOS 与 Android 两个平台分别提出了 pt（point）与 dp(device-independent pixel 两个单位。他们的名称不一样但是意义是一样的。

以 iPhone 为例：例如将 4/4s 的逻辑像素设定为 320 x 480pt（实际像素:640x960px），以物理屏幕左上角为原点，横向 X轴 320pt，纵向 Y轴 480pt。<font color="red">所以 PPI 越高，1pt 的所覆盖的物理像素就越多。</font>

# 设备像素比（DPR，Device Pixel Ratio）
> 设备像素比 ＝ 物理像素 / 设备独立像素

window.devicePixelRatio

iPhone6 的设备宽度和高度为 375pt * 667pt，可以理解为设备的独立像素；
而其 dpr为2，根据上面公式，我们可以很轻松得知其物理像素为750pt * 1334pt。

之前我们已经介绍了物理像素与逻辑像素的概念，就可以很容易推导出设备像素比的公式了
DRP = 物理像素/dp或pt

1倍：1pt=1dp=1px（iPhone 3GS）
2倍：1pt=1dp=2px（iPhone 4s/5/6）
3倍：1pt=1dp=3px（iPhone 6 plus）

https://github.com/jawil/blog/issues/21
