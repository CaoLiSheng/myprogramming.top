---
style: antique
title: 读书笔记之《Algorithms》9
date: 2020-11-17
tags:
  - 读书
  - 笔记
  - 算法
---

> All-Pairs Shortest Paths（全部节点对的最短路径）

## 定义

- dist(u,v)：u 到 v 的最短路径长度
- pred(u,v)：u 到 v 的最短路径上倒数第二个节点

## 模板

```python
def ObviousAPSP(V,E,w):
  for every vertex s:
    dist[s,·] = SSSP(V,E,w,s) # 上一章的算法
```

## 重新调整边的权重

`w'(u->v)` = price(u) + `w(u->v)` - price(v)

这么做的好处是不影响整个最短路径

`w'(u~>v)` = (price(u) + `w(u->...)` - price(...)) + (price(...) + `w(...->v)` - price(v)) = price(u) + `w(u~>v)` - price(v)

## Johnson’s Algorithm

新建一个节点 s，连通其它节点但不连通回路。计算 SSSP(s)，price(v)=dist[s,v]。
`w'(u->v)` = dist[s,u] + `w(u->v)` - dist[s,v]总是非负数，因为 SSSP 中 dist[s,u] + `w(u->v)` < dist[s,v]的话，`u->v`就是 tense 状态，算法结束前要被 Relax 的。这么一来，排除了负权重的影响，可以使用高效的 Dijkstra 算法了：

```python
def JohnsonAPSP(V,E,w):
  add a new vertex s
  for every vertex v:
    add a new edge s->v
    w(s->v) = 0

  dist[s,·] = BellmanFord(V,E,w,s)
  if BellmanFord found a negative cycle:
    fail gracefully

  for every edge u->v in E:
    w'(u->v) = dist[s,u] + w(u->v) - dist[s,v]

  for every vertex u:
    dist'[u,·] = Dijkstra(V,E,w',u)

  for every vertex u:
    for every vertex v:
      dist[u,v] = dist'[u,v] - dist[s,u] + dist[s,v]
```

## 动态规划解法

就是[上一章](post:Book-Algorithms-8-Shortest-Paths)中 BellmanFord 算法加了一层循环：

```python
def AllPairsBellmanFord(V,E,w):
  for every vertex u:
    for every vertex v:
      if u == v:
        dist[u,v] = 0
      else:
        dist[u,v] = Infinity

  for i in range(1, V-1):
    for every vertex u:
      for every edge x->v:
        if dist[u,v] > dist[u,x] + w(x->v):
          dist[u,v] = dist[u,x] + w(x->v)
```

## 分治解法

话说我是第一次学到这样的分治，以前仅知道归并排序那种需要找到一个明确的切分点；这种把所有切分点遍历一次的还是头一回：

```python
def LeyzorekAPSP(V,E,w):
  for all vertices u:
    for all vertices v:
      dist[u,v] = w(u->v)

  for i in range(1,lg(V)):
    for all vertices u:
      for all vertices v:
        for all vertices x: # 遍历切分点
          if dist[u,v] > dist[u,x] + dist[x,v]:
            dist[u,v] = dist[u,x] + dist[x,v]
```

## 另一个递归式

前面的动态规划算法所使用的递归式，原理是最短路径包含的边的数量的递归；又有高人利用最短路径传过的节点的数量做了递归：

```python
def FloydWarshell(V,E,w):
  for all vertices u:
    for all vertices v:
      dist[u,v] = w(u->v)

  for all vertices r:
    for all vertices u:
      for all vertices v:
        if dist[u,v] > dist[u,r] + dist[r,v]:
            dist[u,v] = dist[u,r] + dist[r,v]
```

## 书中的典型案例

- [Johnson’s Algorithm](scroll-to:johnson’s-algorithm)
- [动态规划解法](scroll-to:动态规划解法)
- [分治解法](scroll-to:分治解法)
- [另一个递归式](scroll-to:另一个递归式)

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
1. [Minimum Spanning Trees](post:Book-Algorithms-7-Minimum-Spanning-Trees)
1. [Shortest Paths](post:Book-Algorithms-8-Shortest-Paths)
1. [回到开头](scroll-to-the-very-top)
1. [Maximum Flows & Minimum Cuts](post:Book-Algorithms-10-Maximum-Flows-&-Minimum-Cuts)
1. [Applications of Flows and Cuts](post:Book-Algorithms-11-Applications-of-Flows-and-Cuts)
1. [NP-Hardness](post:Book-Algorithms-12-NP-Hardness)
