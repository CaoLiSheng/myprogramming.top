---
style: github2
title: 2020年里程碑 - 1
date: 2020-08-09 16:14:00
tags:
  - 里程碑
  - 提升计划
  - 2020
---

## 前言

> 这几天一直在等通知，所以暂时不能离开昆明回老家。边写代码、边暗黑 3 过了两周，终于完成了类似 Hexo 的博客工具开发。现在在这里树立一个里程碑，也顺便总结一下。

## 第一部分

首先是代码打包配置部分。最近在抖音上看到又出了一个新的打包神器，但是我并没有去调研，所以依旧使用`webpack`。

使用`babel-loader`把最新规范下的模块化代码转化为 es5 规范输出，这里有三份配置。

1. 处理 markdown 文章的 NodeJS 程序
2. 骨架网站的开发版配置，就是多了 react-hot-reload
3. 骨架网站的线上版配置

提到**骨架网站**，我实在想不出什么名字来命名，就是 Hexo 里的主题。而我感觉文章像血肉，而这个主题像骨架，整体来看就是我的博客。骨架网站中另需处理 CSS3 样式和各类资源文件，所以需要`style-loader`、`css-loader`、`sass-loader`、`url-loader`这四个加载器。

> 这里就不得不提到**url-loader**和**file-loader**了。对于图片来说，前者默认将文件转化成 Base64 格式写在最后的打包后模块中。可以通过参数设置，按照文件大小分别处理，小于 limit 参数的同上处理；而反之，其行为与后者相同，即把资源文件放到最终打包的目标资源文件夹中。

## 第二部分

由于项目的特殊性，开发时要启动多个进程（其实，很多这样的情况）。我在 2019 年的时候，是使用 tmux 方案，即写一段`shell`脚本，启动 tmux 进程、切分终端、在对应终端启动特定进程。今年发现了一个新方法：

```shell
concurrently --handle-input 'nodemon --exec \"node ./build/gen.prod.js > log.txt\"' 'serve -C ./public/' 'webpack-dev-server --config=cfg/webpack/dev.js'
```

如上所示，`concurrently`命令非常直观的接收若干个字符串参数，每一个都说是并行的一个程序，`--handle-input`参数让我可以在任何时间改变任何一个程序的状态。简单说，我同时运行了一个 markdown 转 html 程序、一个访问这些 html 文件的简单 http 服务器以及骨架网站的开发状态服务器。

其中，`nodemon`的作用是启动后台监听进程，与`concurrently`配合可以在任何时间通过`concurrently --handle-input`生成最新 html 文件。

## 第三部分

那么接下来总结由 markdown 转化为 html 部分。主要由三部分组成：一小段 NodeJS 程序、一个模版、一些 CSS 样式表。程序部分仅使用到`fs-extra`、`moment`、`showdown`三个外部包。首先，创建或者清空输出文件夹。

```javascript
import fs from 'fs-extra';

...

fs.mkdirSync(outDir, { recursive: true });
fs.emptyDirSync(outDir);
```

> 这里需要说明输入、输出文件夹内结构。输入文件夹内仅包含 markdown 文件以及可能存在的同名的一个文件夹，里面存放对应文章的资源。输出文件夹也很简单，包含所有 CSS 样式表、生成的 html 文件、所有的与文章对应的资源文件夹、数据库文件（JSON 格式）。

所以，拷贝 CSS 样式表文件与拷贝资源文件，一气呵成。

```typescript
import styles from '@tpl/styles';

...

// Copy CSS Assets
Object.keys(styles).forEach((stylesheet) => {
  const { src, desc } = styles[stylesheet];
  fs.copySync(path.join(process.cwd(), ...src), path.join(outDir, desc));
});
console.log('CSS Assets Copied');

--- @tpl/styles.ts

export default {
  github: { // 样式表名称，后面会用到
    src: ['src', 'tpl', 'style-source', 'github.css'], // 源文件所在路径，本来源文件是在node_modules里的，后来随着我发现越来越多的样式表就拷贝到了src里面
    desc: 'github.css', // 在输出文件夹里的文件名
  }
};
```

接着，定义数据库结构。

```typescript
// recursive numberic key object
export interface RNK {
  [key: number]: RNK | string[];
}

export interface PublicMeta {
  date: string;
  tags: string[];
}

export interface Schema {
  metas: { [key: string]: PublicMeta }; // 元数据
  sortedPosts: string[]; // 按日期倒排大列表
  dateCategories: RNK; // 按日期（年、月、日）逐级分类
  tagCategories: { [key: string]: string[] }; // 按标签分类
}
```

最后，解析 markdown 文件并生成数据库文件和 html 文件，大致上就是这么三个步骤。解析的手段主要是正则表达式，写入数据库需要用到`moment`包，生成 html 由`showdown`全权负责。这里面最省事的就是生成 html。

```typescript
import showdown from 'showdown';

// Construct Converter
const converter = new showdown.Converter();

...

const body = converter.makeHtml(content);
```

对头部的解析需要两组正则表达式（hhh 反正我是没有一次搞定）。

```text
头部大致长以下这个样子：
---
style: amblin
title: 2020 年里程碑 - 1
date: 2020-08-09 16:14:00
tags:
  - 里程碑
  - 提升计划
  - 2020
---
```

```typescript
const matches = fileContent.match(
  /^---\nstyle: (.*?)\ntitle: (.*?)\ndate: (.*?)\n(?:tags:.*?\n([\s\S]*?))?---\n([\s\S]*)$/
);

if (!matches) throw new Error(`文章[ ${fileName} ]头部信息解析出现错误！`);

const [stylesheet, title, date, tags, content] = matches.slice(1);
```

如上代码所示，stylesheet 的值就是之前提到的样式表名称，必须是存在的名称，否则没有华丽的样式可言。tags 就是初步解析出来的标签相关部分，需要进一步使用第二个正则表达式进行处理。

```typescript
const tagsRe = /- (.*?)\n/g;
const parsedTags = [];
if (tags) {
  let tempTag;
  while ((tempTag = tagsRe.exec(tags))) {
    parsedTags.push(tempTag[1]);
  }
}
```

按照模版生成 html 文件仅需要几处字符串替换即可，我思考了很久也没有找到合适的模版关键字语法。这里就是耦合比较重的地方了。如下，大部分情况使用单标签方式，CSS 中使用区间注解方式，主要目的是为了让编辑器 lint 顺利通过（hhh 反正我就是不喜欢 JSP）。

```typescript
fs.writeFileSync(
  outFilePath,
  tplContent
    .replace('<title />', title)
    .replace('<stylesheet />', './' + styles[stylesheet].desc)
    .replace('<body_title />', title)
    .replace('/* body_padding_0 */', getBodyPadding0(stylesheet))
    .replace('/* body_padding_1 */', getBodyPadding1(stylesheet))
    .replace('<body />', body)
);
```

模版也起着关键作用，首先说明在生成 html 文件这个过程中发挥的作用，在之后还有别的作用。自定义的网页标题、样式、文章标题并且把文章内容和标题组合放到一个区域下进行管理，并且可以对不同样式表中可能存在的 bug 进行统一的修复。

```html
<article class="markdown-body">
  <h1><body_title /></h1>
  <body />
</article>
```

## 未完待续……
