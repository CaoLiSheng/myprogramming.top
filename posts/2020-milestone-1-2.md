---
style: github-colors
title: 「里程碑-2020-1.2」博客 V2.0
date: 2020-11-28
tags:
  - 博客
  - 里程碑
  - 计划
  - 2020
---

## markdown 核心的 styles

- h1-h6
- a
- blockqoute
- code,kbd
- pre,pre code
- ol,ul
- table

V2.0 没有采用单页应用的模式，而是全部采用静态化。HtmlTemplatePlugin 的输出变成了 markdown generator 的输入模板，没有了 iframe 这一层包裹，样式文件如果不做修改会作用于整个页面，所以整理了全部样式文件。

很多样式删掉了，因为觉得大同小异。只剩下写技术分享的 github 样式、写读书笔记的 antique 样式、以及其它的 bountiful 样式。

## 支持 Dark 模式

实现的原理是 CSS3 的变量机制，使用 `var()` 获取变量值的过程中，浏览器会顺着 dom 树一路向根节点查找。所以，通过定义两套变量来实现两种不同的颜色主题。

```css
body[theme='Light']
  --theme-color: white;
  --secondary-theme-color: rgb(246, 248, 250);
  --third-theme-color: rgb(225, 228, 232);
  --contrast-theme-color: rgb(27, 31, 35);
  ……
body[theme='Dark']
  --theme-color: rgb(36, 41, 46);
  --secondary-theme-color: rgb(31, 36, 40);
  --third-theme-color: rgb(27, 31, 35);
  --contrast-theme-color: rgb(225, 228, 232);
  ……
```

## 动画和阴影

动画和阴影在 Vue.js 2.x 中实现起来跟在 ReactJS 实现起来差不多。定义几个 class，用 setTimeout 倒计时；如果是 dom 属性动画，则用 requestAnimationFrame。博客 V2.0 中实现了列表元素依次出现动画，移动端侧边栏滑入滑出动画，阴影渐显渐隐动画。

## 静态化

使用了 Vue.js 2.x 的特性 v-once，即这块内容在页面整个生命周期里只渲染一次：`#main(v-once, v-html="article")`。

```html
<body>
  <div id="article" style="display:none;">
    <article class="markdown-body">
      {{title_tag}}
      <h1>{{article_title}}</h1>
      <h6 class="date-tag">{{date_tag}}</h6>
      {{article_body}}
    </article>
  </div>
  <script>
    var temp = document.getElementById('article');
    window.ARTICLE = temp.innerHTML;
    document.body.removeChild(temp);
  </script>
  <div id="app"></div>
</body>
```

使用以上模板，既渲染了 markdown 生成的代码，又让用户无感知地传递到了 Vue.js 组件中。

## webpack

开发配置总是那么的重要（迷一样的复杂）。此次 V2.0 因为要做静态化，最开始使用 watch 生成模板；很快暴露出问题，vue 项目所打包的文件越来越多，实际有用的是最新打包出来的那份，然而在调用 generator 时全部拷贝到 http serve 目录，导致 generate 这一步越来越慢，最后慢到秒级、十秒级。

这个问题本来是寄希望于一个叫做 CleanWebpackPlugin 的，但是没有卵用，反而把 HtmlTemplatePlugin 生成的 index.html 给干掉了。上网搜了搜，原来是 HtmlTemplatePlugin 默认有缓存，不能在 CleanWebpackPlugin 运作时被识别到，加上 `cache: false` 配置后就好了。然而，如此配置依然没有解决最初的问题，只好把 output 下的文件统统不带 hash 命名；反正开发时各种 `强制刷新` 且 `禁用缓存`，所以影响不大。

最后，我把 watch 模式 换成使用 webpack-dev-server，在 devServer 中配置 writeToDisk 写入 output 目录。

## package.json

这是我每次都飘忽不定的地方。熟练掌握了 concurrently、nodemon、webpack、webpack-dev-server 以及 shell。

```json
{
  "scripts": {
    "test": "echo 'something is going to test.' && ts-node src/tests/lang.ts",
    "devgen": "concurrently 'zsh ./src/scripts/genV1.zsh' 'zsh ./src/scripts/genV2.zsh'",
    "nodemon": "nodemon --exec \"concurrently 'zsh ./src/scripts/genV1.zsh' 'zsh ./src/scripts/genV2.zsh'\"",
    "devbuildgen": "rm -rf build/gen/dev && webpack --silent --config=cfg/webpack/gen.dev.js && npm run devgen",
    "devV1": "concurrently 'serve -C -l 5555 build/v1/posts' 'npm run devbuildgen' 'webpack-dev-server --config=cfg/webpack/site.v1.dev.js'",
    "devV2": "concurrently 'serve -C -l 3333 build/v2/posts' 'npm run devbuildgen' 'webpack-dev-server --config=cfg/webpack/site.v2.dev.js'",
    "publish": "zsh ./src/scripts/prePublish.zsh && webpack -p --devtool=false --config=cfg/webpack/gen.prod.js && webpack -p --devtool=false --config=cfg/webpack/site.v2.prod.js && concurrently 'webpack -p --devtool=false --config=cfg/webpack/site.v1.prod.js' 'zsh ./src/scripts/pubV1.zsh' 'zsh ./src/scripts/pubV2.zsh'"
  }
}
```

## code prettify

> google code prettify

```html
<link
  rel="stylesheet"
  type="text/css"
  href="./pretty-code-resources/prettify.css"
/>
<script
  type="text/javascript"
  src="./pretty-code-resources/prettify.js"
></script>
```

```js
document
  .querySelectorAll('.markdown-body pre')
  .forEach((preElem: HTMLPreElement) => {
    preElem.classList.add('prettyprint');
  });

window['PR'].prettyPrint();
```

## 同系列文章

- [「里程碑-2020-1.0」博客 V1.0](post:2020-milestone-1-0)
- [「里程碑-2020-1.1」博客 V1.1](post:2020-milestone-1-1)
- [回到开头](scroll-to-the-very-top)
