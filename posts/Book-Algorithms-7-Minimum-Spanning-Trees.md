---
style: antique
title: 读书笔记之《Algorithms》7
date: 2020-11-13
tags:
  - 读书
  - 笔记
  - 算法
  - 图论
  - 最小展开树
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

## 名词解释

- intermediate spanning forest（F）：G 的最小展开树的子图，初始状态时 F 仅包含 G 的一个节点，算法运行时 F 不断地扩展邻边，最终生成一颗展开树。
- useless edge to F：两个端点已经在 F 的同一个子图中。
- safe edge to F：有且仅有一个端点在 F 的某一子图中的最小权重边。
- undecided edge：既不是 useless 也不是 safe 的边。

## Boruvka 算法

```python
def LabelOne(s, count):
  put s into the bag
  while the bag is not empty:
    take v from the bag
    if v is unmarked:
      mark v
      v.comp = count # label
      for each edge v->w:
        put w into the bag

def CountAndLabel(G):
  count = 0
  for v in G:
    unmark v
  for v in G:
    if v is unmarked:
      count += 1 # count
      LabelOne(v, count)
  return count

def AddAllSafeDedges(E, G, count):
  for i in range(1, count+1):
    safe[i] = None
  for each edge uv in E:
    if u.comp != v.comp:
      if safe[u.comp] == None or w(uv) < w(safe[u.comp]):
        safe[u.comp] = uv
      if safe[v.comp] == None or w(uv) < w(safe[v.comp]):
        safe[v.comp] = uv
  for i in range(1, count+1):
    add safe[i] to F

def Boruvka(V, E):
  F = (V, {})
  count = CountAndLabel(F)
  while (count > 1):
    AddAllSafeDedges(E, F, count)
    count = CountAndLabel(F)
  return F
```

### 算法分析

- CountAndLabel：O(V)
- AddAllSafeDedges：O(V + E) 又 G 是连通图（`V<=E+1`），所以 O(E)
- while 循环最多 log(V) 次，所以 Boruvka 算法整体的时间复杂度为 O(E\*log(V))

## Jarník 算法

```python
def JarníkInit(V, E, s):
  for v in range(V - s):
    if vs in E:
      edge(v) = vs
      priority(v) = w(vs)
    else:
      edge(v) = None
      priority(v) = Infinity
    Insert(v)

def JarníkLoop(V, E, s):
  T = ({s}, {})
  for i in range(1, len(V) - 1):
    v = ExtractMin()
    add v and edge(v) to T
    for each neighbor u of v:
      if u not in T and priority(u) > w(uv):
        edge(u) = uv
        DecreaseKey(u, w(uv))

def Jarník(V, E, s):
  JarníkInit(V, E, s)
  JarníkLoop(V, E, s)
```

## 算法分析

JarníkInit 中有 (V-1) 次 Inserts；
JarníkLoop 中有 E 次 DecreaseKeys 和 (V-1) 次 ExtractMins。
所以，若使用 binary heap，算法整体时间复杂度为 `O(E*log(V))`；若使用 fibonacci heap，可以提升到 `O(E+V*log(V))`。
可见，仅当输入的图非常大且边的数量远大于顶点的时，fibonacci heap 才可以发挥作用。

## Kruskal 算法

```python
def Kruskal(V, E):
  sort E by increasing weight
  F = (V, {})
  for v in range(V):
    MakeSet(v)
  for uv in range(sorted(E)):
    if Find(u) != Find(v):
      Union(u, v)
      add uv to F
  return F
```

### 算法分析

- 排序 `O(E*log(E))`
- MakeSet：V 次 `O(1)`
- Find(v)：2E 次 `O(1)`
- Union(u,v)：最多 log(V) 次 `O(1)`

所以，去掉排序不计，算法整体时间复杂度为 `O(E + V*log(V))`；然而排序显然更耗时，整个算法时间复杂度为 `O(E*log(E))`。

可见这三种算法没差，除非用其它一些逻辑复杂，常数级上大于 1 的数据结构或算法来提升理论上的效率；并且，有时候这种提升只适合于某些特定输入。

## 书中的典型案例

- [Boruvka 算法](scroll-to:boruvka-算法)
- [Jarník 算法](scroll-to:jarník-算法)
- [Kruskal 算法](scroll-to:kruskal-算法)

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
1. [Shortest Paths](post:Book-Algorithms-8-Shortest-Paths)
1. [All-Pairs Shortest Paths](post:Book-Algorithms-9-All-Pairs-Shortest-Paths)
1. [Maximum Flows & Minimum Cuts](post:Book-Algorithms-10-Maximum-Flows-&-Minimum-Cuts)
1. [Applications of Flows and Cuts](post:Book-Algorithms-11-Applications-of-Flows-and-Cuts)
1. [NP-Hardness](post:Book-Algorithms-12-NP-Hardness)
