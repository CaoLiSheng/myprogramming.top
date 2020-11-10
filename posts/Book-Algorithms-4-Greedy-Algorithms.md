---
style: antique
title: 读书笔记之《Algorithms》4
date: 2020-11-07
tags:
  - 读书
  - 笔记
  - 算法
---

> Greedy Algorithm（贪心算法）

## 排课表

已知每节课的开始时间和结束时间，排出一份包含课程数最多的课表，要求课表中的课程不能有冲突。书上给出了递归式和贪心算法的伪代码，出于好奇我想对比以下其算法效率。首先，是一段给函数执行时间计时的工具函数：

```python
import time


def measure(fn, *args):
    startTime = time.time()

    fn(*args)

    executionTime = (time.time() - startTime)
    print('Execution time in seconds: ' + "{:3.10f}".format(executionTime))
```

为什么保留十位小数，因为递归算法和贪心算法真的是相差十万八千里。以下，是递归算法的实现：

```python
def ScheduleRecursively(S, F):
    count = 0
    for i in range(len(S)):
        LS = []
        LF = []
        RS = []
        RF = []
        for j in range(len(S)):
            if i == j:
                continue
            if F[j] <= S[i]:
                LS.append(S[j])
                LF.append(F[j])
            if S[j] >= F[i]:
                RS.append(S[j])
                RF.append(F[j])
        take = 1 + ScheduleRecursively(LS, LF) + ScheduleRecursively(RS, RF)
        skip = ScheduleRecursively(S[:i]+S[(i+1):], F[:i]+F[(i+1):])
        count = max(take, skip, count)
    return count

measure(lambda: print("result1:", ScheduleRecursively(S[:], F[:])))
```

在贪心算法实现中，为了提升算法整体时间效率，排序算法选择快速排序。还顺便复习了以下快速排序算法：

```python
def swap(M, S, i, j):
    tmp = M[i]
    M[i] = M[j]
    M[j] = tmp
    tmp = S[i]
    S[i] = S[j]
    S[j] = tmp


def partition(M, S, p):
    swap(M, S, p, len(M) - 1)
    l = 0
    for i in range(len(M) - 1):
        if M[i] < M[-1]:
            swap(M, S, i, l)
            l += 1
    swap(M, S, l, len(M) - 1)
    return l


def quickSort(M, S):
    if (len(M) <= 1):
        return
    r = partition(M, S, 0)
    quickSort(M[:r], S[:r])
    quickSort(M[(r+1):], S[(r+1):])


def ScheduleGreedy(S, F):
    quickSort(F, S)
    count = 1
    X = [F[0]]
    for i in range(1, len(F)):
        if (S[i] > X[-1]):
            X.append(F[i])
            count += 1

    print("result2:", count)
    return count


measure(ScheduleGreedy, S[:], F[:])
```

在实现过以上两个算法后，我开动脑筋想出另一个算法，虽然时间复杂度 `O(n^3)`，空间复杂度 `O(n^2)`，都不尽如人意。不过，好歹是自己的想法，记下来（总觉得哪里错了，但是又像是陷入泥沼，想不出改正的方法）：

```python
def myInsert(x, _s, _f):
    if x['f'][-1] < _s:
        x['s'].append(_s)
        x['f'].append(_f)
        return

    for i in range(len(x['s']) - 1):
        if _s >= x['f'][i] and _f <= x['s'][i + 1]:
            x['s'].insert(i + 1, _s)
            x['f'].insert(i + 1, _f)


def MySchedule(S, F):
    X = []
    for i in range(len(S)):
        X.append(dict(s=[S[i]], f=[F[i]]))

    for i in range(len(S)):
        for j in range(len(X)):
            myInsert(X[j], S[i], F[i])

    count = 1
    for i in range(len(X)):
        count = max(len(X[i]['s']), count)

    print("result3:", count)
    return count


measure(MySchedule, S[:], F[:])
```

下面是测试结果：

