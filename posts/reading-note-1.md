---
style: antique
title: 读书笔记之《HTML and CSS Design and Build Websites》
date: 2020-09-10 15:28:00
tags:
  - 提升计划
  - 读书笔记
  - 读书
  - 笔记
---

## 结构篇

### 文本

不熟悉的控制文本的标签，有些是语义性质的，有些是样式性质的。

- sup,sub
- strong,em
- blockquote
- abbr,cite,dfn
- address
- ins,del,s

### 列表

一直没用过的 `<dl>,<dt>,<dd>`

### 链接

- 相对路径和绝对路径
- 受到 `mailto:` 的启发，在这个博客里使用 `post:` 做站内文章间跳转

```typescript
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

```typescript
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

```css
#datetime:invalid {
  border: solid 1px red;
}
#datetime:valid {
  border: solid 1px blue;
}
```

```typescript
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

- 包裹住控件
- for="控件 id"

`label` 还可以让点击在自己上的事件作用于与它关联的控件。

### 其它标签

`div` 和 `span` 竟然是哥俩，`span` 在 `inline` 元素中的地位就如同 `div` 在 `block` 元素中的地位。

### Flash Video Audio

`HTML5` 中的 `video` 和 `audio` 标签，都可以指定多个不同文件类型的路径，并且在非常旧的浏览器上显示标签间的内容，`flash 播放器` 就可以放在这里（毕竟播放器大部分都是用户点击才开始播放的，所以不用担心正常播放视频时那个有可能被初始化的 `flash 播放器` ）。

## CSS 篇

### ...
