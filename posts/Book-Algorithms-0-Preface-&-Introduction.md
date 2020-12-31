---
style: antique
title: 读书笔记之《Algorithms》0
date: 2020-10-01
tags:
  - 读书
  - 笔记
  - 算法
---

> Preface-&-Introduction

## 习题分类

- 红心：非常有挑战性的题目，有些就是博士学位资格考试题；一小部分非常有挑战性的题目用大号红心标记
- 蓝钻：需要书中后面章节的知识
- 绿草花：需要这本书之外的知识
- 黑桃：需要大量的繁重的工作或者编码；这类题目很少
- 橘星星：十分简单吧

## 算法组成

- 描述
  - What：算法所解决的问题的精确地说明
  - How：算法本身的精确地描述（伪代码）
- 分析
  - Why：证明算法有效的推导过程
  - How fast：对算法运行时间的分析

> _作为算法设计师的主要工作是教别人如何以及为什么你的算法起作用。_

## Congressional Apportionment 问题

大意是：每个州的议员数量与州人口有关，不能超过每 3 万一个，同时每个州至少一名议员……现有两个算法以及一些扩展思考

1. Huntington-Hill method（method of equal proportions）

```python
ApportionCongress(Pop[1 .. n],R):
  PQ <- NewPriorityQueue
  // Give every state its first representative
  for s <- 1 to n
    Rep[s] <- 1
    Insert(PQ, s, Pop[i]/sqrt(2))

  // Allocate the remaining n-R representatives
  for i <- 1 to n-R
    s <- ExtractMax(PQ)
    Rep[s] <- Rep[s] + 1
    priority <- Pop[s]/sqrt(Rep[s]*(Rep[s]+1))
    Insert(PQ, s, priority)

  return Rep[1 .. n]
```

2. Huntington-Hill Guess

```python
HHGuess(Pop[1 .. n],D):
  reps <- 0
  for i <- 1 to n
    q <- Pop[i]/D
    if q * q < floor(q) * ceil(q)
      Rep[i] <- floor(q)
    else
      Rep[i] <- ceil(q)
    reps <- reps + Rep[i]
  return reps
```

1. 针对算法 2， 说明「标准的 `D <- N/R` 不一定得到正确解」。
2. 针对算法 2，取两个不同数字作为 `D` 和 `D‘`，如果返回的 `reps` 相等，则 `Rep[1 .. N]` 也相同。（思路：单调性。）
3. 证明：假如算法 2 计算得到正确的 `reps==R`，那么 `Rep[1 .. n]`与算法 1 在相同参数下的计算结果相同。
4. 证明：有可能并不存在正确的 `D`。即，存在一组 `Pop[1 .. n]`，`n <= R <= P`（P 为总人口数），对于所有的 `D > 0` 的数字，都不能通过算法 2 得到正确的 `reps=R`。

## 书中的典型案例

- 两数相乘
- 议员席位分配

（陆续完善……）

## 书中习题

（陆续完善……）

## 同一本书的文章集

0. [回到开头](scroll-to-the-very-top)
1. [Recursion](post:Book-Algorithms-1-Recursion)
1. [Backtracking](post:Book-Algorithms-2-Backtracking)
1. [Dynamic Programming](post:Book-Algorithms-3-Dynamic-Programming)
1. [Greedy Algorithms](post:Book-Algorithms-4-Greedy-Algorithms)
1. [Basic Graph Algorithms](post:Book-Algorithms-5-Basic-Graph-Algorithms)
1. [Depth-First Search](post:Book-Algorithms-6-Depth-First-Search)
1. [Minimum Spanning Trees](post:Book-Algorithms-7-Minimum-Spanning-Trees)
1. [Shortest Paths](post:Book-Algorithms-8-Shortest-Paths)
1. [All-Pairs Shortest Paths](post:Book-Algorithms-9-All-Pairs-Shortest-Paths)
1. [Maximum Flows & Minimum Cuts](post:Book-Algorithms-10-Maximum-Flows-&-Minimum-Cuts)
1. [Applications of Flows and Cuts](post:Book-Algorithms-11-Applications-of-Flows-and-Cuts)
1. [NP-Hardness](post:Book-Algorithms-12-NP-Hardness)
