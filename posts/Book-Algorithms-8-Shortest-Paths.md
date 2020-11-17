---
style: antique
title: 读书笔记之《Algorithms》8
date: 2020-11-16
tags:
  - 读书
  - 笔记
  - 算法
---

> Shortest Paths（最短路径）

## 定义

给定一**有向加权图**，节点 s 到节点 t 的最短路径 P，满足 `w(P)=sum({w(u->v) | u->v in P})`。

## 名词解释

- SSSP：（Single Source Shortest Path）单起点最短路径
- SPT：（Shortest Path Tree）对短路径树

|    对比    |            SPT            |               MST                |
| :--------: | :-----------------------: | :------------------------------: |
|  树的形态  |    有向的，有根节点的     |       无向的，没有根节点的       |
| 适合的场景 |      天然适合有向图       |          天然适合无向图          |
|   唯一性   | 起点不同产生的 SPT 就不同 | 假如各边权重唯一，MST 就是唯一的 |

## 模板（Ford’s generic relaxation algorithm）

图中每个节点有两个属性

- .dist：当前 `s~>v` 的最短路径**长度**
- .prev：当前 `s~>v` 的最短路径上 v 的前继**节点**

`u->v` 的 tense 状态：`u.dist + w(u->v) < v.dist`。

```python
def InitSSSP(s):
  s.dist = 0
  s.pred = None
  for all vertices v != s:
    v.dist = Infinity
    v.pred = None

def Relax(u->v):
  v.dist = u.dist + w(u->v)
  v.pred = u

def FordSSSP(s):
  InitSSSP(s)
  while there is at least one tense edge:
    Relax any tense edge
```

## 广度优先算法（解 _无权图_ 最短路径问题）

```python
def BFS(s):
  InitSSSP(s)
  Push(s) # 1
  while the queue is not empty:
    u = Pull() #2
    for all edges u->v:
      if v.dist > u.dist + 1: # 5
        v.dist = u.dist + 1 # 3
        v.pred = u # 4
        Push(v) # 1
```

以上 `语句 1、2、3、4` 对于每个节点至多执行一次，`语句 5` 对于每条边至多执行一次。所以，算法的时间复杂度为 `O(V + E)`。

## 深度优先（拓扑顺序）算法（解 _DAG_ 最短路径问题）

递归式：

dist(v) = min({dist(u) + w(u->v)|u->v in DAG})

`BASE CASE`：dist(s) = 0。

根据[第三章](post:Book-Algorithms-3-Dynamic-Programming)和[第六章](post:Book-Algorithms-6-Depth-First-Search)的知识，节点 v 要么是节点 s 无法抵达的，要么`s~>v`中各节点顺序同 DAG 的拓扑排序。

```python
def DagSSSP(s):
  InitSSSP(s)
  for all vertices v in topological order:
    for all edges u->v:
      if v.dist > u.dist + w(u->v):
        v.dist = u.dist + w(u->v)
```

以上，称为 Pull 式，所以，还有个变种，Push 式：

```python
def PushDagSSSP(s):
  InitSSSP(s)
  for all vertices u in topological order:
    for all outgoing edges u->v:
      if v.dist > u.dist + w(u->v):
        v.dist = u.dist + w(u->v)
```

## 最优优先算法（Dijkstra’s Algorithm，解 _加权图_ 最短路径问题）

```python
def NonnegativeDijkstra(s):
  InitSSSP(s)
  for all vertices v:
    Insert(v, v.dist)
  while the priority queue is not empty:
    u = ExtractMin()
    for all edges u->v:
      if u->v is tense:
        Relax(u->v) # Relaxation
        DecreaseKey(v, v.dist)
```

以上算法严格遵守每个节点仅入队一次的规则，假如权重出现负数，同一节点就可能多次入队，且意味着多次 Relaxation 调用：

```python
def Dijkstra(s):
  InitSSSP(s)
  Insert(s, 0)
  while the priority queue is not empty:
    u = ExtractMin()
    for all edges u->v:
      if u->v is tense:
        Relax(u->v) # Relaxation
        if v is in the priority queue:
          DecreaseKey(v, v.dist)
        else:
          Insert(v, v.dist)
```

