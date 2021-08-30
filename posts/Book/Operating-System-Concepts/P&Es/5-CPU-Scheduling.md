---
style: antique
title: 读书习题之《Operating System Concepts》5
date: 2021-08-31
tags:
  - 读书
  - 习题
  - 操作系统
  - CPU 调度
---

> 习题 of CPU 调度

## A CPU-scheduling algorithm determines an order for the execution of its scheduled processes. Given n processes to be scheduled on one processor, how many different schedules are possible? Give a formula in terms of n.

$n!$ ($n factorial = n \times (n-1) \times (n-2) \times ... \times 2 \times 1$).

## Explain the difference between preemptive and nonpreemptive scheduling.

Preemptive scheduling allows a process to be interrunpted in the midst of it execution, taking the CPU away and allocating it to another process. Nonpreemptive scheduling ensures that a process relinquishes control of the CPU only when it finishes with its current CPU burst.

## What advantage is there in having different time-quantum sizes at different levels of a multilevel queueing system?

Processes that need more frequent servicing —— for instance, interactive processes such as editors —— can be in a queue with a small time quantum. Processes with no need for frequent servicing can be in a queue with a larger quantum, requiring few context switches to complete the processing and thus making more efficient use the computer.

## Many CPU-scheduling algorithms are parameterized. For example, the RR algorithm requires a parameter to indicate the time slice. Multilevel feedback queues require paramaters to define the number of queues, the scheduling algorithms for each queue, the criteria used to move processes between queues, and so on. These algorithms are thus really sets of algorithms (for example, the set of RR algorithms for all time slices, and so on). One set of algorithms may include another (for example, the FCFS algorithm is the RR algorithm with an infinite time quantum). What (if any) relation holds between the following pairs of algorithm sets?

### a. Priority and SJF

The shortest job has the highest priority.

### b. Multilevel feedback queues and FCFS

The lowest level of MLFQ is FCFS.

### c. Priority and FCFS

FCFS gives the highest priority to the job that has been in existence the longest.

### d. RR and SJF

None.

## Suppose that a CPU scheudling algorithm favors those processes that have used the least processor time in the recent past. Why will this algorithm favor I/O-bound programs yet not permanently starve CPU-bound programs?

It will favor the I/O-bound programs because of the relatively short CPU bursts requested by them; however, the CPU-bound programs will not starve, because the I/O-bound programs will relinquish the CPU relatively often to do their I/O.

## Distinguish between PCS and SCS scheduling.

PCS scheduling is local to the process. It is how the thread library schedules threads onto available LWPs. SCS scheduling is used when the operating system schedules kernel threads. On systems using either the many-to-many or the many-to-one model, the two scheduling models are fundamentally different. On systems using the one-to-one model, PCS and SCS are the same.

---

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
