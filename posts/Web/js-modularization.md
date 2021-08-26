---
style: github
title: JS 模块化
date: 2021-03-31
tags:
  - Web
  - 模块化
  - Javascript
---

> ## CommonJS，AMD，UMD，CMD，ES Modules 简介
> ##### 其中 UMD = CommonJS + AMD。
> ##### CommonJS 采用同步加载模块，AMD 采用异步加载模块。
> ##### AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行。
> ##### 然而 CMD 早就凉凉，ESM 是 JavaScript 官方的标准化模块系统。

## CommonJS 的值拷贝 VS. ESM 的值的引用

- CommonJS 的执行（动态加载）主要有以下两个特点
  - CommonJS 模块中 require 引入模块的位置不同会对输出结果产生影响，并且会生成值的拷贝
  - CommonJS 模块重复引入的模块并不会重复执行，再次获取模块只会获得之前获取到的模块的缓存
- 关于 ES6 模块编译时执行（静态编译）会导致有以下两个特点
  - import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行
  - export 命令会有变量声明提前的效果

### 动态加载 VS. 静态编译

- 动态加载
  - 只有当模块运行后，才能知道导出的模块是什么
- 静态编译（JIT）
  - 在编译阶段就能知道导出什么模块

## Tree Shaking

其原理是**打包工具**对代码做**静态分析**，所以 ESM 是合理的选择。
import (from) 后必须是普通字符串（不含变量），所以打包时就可以确定导入的内容；export 同理。

### lodash VS. lodash-es

两者是 lodash 项目的两个分发版，[npm 分支](https://github.com/lodash/lodash/tree/npm) VS. [es 分支](https://github.com/lodash/lodash/tree/es)。
前者不能像后者那样被打包工具 tree shaking，它把所有工具函数封装到了一个函数上下文中；后者采用 ESM。
但是不是说所有采用 ESM 的代码都能被 tree shaking。
假如，你把一大坨东西都写到一个类里，命名“工具类”；这就是个反例了。
典型如 lodash 也是这么理解。
