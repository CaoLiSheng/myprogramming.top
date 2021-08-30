---
style: antique
title: 读书笔记之《Algorithms》1
date: 2020-10-09
tags:
  - 读书
  - 笔记
  - 算法
  - 递归
---

> Recursion（递归）

## Reduction（降低复杂度技术）

例如，`Congressional Apportionment 问题` 中 `ApportionCongress` 算法将问题转化为对 `优先队列` 的 `插入` 和 `弹出最大优先项` 的操作。`优先队列` 对 `ApportionCongress` 算法来说是个黑箱，后者无需关心前者的正确性，然而选择合适的实现会影响算法的运行效率，这正是算法分析中的 `Why` 和 `How Fast`。

## Recursion（递归，一种特殊的 Reduction）

1. 如果，能直接得到解，则直接解（Base Case）
2. 否则，将问题拆分为一个或多个更简单的相同的问题（Reduction）

## Pattern（Divide-And-Conquer）

1. **Divide**：把给定的一个规模较大问题分解为一个或多个规模较小的相同问题
2. **Delegate**：指定每个小问题调用递归方式求解
3. **Combine**：将每个小问题的解整合起来作为给定问题的解

## Recursion Trees

递归式 `T(n)=rT(n/c)+f(n)` 的递归树结构可以描述为：共 `L=log(c)(n)` 层，第 `l` 层 `pow(r, l)` 个节点，用时 `T'(l)=pow(r, l)*f(n/pow(c, l))`，总用时 `T(n)=T'(0)+T'(1)+ .. +T'(L)`。

计算总用时，有三种特殊情况：

1. `T'(l)` 随着 `l` 从 `0` 到 `L` 其最高阶项的阶 `指数级不断减小`，则 `T(n)=O(T'(0))=O(f(n))`
2. `T'(l)` 随着 `l` 从 `0` 到 `L` 其最高阶项的阶 `没有变化`，则 `T(n)=O(f(n)*L)=O(f(n)*log(c)(n))`
3. `T'(l)` 随着 `l` 从 `0` 到 `L` 其最高阶项的阶 `指数级不断增加`，则 `T(n)=O(T'(L))=O(pow(r, log(c)(n))*f(n0))=O(pow(n, log(c)(r)))`

## Domain Transformations

**作用**：移除求解递归式时的 `floors`、`ceilings` 以及`低阶项`。

以 `MergeSort` 为例 `T(n) = T(floor(n/2)) + T(ceil(n/2)) + n`。

1. 由于目标是计算 `T(n)=O(·)`，即 `上界`，所以可以适当放大一下：`T(n) <= 2T(ceil(n/2)) + n <= 2T(n/2+1) + n`

2. 定义一个函数 `S(n)=T(n+𝛼)`，寻找常量 `𝛼` 使得 `S(n) <= 2S(n/2) + O(n)`

```python
S(n) = T(n+𝛼)
    <= 2T(n/2+𝛼/2+1) + n+𝛼
     = 2S(n/2-𝛼/2+1) + n+𝛼
```

指定 `𝛼=2`，则 `S(n)<=2S(n/2)+n+2=2S(n/2) + O(n)`，满足预期

3. 通过 `递归树方法` 可以得出 `S(n)<=O(n*log(n))`，则 `T(n)=S(n-2)<=O((n-2)*log(n-2))=O(n*log(n))`，满足预期

## 书中的典型案例

- 汉诺塔
- 归并排序
- 快速排序
- 快速选择第 k 小元素
- `T(n)<O(pow(n, 2))` 的乘法
- 计算指数

（陆续完善……）

## 书中习题

（陆续完善……）

## 同一本书的文章集

0. [Preface-&-Introduction](post:Book<->Algorithms<->0-Preface-&-Introduction)
1. [回到开头](scroll-to-the-very-top)
1. [Backtracking](post:Book<->Algorithms<->2-Backtracking)
1. [Dynamic Programming](post:Book<->Algorithms<->3-Dynamic-Programming)
1. [Greedy Algorithms](post:Book<->Algorithms<->4-Greedy-Algorithms)
1. [Basic Graph Algorithms](post:Book<->Algorithms<->5-Basic-Graph-Algorithms)
1. [Depth-First Search](post:Book<->Algorithms<->6-Depth-First-Search)
1. [Minimum Spanning Trees](post:Book<->Algorithms<->7-Minimum-Spanning-Trees)
1. [Shortest Paths](post:Book<->Algorithms<->8-Shortest-Paths)
1. [All-Pairs Shortest Paths](post:Book<->Algorithms<->9-All-Pairs-Shortest-Paths)
1. [Maximum Flows & Minimum Cuts](post:Book<->Algorithms<->10-Maximum-Flows-&-Minimum-Cuts)
1. [Applications of Flows and Cuts](post:Book<->Algorithms<->11-Applications-of-Flows-and-Cuts)
1. [NP-Hardness](post:Book<->Algorithms<->12-NP-Hardness)
