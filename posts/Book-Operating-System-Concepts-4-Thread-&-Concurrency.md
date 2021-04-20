---
style: antique
title: 读书笔记之《Operating System Concepts》4
date: 2021-04-15
tags:
  - 读书
  - 笔记
  - 操作系统
  - 线程
  - 并发
---

> 线程和并发

## Motivation vs. Benefits

- `Motivation` &ndash; 简单三个字：被逼的。单线程是扛不住业务需求。
- `Benefits`
  - `Responsiveness.` &ndash; Multithreading an interactive application may allow a program to continue running even if part of it is blocked or is performing a lengthy (time-consuming) operation, thereby increasing responsiveness to the user.
  - `Resource sharing.` &ndash; Processes can share resources only through techniques such as shared memory and message passing. Such techniques must be explicilty arranged by the programmer. However, threads share the memory and the resources of the process to which they belong by default. The benefits of sharing code and data is that it allows an application to have several different threads of activity within the same address space.
  - `Economy.` &ndash; It is move economical to create and context-switch threads than processes.
  - `Scalability.` &ndash; The benefits fo multithreading can be even greater in a multiprocessor architecture, where threads may be running in parallel on different processing cores. A single-threaded process can run on only one processor, regardless how many are available.

## Concurrency vs. Parallelism（并发 vs. 并行）

A concurrent system supports more than one task by allowing all the tasks to make progress. In contrast, a parallel system can perform more than one task simultaneously. Thus, it is possible to have concurrency without parallelism. Before the advent of multiprocessor and multicore architectures, most computer systems had only a single processor, and CPU schedulers were designed to provide the illusion of parallelism by rapidly switching between processes, thereby allowing each process to make progress. Such processes were running concurrently, but not in parallel.

## Five Areas Present Challenges in Programming for Multicore Systems

1. `Identifying tasks.` &ndash; This involves examining applications to find areas that can be devided into seperate, concurrent tasks. Ideally, tasks are independent of one another and thus can run in parallel on individual cores.
2. `Balance.` &ndash; While identifying tasks that can run in parallel, programmers must also ensure that the tasks perform equal work of equal value. In some instances, a certain task may not contribute as much value to the overall process as other tasks. Using a seperate execution core to run that task may not be worth the cost.
3. `Data splitting.` &ndash; Just as applications are divided into seperate tasks, the data accessed and manipulated by the tasks must be devided to run on seperate cores.
4. `Data dependency.` &ndash; The data accessed by the tasks must be examined for dependencies between two or more tasks. When one task depends on data from another, programmers must ensure that the execution of the tasks is synchronized to accommodate the data dependency.
5. `Testing and debugging.` &ndash; When a program is running in parallel on multiple cores, many different execution paths are possible. Testing and debugging such concurrent programs is inherently more difficult than testing and debugging single-threaded applications.

## AMDAHL'S LAW

Amdahl's Law is formula that identifies potential performance gains from adding adictional computing cores to an application that has both serial (nonparallel) and parallel components. If $S$ is the portion of the application that must be performed serially on a system with $N$ processing cores, the formula appears as follows:

$$
speedup \le \cfrac{1}{S + \cfrac{1 - S}{N}}
$$

As an example, assume we have an application that is 75 percent parallel and 25 percent serial. If we run this application on a system with two processing cores, we can get a speedup of 1.6 times. If we add additional cores (for a total of four), the speedup is 2.28 times. Below is a graph illustrating Amdahl's Law in several different scenarios.

![Amdahl's Law in several different scenarios](Operating-System-Concepts-4-Thread-&-Concurrency/Amdahl's-Law-in-several-different-scenarios.png)

One interesting fact about Amdahl's Law is that as $N$ approaches infinity, the speedup converges to $1/S$. For example, if 50 percent of an application is performed serially, the maximum speedup is 2.0 times, regardless of the number of processing core we add. This is the fundamental principle behind Amdahl's Law: the serial portion of an application can have a disproportionate effect on the performance we gain by addding additional computing cores.

## Types of Parallelism

- `Data parallelism` &ndash; focuses on distributing subsets of the same data across multiple computing cores and performing the same operation on each core.
- `Task parallelism` &ndash; involves distributing not data but tasks (threads) across multiple computing cores. Each thread is performing aa unique operation. Different threads may be operating on the same data, or they may be operating on different data.

However, data and task parallelism are not mutually exclusive, and an application may in fact use a hybrid of these two strategies.

## User Threads vs. Kernel Threads

However, support for threads may be provided either at the user level, for `user threads`, or by the kernel, for `kernel threads`. User threads are supported **above** the kernel and are managed **without** kernel support, whereas kernel threads are supported and managed directly by the operating system. Virtualy all contemporary operating systems &ndash; including Windows, Linux, and macOS &ndash; support kernel threads.

## Multithreading Models

- `Many-to-One Model` &ndash; The many-to-one model maps many user-level threads to one kernel thread. Thread management is done by the thread library in user space, so it is efficient. However, the entire process will block if a thread makes a blocking system call. Also, because only one thread can access the kernel at a time, multiple threads are unable to run in parallel on multicore systems. For instance:
  - `Green threads` &ndash; a thread library available for Solaris systems and adopted in early versions of Java.
- `One-to-One Model` &ndash; The one-to-one model maps each user thread to a kernel thread. It provides more concurrency than the many-to-one model by allowing another thread to run when a thread makes a blocking system call. It also allows multiple threads to run in parallel on multiprocessors. The only drawback to this model is that creating a user thread requires creating the corresponding kernel thread, and a large number of kernel threads may burden the performance of a system.
  - With an increasing number of processing cores appearing on most systems, limiting the number of kernel threads has become less important. As a result, most operating systems now use the one-to-one model.
- `Many-to-Many Model` &ndash; The many-to-many model multiplexes many user-level threads to a smaller or equal number of kernel threads. The number of kernel threads may be specific to either a particular application or a particular machine (for instance, an application may be allocated more kernel threads on a system with 8 processing cores than a system with 4 cores).
  - Although the many-to-many model appears to be the most flexible of the models discussed, in practice it is difficult to implement. However, in some contemporary concurrency libraries have `developers identify tasks` that are then mapped to threads using the many-to-many model.
  - One variation one the many-to-many model still multiplexes many user-level threads to a smaller or equal number of kernel threads but also allows a user-level thread to be bound to only one kernel thread. This variation is sometimes referred to as the `two-level model`.

Consider the effect of this design on concurrency. Whereas the many-to-one model allows the developer to create as many user threads as she wishes, it does not result in parallelism, because the kernel can schedule only one kernel thread at a time. The one-to-one model allows greater concurrency, but the developer has to be careful not to create too many threads within an application. (In fact, on some systems, she still may be limited in the number of threads she can create.) The many-to-many model suffers from neither of these shortcomings: developers can create as many user threads as necessary, and the corresponding kernel threads can run in parallel on a multiprocessor. Also, when a thread performs a blocking system call, the kernel can schedule another thread for execution.

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
