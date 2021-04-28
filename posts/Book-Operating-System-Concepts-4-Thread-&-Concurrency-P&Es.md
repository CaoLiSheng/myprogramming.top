---
style: antique
title: 读书习题之《Operating System Concepts》4
date: 2021-04-27
tags:
  - 读书
  - 习题
  - 编程题
  - 编程项目
  - 操作系统
  - 线程
  - 并发
---

> 习题 of 线程和并发

## Provide three programming examples in which multithreading provides better performance than a single-threaded solution.

1. A web server that services each request in a seperate thread
2. A paralleized application such as matrix multiplication where various parts of the matrix can be worked on in parallel
3. An interactive GUI program such as a debugger where one thread is used to monitor user input, another thread represents the running application, and a third thread monitors performance

## Using Amdahl's Law, calculate the speedup gain of a application that has a 60 percent parallel component for (a) two processing cores and (b) four processing cores.

- With two processing cores we get a speedup of 1.42 times.
- With four processing cores we get a speedup of 1.82 times.

## Does the multithreaded web server exhibit task or data parallelism?

Data parallelism. Each thread is performing the same task, but on different data.

## What are two differences between user-level threads and kernel-level threads? user what circumstances is one type better than the other?

- User-level threads are unknown by the kernel, whereas the kernel is aware of kernel threads
- On systems using either many-to-one or many-to-many model mapping, user threads are scheduled by the thread library, and the kernel schedules kernel threads
- Kernel threads need not be associated with a process, whereas every user thread belongs to a process. Kernel threads are generally more expensive to maintain than user threads, as they must be represented with a kernel data structure.

## Describe the actions taken by a kernel to context-switch between kernel-level threads.

Context switching between kernel threads typically requires saving the value of the CPU registers from the thread being switched out and restoring the CPU registers of the new thread being scheduled.

## What resources are used when a thread is created? How do they differ from those used when a process is created?

Because a thread is smaller than a process, thread creation typically uses fewer resources than process creation. Creating a process requires allocating a process control block (PCB), a rather large data structure. The PCB includes a memory map, a list of open files, and environment variables. Allocating and managing the memory map is typically the most time-consuming activity. Creating either a user thread or a kernel thread involves allocating a small data structure to hold a register set, stack, and priority.

## Assume that an operating system maps user-level threads to the kernel using the many-to-many model and that the mapping is done through LWPs. Furthermore, the system allows developers to create real-time threads for use in real-time systems. Is it necessary to *bind* a real-time thread to an LWP? Explain.

Yes. Timing is crucial to real-time applications. If a thread is marked as real-time but is not bound to an LWP, thread may have to wait to be attached to an LWP before running. Consider a situation in which a real-time thread is running (is attached to an LWP) and then proceeds to block (must perform I/O, has been preempted by a higher-priority real-time thread, is waiting for a mutual exclusion lock, etc.). While the real-time thread is blocked, the LWP it was attached to is assigned to another thread. When the real-time thread has been scheduled to run again, it must first wait to be attached to an LWP. By binding an LWP to a real-time thread, you are ensuring that the thread will be able to run with minimal delay once it is scheduled.

---

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
