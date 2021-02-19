---
style: github
title: Vuejs--use props in stylus
date: 2020-11-25
tags:
  - Vuejs
  - 写代码时的困惑
---

`CSS3` 中有一特性是定义变量，然后通过 `var()` 取值。本站（宽屏版）就是利用这个特性，做了日间模式和夜间模式的适配。

假设，有一个 Vuejs 组件：绘制一个正方形，props 中定义了 size，我们就可以通过上面的 CSS 特性和 Vuejs 模板语言来实现。

```vue
<template lang="pug">
.rect(:style="{ '--size': size }")
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue({
  props: ['size'],
});
</script>

<style lang="stylus" scoped>
.rect
  width: var(--size);
  height: var(--size);
</style>
```
