---
style: github
title: 小小计时器
date: 2020-11-26
tags:
  - Web
  - 灵感乍现
  - Timeout
  - Javascript
  - Typescript
  - Vuejs
---

> 有这么一个需求，输入框的自动补全功能。显然，当用户正在疯狂输入的时候是不需要去帮他补全什么的，就是在那不到一秒的停顿时，才是计算补全信息的最佳时机。

所以，我写了这个小工具函数：

```typescript
export function switcher(
  jobAtOnce: (...params: any[]) => void,
  jobLater: (...params: any[]) => void,
  delay: number
): (...params: any[]) => void {
  let _timer: NodeJS.Timeout | null = null;
  let _need_once: boolean = true;

  // 1
  return (...params: any[]) => {
    if (null !== _timer) clearTimeout(_timer);

    if (_need_once) {
      // 2
      _need_once = false;
      jobAtOnce(...params);
    }

    _timer = setTimeout(() => {
      _timer = null;
      _need_once = true;
      jobLater(...params);
    }, delay);
  };
}
```

这个工具函数一般只计算一次，返回一个可以方便用于每次 `KeyUp` 调用的函数。
`jobAtOnce` 在这里可以是隐藏自动补全面板等等，`jobLater` 在这里可以是计算自动补全数据并显示面板等等。

因其具有只计算一次的特点，所以在 Vuejs 中可以方便地使用 computed 属性来计算。

```typescript
computed: {
  onQueryChanged: function () {
    return switcher(
      () => {
        this.$data.refresh = false;
      },
      () => {
        this.$data.refresh = true;
      },
      200
    );
  },
},
```

搭配 Vuejs 的 watch 也是极好的。

```typescript
watch: {
  query: function () {
    this.onQueryChanged();
  },
},
```