## 最大限度 Relaxations 算法（Relax ALL the Edges）

```python
def BellmanFord(s):
  InitSSSP(s)
  repeat V-1 times:
    for every edge u->v:
      if u->v is tense:
        Relax(u->v) # Relaxation
  for every edge u->v:
    if u->v is tense:
      return "Negative cycle!"
```

以上算法实际上是从一个动态规划算法一步步简化来的：

```python
def BellmanFordDP0(s):
  dist[0,s] = 0
  for every vertex v != s:
    dist[0,v] = Infinity
  for i in range(1, V-1):
    for every vertex v:
      dist[i,v] = dist[i-1,v]
      for every edge u->v:
        if dist[i,v] > dist[i-1,v] + w(u->v): # consider one edges
          dist[i,v] = dist[i-1,v] + w(u->v)
```

以上算法中 `语句 consider one edges` 实际上运行了 E 次，所以最内层 for 循环可以整体外移一层。即：

```python
def BellmanFordDP1(s):
  dist[0,s] = 0
  for every vertex v != s:
    dist[0,v] = Infinity
  for i in range(1, V-1):
    for every vertex v:
      dist[i,v] = dist[i-1,v]
    for every edge u->v:
      if dist[i,v] > dist[i-1,v] + w(u->v): # consider one edge
        dist[i,v] = dist[i-1,v] + w(u->v)
```

以上算法中 `语句 consider one edges` 里 `dist[i-1,v]` 在循环开始前已经复制给了 `dist[i,v]`，所以可以直接使用。即：

```python
def BellmanFordDP2(s):
  dist[0,s] = 0
  for every vertex v != s:
    dist[0,v] = Infinity
  for i in range(1, V-1):
    for every vertex v:
      dist[i,v] = dist[i-1,v] # consider this copy
    for every edge u->v:
      if dist[i,v] > dist[i,v] + w(u->v):
        dist[i,v] = dist[i,v] + w(u->v)
```

以上算法中 `语句 consider this copy` 实质上说明，可以用一维数组代替当前的二维表格。即

```python
def BellmanFordDP3(s):
  dist[s] = 0
  for every vertex v != s:
    dist[v] = Infinity
  for i in range(1, V-1):
    for every edge u->v:
      if dist[v] > dist[v] + w(u->v):
        dist[v] = dist[v] + w(u->v)
```

最终就如同 `BellmanFord` 了。

由于以上算法在暴力检查每一条边是否 tense 的低效，Moore 基于队列做了优化：

```python
def Moore(s):
  InitSSSP(s)
  Push(s)
  Push(*)
  count = 0
  while the queue contains at least one vertex:
    u = Pull()
    if u == *:
      count += 1
      Push(*)
    else:
      for all edges u->v:
        if u->v is tense:
          if count >= V-1:
            return "Negative cycle!"
          else:
            Relax(u->v)
            if v is not already in the queue:
              Push(v)
```

## 书中的典型案例

- [无权图 最短路径问题](scroll-to:广度优先算法（解-_无权图_-最短路径问题）)
- [有向无环加权图 最短路径问题](scroll-to:深度优先（拓扑顺序）算法（解-_dag_-最短路径问题）)
- [加权图 最短路径问题 使用优先队列](scroll-to:最优优先算法（dijkstra’s-algorithm，解-_加权图_-最短路径问题）)
- [加权图 最短路径问题 最大限度 Relaxations](scroll-to:最大限度-relaxations-算法（relax-all-the-edges）)

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
1. [回到开头](scroll-to-the-very-top)
1. [All-Pairs Shortest Paths](post:Book-Algorithms-9-All-Pairs-Shortest-Paths)
1. [Maximum Flows & Minimum Cuts](post:Book-Algorithms-10-Maximum-Flows-&-Minimum-Cuts)
1. [Applications of Flows and Cuts](post:Book-Algorithms-11-Applications-of-Flows-and-Cuts)
1. [NP-Hardness](post:Book-Algorithms-12-NP-Hardness)
