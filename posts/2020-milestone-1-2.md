---
style: github-colors
title: 「里程碑-2020-1.2」博客 V2.0
date: 2020-11-13
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

## 同系列文章

- [「里程碑-2020-1.0」博客 V1.0](post:2020-milestone-1-0)
- [「里程碑-2020-1.1」博客 V1.1](post:2020-milestone-1-1)
- [回到开头](scroll-to-the-very-top)
