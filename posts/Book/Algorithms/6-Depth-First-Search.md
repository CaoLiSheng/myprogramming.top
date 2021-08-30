---
style: antique
title: 读书笔记之《Algorithms》6
date: 2020-11-11
tags:
  - 读书
  - 笔记
  - 算法
  - 图论
  - 深度优先搜索
---

> Depth-First Search（深度优先搜索）

## 模板

```python
def PreProcess(G):
  clock = 0
```

```python
def PreVisit(v):
  clock += 1
  v.pre = clock
```

```python
def PostVisit(v):
  clock += 1
  v.post = clock
```

```python
def DFS(v):
  mark v
  PreVisit(v)
  for w in edge v->w:
    if w is unmarked:
      w.parent = v
      DFS(w)
  PostVisit(v)
```

```python
def DFSAll(G):
  PreProcess(G)
  for v in G:
    unmark v
  for v in G:
    if v is unmarked:
      DFS(v)
```

## 顶点和边的分类

| 顶点状态分类 | 含义                                                |
| :----------- | :-------------------------------------------------- |
| new          | DFS(v) 未被调用时（即 clock < v.pre）               |
| active       | DFS(v) 被调用未结束时（即 v.pre <= clock < v.post） |
| finished     | DFS(v) 调用结束时（即 v.post <= clock）             |

| 边（`u->v`）的分类 | 含义                                                         |
| :----------------- | :----------------------------------------------------------- |
| tree edge          | v is new 且 u.pre < v.pre < v.post < u.post 且 u = v.parent  |
| forward edge       | v is new 且 u.pre < v.pre < v.post < u.post 且 u != v.parent |
| back edge          | v is active 且 v.pre < u.pre < u.post < v.post               |
| cross edge         | v is finished 且 v.post < u.post                             |

![classifying edges](Algorithms-6-Depth-First-Search/classifying-edges.png '~=300px-')

## 检测环路

### 名词定义

- dag：**directed** **acyclic** graph（有向无环图）
- source：dag 中入度为 0 的顶点
- sink：dag 中出度为 0 的顶点

> 每个 dag 中至少有一个 source 和 sink。

```python
def IsAcyclicDFS(v):
  v.status = Active
  for w in range(v->w):
    if w.status == Active:
      return False
    else if w.status == New:
      if IsAcyclicDFS(w) == False:
        return False
  v.status = Finished
  return True

def IsAcyclic(G):
  for v in G:
    v.status = New
  for v in G:
    if v.status == New and IsAcyclicDFS(v) == False:
      return False
  return True
```

`O(V + E)`

## 拓扑排序

> 每个 dag 都有一个拓扑顺序，把其任一后续遍历反序排列就是一个拓扑顺序。

### 计算拓扑顺序的列表

```python
def TopSortDFS(v, slot, S):
  v.status = Active
  for w in rangs(v->w):
    if w.status == New:
      slot = TopSortDFS(w, slot, S)
    else if w.status == Active:
      fail gracefully
  v.status = Finished
  S[slot] = v
  slot -= 1
  return slot

def TopologicalSort(G):
  S = [None] * len(V of G)
  for v in G:
    v.status = New
  slot = size(G) - 1
  for v in G:
    if v.status == New:
      slot = TopSortDFS(v, slot, S)
  return S
```

### 按照拓扑排序就地处理

- 逆序：同后序深度优先遍历
- 顺序：可以考虑先把 dag 完全反转，然后进行后序深度优先遍历（实际中不会这么干，而是先把后序深度优先遍历中的顺序记录到一个数组中，然后简单地遍历一遍数组）

> 反转 dag 后，source 和 sink 调换，时间复杂度为 O(V+E)

## 动态规划及备忘录

### 备忘录

```python
def Memoize(x):
  if value[x] is undefined:
    initialize value[x]
    for all subproblems y of x:
      Memoize(y)
      update value[x] based on value[y]
    finalize value[x]
```

### 动态规划

```python
def DynamicProgramming(G):
  for all subproblems x in postorder:
    initialize value[x]
    for all subproblems y of x:
      update value[x] based on value[y]
    finalize value[x]
```

> 几乎所有的但不是全部的动态规划算法可以用 dag 的后序深度优先遍历表示

## 强连接图

### 名词定义

- 两个顶点强连接：双向间存在连通的路径
- 强连接图：图中任意一对顶点都是强连接的
- 强连接子图：原图中的一部分
- 强连接子图图：由强连接子图组成的图（scg(G)）

