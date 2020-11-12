---
style: antique
title: 读书笔记之《Algorithms》7
date: 2020-11-12
tags:
  - 读书
  - 笔记
  - 算法
---

> Minimum Spanning Trees（最小展开树）

## 定义

将一个**无向连通加权图**展开成树，最小展开树就是使得权重只和最小的展开树。简单表示下`G=(V,E)，w:E->Real Number => w(T)=sum(w(e)) where e in T`。

## 引理

假如**无向连通加权图**中各边权重各不相同，则该图有唯一的最小展开树。

### 证明

设 `G` 是无向连通加权图且有两颗最小展开树 `T` 和 `T'`；

不同的最小展开树必须包含至少一条另一最小展开树没有的边；所以设 `e = min{w(e) | T \ T'}` 且 `e' = min{w(e') | T' \ T}`，且不妨假设 `w(e) <= w(e')`。

`T' + {e}`一定包含一个环且传过 `e`，设 `e"` 为任一这条环上且不在 `T` 中的边。

因为 `e" != e` 且 `e" in T' \ T` ，所以 `w(e") >= w(e') >= w(e)`。

考虑 `T" = T' + e - e"`（可能与 `T` 相同），`w(T") = w(T') + w(e) - w(e") <= w(T')`。由于 `T'` 是最小展开树，所以 `T"` 也是最小展开树。三颗树是相同的，`G` 的最小展开树是唯一的。

## 书中的典型案例

（陆续完善……）

## 书中习题

（陆续完善……）

## 同一本书的文章集

0. [Preface-&-Introduction](post:Book-Algorithms-0-Preface-&-Introduction)
1. [Recursion](post:Book-Algorithms-1-Recursion)
1. [Backtracking](post:Book-Algorithms-2-Backtracking)
1. [Dynamic Programming](post:Book-Algorithms-3-Dynamic-Programming)
1. [Greedy Algorithms](post:Book-Algorithms-4-Greedy-Algorithms)
1. [Basic Graph Algorithms](post:Book-Algorithms-5-Basic-Graph-Algorithms)
1. [Depth-First Search](post:Book-Algorithms-6-Depth-First-Search)
1. [回到开头](scroll-to-the-very-top)
