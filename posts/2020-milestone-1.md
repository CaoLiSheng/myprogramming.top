---
style: splendor
title: 2020年里程碑 - 1
date: 2020-08-09 16:14:00
tags:
  - 里程碑
  - 提升计划
  - 2020
---

## 前言

> 这几天一直在等通知，所以暂时不能离开昆明回老家。边写代码、边暗黑3过了两周，终于完成了类似Hexo的博客工具开发。现在在这里树立一个里程碑，也顺便总结一下。

## 第一部分

首先是代码打包配置部分。最近在抖音上看到又出了一个新的打包神器，但是我并没有去调研，所以依旧使用`webpack`。

使用`babel-loader`把最新规范下的模块化代码转化为es5规范输出，这里有三份配置。

1. 处理markdown文章的NodeJS程序
2. 骨架网站的开发版配置，就是多了react-hot-reload
3. 骨架网站的线上版配置

提到**骨架网站**，我实在想不出什么名字来命名，就是Hexo里的主题。而我感觉文章像血肉，而这个主题像骨架，整体来看就是我的博客。骨架网站中另需处理CSS3样式和各类资源文件，所以需要`style-loader`、`css-loader`、`sass-loader`、`url-loader`这四个加载器。

> 这里就不得不提到**url-loader**和**file-loader**了。对于图片来说，前者默认将文件转化成Base64格式写在最后的打包后模块中。可以通过参数设置，按照文件大小分别处理，小于limit参数的同上处理；而反之，其行为与后者相同，即把资源文件放到最终打包的目标资源文件夹中。

## 第二部分

由于项目的特殊性，开发时要启动多个进程（其实，很多这样的情况）。我在2019年的时候，是使用tmux方案，即写一段`shell`脚本，启动tmux进程、切分终端、在对应终端启动特定进程。今年发现了一个新方法：

```shell
concurrently --handle-input 'nodemon --exec \"node ./build/gen.prod.js > log.txt\"' 'serve -C ./public/' 'webpack-dev-server --config=cfg/webpack/dev.js'
```

如上所示，`concurrently`命令非常直观的接收若干个字符串参数，每一个都说是并行的一个程序，`--handle-input`参数让我可以在任何时间改变任何一个程序的状态。简单说，我同时运行了一个markdown转html程序、一个访问这些html文件的简单http服务器以及骨架网站的开发状态服务器。

其中，`nodemon`的作用是启动后台监听进程，与`concurrently`配合可以在任何时间通过`concurrently --handle-input`生成最新html文件。

## 未完待续……