> 有向无环图中每个强连接子图仅可能包含一个顶点

- source 强连接子图：scg(G)中的 source 节点
- sink 强连接子图：scg(G)中的 sink 节点

### Kosaraju-Sharir 强连接子图标记算法

> rev(scg(G))==scg(rev(G))

通过不断地识别并“删除” sink 强连接子图实现；然而识别 source 强连接子图更容易些：即拓扑排序第一个节点就是 source 强连接子图根节点；最后用到了：sink in scg(G) = source in rev(scg(G)) = source in scg(rev(G))。

```python
def PushPostRevDFS(v, S):
  mark v
  for u in range(u->v): # reversed
    if u is unmarked:
      PushPostRevDFS(u, S)
  Push(v, S)

def LabelOneDFS(v, r):
  v.root = r
  for w in range(v->w):
    if w.root == None:
      LabelOneDFS(w, r)

def KosarajuSharir(G):
  S = new Stack
  for v in G:
    unmark v
    v.root = None
  for v in G:
    if v is unmarked:
      PushPostRevDFS(v, S)
  while S is non-empty:
    v = Pop(S)
    if v.root == None:
      LabelOneDFS(v, v)
```

### Tarjan 强连接子图标记算法

定义 low(v) = min{u.pre | u in reach(v)}。那么 v 是一个 sink 强连接子图的充要条件是 low(v) == v.pre 且 low(w) < w.pre（w 是 v 的子孙节点）

> 计算 low(v)

```python
clock = 0

def FindLowDFS(v):
  mark v
  clock += 1
  v.pre = clock
  v.low = v.pre
  for w in range(v->w):
    if w is unmarked:
      FindLowDFS(w)
      v.low = min(v.low, w.low)
    else:
      v.low = min(v.low, w.pre)

def FindLow(G):
  for v in G:
    unmark v
    for v in G:
      if v is unmarked:
        FindLowDFS(v)
```

> 使用 辅助栈

```python
clock = 0
S = new empty Stack

def TarjanDFS(v):
  mark v
  clock += 1
  v.pre = clock
  v.low = v.pre
  Push(v, S)
  for w in range(v->w):
    if w is unmarked:
      TarjanDFS(w)
      v.low = min(v.low, w.low)
    else:
      v.low = min(v.low, w.pre)
  if v.low == v.pre:
    do:
      w = Pop(S)
      w.root = v
    while(w!=v)

def Tarjan(G):
  for v in G:
    unmark v
    v.root = None
  for v in G:
    if v is unmarked:
      TarjanDFS(v)
```

## 书中的典型案例

- [检测环路](scroll-to:jian-ce-huan-lu)
- [拓扑排序](scroll-to:tuo-bu-pai-xu)
- [动态规划及备忘录](scroll-to:dong-tai-gui-hua-ji-bei-wang-lu)
- [强连接图](scroll-to:qiang-lian-jie-tu)

（陆续完善……）

## 书中习题

（陆续完善……）

## 同一本书的文章集

0. [Preface-&-Introduction](post:Book<->Algorithms<->0-Preface-&-Introduction)
1. [Recursion](post:Book<->Algorithms<->1-Recursion)
1. [Backtracking](post:Book<->Algorithms<->2-Backtracking)
1. [Dynamic Programming](post:Book<->Algorithms<->3-Dynamic-Programming)
1. [Greedy Algorithms](post:Book<->Algorithms<->4-Greedy-Algorithms)
1. [Basic Graph Algorithms](post:Book<->Algorithms<->5-Basic-Graph-Algorithms)
1. [回到开头](scroll-to-the-very-top)
1. [Minimum Spanning Trees](post:Book<->Algorithms<->7-Minimum-Spanning-Trees)
1. [Shortest Paths](post:Book<->Algorithms<->8-Shortest-Paths)
1. [All-Pairs Shortest Paths](post:Book<->Algorithms<->9-All-Pairs-Shortest-Paths)
1. [Maximum Flows & Minimum Cuts](post:Book<->Algorithms<->10-Maximum-Flows-&-Minimum-Cuts)
1. [Applications of Flows and Cuts](post:Book<->Algorithms<->11-Applications-of-Flows-and-Cuts)
1. [NP-Hardness](post:Book<->Algorithms<->12-NP-Hardness)
