---
style: antique
title: 读书笔记之《Algorithms》2
date: 2020-10-12
tags:
  - 读书
  - 笔记
  - 算法
---

> Backtracking（回溯）

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

0. [Preface-&-Introduction](post:Book-Algorithms-0-Preface-&-Introduction)
1. [Recursion](post:Book-Algorithms-1-Recursion)
1. [回到开头](scroll-to-the-very-top)
1. [Dynamic Programming](post:Book-Algorithms-3-Dynamic-Programming)
1. [Greedy Algorithms](post:Book-Algorithms-4-Greedy-Algorithms)
1. [Basic Graph Algorithms](post:Book-Algorithms-5-Basic-Graph-Algorithms)
1. [Depth-First Search](post:Book-Algorithms-6-Depth-First-Search)
1. [Minimum Spanning Trees](post:Book-Algorithms-7-Minimum-Spanning-Trees)
1. [Shortest Paths](post:Book-Algorithms-8-Shortest-Paths)
