---
style: antique
title: 读书笔记之《HTML and CSS Design and Build Websites》
date: 2020-09-10 15:28:00
tags:

  + 提升计划
  + 读书笔记
  + 读书
  + 笔记

---

## 结构篇

### 文本

不熟悉的控制文本的标签，有些是语义性质的，有些是样式性质的。

* sup, sub
* strong, em
* blockquote
* abbr, cite, dfn
* address
* ins, del, s

### 列表

一直没用过的 `<dl>,<dt>,<dd>`

### 链接

* 相对路径和绝对路径
* 受到 `mailto:` 的启发，在这个博客里使用 `post:` 做站内文章间跳转

``` typescript
const originalHref = anchor.getAttribute('href');
if (originalHref?.startsWith('post:')) {
  anchor.setAttribute(
    'href',
 `${__site_root__}/#/${originalHref.replace(':', '/')}`
  );
  anchor.setAttribute('target', '_top');
}
```

### 图片

在选择图片时，相机拍出的实景往往是色彩丰富的，这类图片最好采用 JPEG 格式存储。

为了给图片加上标题，并采用规范的 `HTML5` 标签 `figure` ，还写了两个 `showdown` 插件。

``` typescript
{
  type: 'lang',
  regex: /!\[(.*?)\]\(:?(.*?) '(.*?)'\)/g,
  replace:
    '<figure><img alt="$1" src="$2" title="$3" /><figcaption>$3</figcaption></figure>',
},
{
  type: 'lang',
  regex: /!\[(.*?)\]\(:?(.*?) '(.*?)' =(.*?)x(.*?)\)/g,
  replace:
    '<figure><img alt="$1" src="$2" title="$3" width="$4" height="$5" /><figcaption>$3</figcaption></figure>',
}
```

### 表格

`tbody` 和 `tfoot` 也只是为了给表格加样式时方便。

### 表单

表单的目的仅仅是收集用户数据，表单校验的 APIs 需要熟悉一下。

``` css
#datetime:invalid {
    border: solid 1px red;
}

#datetime:valid {
    border: solid 1px blue;
}
```

``` typescript
var theForm = document.forms['the-form'];
if (theForm) {
  var datetime = document.getElementById('datetime');
  datetime.addEventListener('invalid', (e) => {
    // 自定义错误提示文字
    datetime.setCustomValidity('至少写一个字吧');
  });
  datetime.addEventListener('input', (e) => {
    datetime.setCustomValidity(
      datetime.validity.valueMissing ? '至少写一个字吧' : ''
    );
    theForm.reportValidity();
  });
  theForm.checkValidity();

  theForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 手动触发校验
    theForm.checkValidity();

    var data = new FormData(theForm);
    data.delete('x');
    data.delete('y');
    data.forEach((v, k) => {
      if (v instanceof File && v.size <= 0) return;
      if (v === '') return;
      console.log(k, v);
    });
  });
}
```

`label` 是为了给有障碍的人士准备的，有两种写法：

* 包裹住控件
* for="控件 id"

`label` 还可以让点击在自己上的事件作用于与它关联的控件。

### 其它标签

`div` 和 `span` 竟然是哥俩， `span` 在 `inline` 元素中的地位就如同 `div` 在 `block` 元素中的地位。

### Flash Video Audio

`HTML5` 中的 `video` 和 `audio` 标签，都可以指定多个不同文件类型的路径，并且在非常旧的浏览器上显示标签间的内容， `flash 播放器` 就可以放在这里（毕竟播放器大部分都是用户点击才开始播放的，所以不用担心正常播放视频时那个有可能被初始化的 `flash 播放器` ）。

## CSS 篇

### 规则和选择器

* 盒子
    - 宽、高、边框、背景、位置、阴影
* 文字
    - 字体、字号、颜色、粗细、大小写、阴影
* 特殊元素
    - 列表、表单、表格

`CSS` 中的 `C` 非常重要：1）!important；2）选择器更详细；3）同样详细的话后面出现的。这里详细的定义指该选择器选中的元素越少越详细（数一数、比一比）。

`CSS 文件` 最好与 `HTML 文件` 分离开，不论是书写时还是线上时。首先，书写时分离可以改一处影响整个网站；另外，线上分离的好处是第二次加载同一个 `CSS 文件` 时可以有效利用缓存机制。同样的道理应用于 `JS 文件` 。为此，我改进了我的 `markdown -> html` 的逻辑。之前，所有收集到的 `css 文件` 不管有没有用到都先拷贝到发布文件夹， `html 文件` 中包含一条引用和 `<style>...</style>` 两部分。改进后，利用懒加载的方式，动态拼接用到的 `css` ，并且对线上版做文件最小化处理。

``` typescript
const CSSMaps: {
  [key: string]: string;
} = {};

function fetchCSS(base: string): string {
  if (CSSMaps[base]) return CSSMaps[base];

  const baseCSSPath = path.join(
    process.cwd(),
    'src',
    'template',
    'style-source',
 `${base}.css`
  );

  const baseCSSContent = cssMinify(
    fs.readFileSync(baseCSSPath, {
      encoding: 'UTF-8',
    })
  );

  const cssContent = cssMinify(
    tplCSSContent
      .replace('/* base_stylesheet */', baseCSSContent)
      .replace('/* body_padding_pc */', Sheets[base].padding.pc)
      .replace('/* body_padding_mobile */', Sheets[base].padding.mobile)
  );

  CSSMaps[base] = `${base}.${md5(cssContent).substring(0, 20)}.css` ;

  const outFilePath = path.join(outDir, CSSMaps[base]);
  if (fs.existsSync(outFilePath)) fs.removeSync(outFilePath);
  fs.createFileSync(outFilePath);
  fs.writeFileSync(outFilePath, cssContent);

  return CSSMaps[base];
}

function cssMinify(css: string): string {
  if (__production__) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n+.*?(\S)/g, '$1')
      .trim();
  }
  return css;
}
```

### 颜色

`HSL` 分别指色相、饱和度和亮度。色相指色相环上的颜色，饱和度决定其鲜艳程度，而调节一整张照片的亮度可以帮助突出照片的主体。

常用的文字与背景的对比度搭配：

* darkgray text / white bg
* off-white text / black bg

## 后记

说点关于代码注释的吧，上学那会儿真不知道什么该写、什么不该写。有时候差一点就把语法写上去了。这本书里的注释是比较好的范例。