```python
S = [1, 2, 3, 4, 5, 6, 8, 11, 13]
F = [10, 6, 16, 7, 9, 28, 12, 23, 20]

result1: 3
Execution time in seconds: 2.9179892540
result2: 3
Execution time in seconds: 0.0000200272
result3: 3
Execution time in seconds: 0.0000550747
```

以下是仅仅增加了一节课的数据，结果那个反差呀

```python
S = [1, 2, 3, 4, 5, 6, 8, 11, 13, 15]
F = [10, 6, 16, 7, 9, 28, 12, 23, 20, 27]

result1: 3
Execution time in seconds: 31.6242468357
result2: 3
Execution time in seconds: 0.0000231266
result3: 3
Execution time in seconds: 0.0000698566
```

什么？再增加一个？好吧，请看：

```python
S = [1, 2, 3, 4, 5, 6, 8, 11, 13, 15, 14]
F = [10, 6, 16, 7, 9, 28, 12, 23, 20, 27, 17]

result1: 3
Execution time in seconds: 355.9906930923
result2: 3
Execution time in seconds: 0.0000219345
result3: 3
Execution time in seconds: 0.0000729561
```

呵呵，接近 6 分钟。真可谓：朴素的递归是回溯、聪明的递归是动规；而最后，实际中没卵用，一旦用得上，就能不费吹灰之力，是贪心啊！好了，其实给递归的函数加上缓存，时间效率还是能非常大幅度缩减的，我可以放心的按下 `Run Code`：

```python
S = [1, 2, 3, 4, 5, 6, 8, 11, 13, 15, 14, 19, 18, 21, 26, 25]
F = [10, 6, 16, 7, 9, 28, 12, 23, 20, 27, 17, 22, 31, 24, 30, 29]

result1: 5
Execution time in seconds: 4.0208170414
result2: 5
Execution time in seconds: 0.0000371933
result3: 5
Execution time in seconds: 0.0001478195
```

修改后的递归算法实现：

```python
cache = dict()


def ScheduleRecursively(S, F):
    key = "{}-{}".format(S, F)
    if (key in cache):
        return cache[key]
    count = 0
    for i in range(len(S)):
        LS = []
        LF = []
        RS = []
        RF = []
        for j in range(len(S)):
            if i == j:
                continue
            if F[j] <= S[i]:
                LS.append(S[j])
                LF.append(F[j])
            if S[j] >= F[i]:
                RS.append(S[j])
                RF.append(F[j])
        take = 1 + ScheduleRecursively(LS, LF) + ScheduleRecursively(RS, RF)
        skip = ScheduleRecursively(S[:i]+S[(i+1):], F[:i]+F[(i+1):])
        count = max(take, skip, count)
    cache[key] = count
    return count


measure(lambda: print("result1:", ScheduleRecursively(S[:], F[:])))
```

## General Pattern（归纳交换论证）

1. 假设又一个与贪心算法得出的结论不同的最佳结论
2. 找到最先不同的地方
3. 讨论：假如交换此处不同的选择，并不会让最佳结论变糟糕

从贪心算法的证明步骤中也可以看出其特点：`走一步看一步`。

## 书中的典型案例

- 磁带中的文件排列问题
- [排课表问题](scroll-to:排课表)
- 哈夫曼编码
- 双向选择问题（有意思的是这类问题存在【主动权归属】导致不同的情况）

（陆续完善……）

## 书中习题

（陆续完善……）

## 同一本书的文章集

0. [Preface-&-Introduction](post:Book-Algorithms-0-Preface-&-Introduction)
1. [Recursion](post:Book-Algorithms-1-Recursion)
1. [Backtracking](post:Book-Algorithms-2-Backtracking)
1. [Dynamic Programming](post:Book-Algorithms-3-Dynamic-Programming)
1. [回到开头](scroll-to-the-very-top)
1. [Basic Graph Algorithms](post:Book-Algorithms-5-Basic-Graph-Algorithms)
1. [Depth-First Search](post:Book-Algorithms-6-Depth-First-Search)
