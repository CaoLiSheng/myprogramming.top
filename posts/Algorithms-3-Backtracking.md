---
style: antique
title: 读书笔记之《Algorithms》3
date: 2020-10-12
tags:
  - 读书
  - 笔记
  - 算法
---

> Backtracking

## Pattern（recursive brute force）

回溯算法是建立在递归的基础上的，常用于作出一系列决定。算法的目标就是建立一个递归结构，每次递归调用作出其中的一个决定，这个决定必须与之前作出的决定保持一致性。所以，每次递归都必须携带两类数据：

1. 还没有处理的数据
2. 之前作出的决定

对于第二类数据，要做到尽可能的少，才能提升算法的效率。最后，考虑是否能将这个算法应用于更常规的问题（例如 **寻找中位数** 推广到 **寻找第 k 小数**）。

## 推导递归式

已知：`T(n)=sum(T(0) +...+ T(n-1)) + O(n)`

则 `T(n-1)=sum(T(0) +...+ T(n-2)) + O(n-1)`

两式相减得 `T(n) - T(n-1) = T(n-1) + O(n)`

整理后即得递归式 `T(n)=2T(n-1) + O(n)`

## 书中的典型案例

- N 皇后问题
- 游戏树问题（双人棋类游戏，注意两层树节点才构成一个回合）
- 子集之和问题
- 字母串中单词分割问题
- 最长增长子序列（非连续）
- 按访问频率优化二叉搜索树

（陆续完善……）

## 书中习题

（陆续完善……）

## 同一本书的文章集

1. [Preface-&-Introduction](post:Algorithms-1-Preface-&-Introduction)
2. [Recursion](post:Algorithms-2-Recursion)
3. [回到开头](scroll-to-the-very-top)
4. [Dynamic Programming](post:Algorithms-4-Dynamic-Programming)
