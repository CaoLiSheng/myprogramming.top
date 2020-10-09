---
style: antique
title: 读书笔记之《Algorithms》1
date: 2020-10-01 11:35:00
tags:
  - 读书
  - 笔记
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

以下是问题以及我提供的个人解答（P 为总人口数）：

1. 针对算法 2， Show that「标准的 `D <- N/R` 不一定得到正确解」。

思路：首先什么是正确解，即 HHGuess 返回值不等于 R；其次这里不需要证明，只需举出一个例子就行。那么可以捏造一个极端的例子：n 个州，只有一个州具有 N 个人口，其它州人口数都为 0；这时 `D <- N/R`，`reps = (n-1)+N/D = R+n-1 > R`；可见这样 `reps != R`，完成！

2. 针对算法 2，取两个不同数字作为 `D` 和 `D‘`，如果返回的 `reps` 相等，则 `Rep[1 .. N]` 也相同。

思路：分析题意，要想「 `reps` 相等， `Rep[1 .. N]` 也相同」，就必须在 `D` 变化时，有的 `q` 变大，有的 `q` 变小。但是，从 `q <- Pop[i]/D` 看来，`q` 随 `D` 的变化是单调递减的。所以，假设中的情况不可能发生；然而，确实存在不同的 `D` 计算出相同的 `reps` 的情况；进而证明完成！

3. 证明：假如算法 2 计算得到正确的 `reps==R`，那么 `Rep[1 .. n]`与算法 1 在相同参数下的计算结果相同。

思路：算法 1 中的 `R` 参数来自算法 2 的结果 `reps`，说明 `floor(Pop[i]/D)<=Rep[i]<=ceil(Pop[i]/D)`；

且算法 1 中的 `P` 低于算法 2 中的 `D` 时将不再分配议员，反之后续会弹出优先队列分配议员，这是因为算法 2 中的 `D` 实际上是题目中议员数不得超过 `D` 人一个。

接下来考虑，算法 1 中 `Rep[i]=floor(Pop[i]/D)` 时

`P=Pop[i]/sqrt(Rep[i]*(Rep[i]+1))=Pop[i]/sqrt(floor(Pop[i]/D)*ceil(Pop[i]/D))`；

当 `q=Pop[i]/D;q*q<floor(q)*ceil(q)` 时，`P<Pop[i]/q;P<D`，不再分配议员 `Rep[i]=floor(Pop[i]/D)`，两个算法中结果相同；

当 `q=Pop[i]/D;q*q>floor(q)*ceil(q)` 时，`P>Pop[i]/q;P>D`，会再分配一个议员 `Rep[i]=floor(Pop[i]/D)+1=ceil(Pop[i]/D)`，两个算法中结果相同。

当然，考虑某些特殊情况（`Pop[i]<D`）和边界值（`Pop[i] 被 D 整除`）结果也是相同的。

4. 证明：有可能并不存在正确的 `D`。即，存在一组 `Pop[1 .. n]`，`n <= R <= P`，对于所有的 `D > 0` 的数字，都不能通过算法 2 得到正确的 `reps=R`。

~~「呃，没思路，题目就莫名其妙，难道前面几问都是逗我呢！？！」~~

> 为了全局，暂时放过这一块，哈哼！

## 同一本书的文章集

1. [回到开头](scroll-to-the-very-top)
2. [Recursion](post:Algorithms-2-Recursion)
3. [Backtracking](post:Algorithms-3-Backtracking)
