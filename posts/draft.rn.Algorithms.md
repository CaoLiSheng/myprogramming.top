---
style: antique
title: 读书笔记之《Algorithms》
date: 2020-09-27 13:58:00
tags:
  - 提升计划
  - 读书笔记
  - 读书
  - 笔记
---

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

> 这里不是原文，大意是：每个州的议员数量与州人口有关，不能超过每 3 万一个，同时每个州至少一名议员……

这里有两个算法，以及相关的 4 个问题，最后是我个人提供的解答。

1. Huntington-Hill method（method of equal proportions）

```python
ApportionCongress(Pop[1 .. n],R):
  PQ <- NewPriorityQueue
  // Give every state its first representative
  for s <- 1 to n
    Rep[s] <- 1
    Insert(PQ, s, Pop[i]/sqrt(2))

  // Allocate the remaining n 􀀀 R representatives
  for i <- 1 to n-R
    s <- ExtractMax(PQ)
    Rep[s] <- Rep[s] + 1
    priority <- Pop[s]/sqrt(Rep[s]*(Rep[s]+1))
    Insert(PQ, s, priority)

  return Rep[1 .. n]
```

2. Huntington-Hill Guess

```python
HHGuess(Pop[1 .. n],R, D):
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

以下是问题以及我提供的个人解答（P 为总人口数）：

1. 针对算法 2， Show that「标准的 D=P/R 不一定得到正确解」。

思路：首先什么是正确解，即 HHGuess 返回值不等于 R；其次这里不需要证明，只需举出一个例子就行。那么可以捏造一个极端的例子：n 个州，只有一个州具有 N 个人口，其它州人口数都为 0；这时 `D=N/R`，`reps=(n-1)+N/D=R+n-1`；可见这样 `reps!=R`，完成！
