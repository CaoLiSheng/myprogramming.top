---
style: antique
title: 读书笔记之《Operating System Concepts》5
date: 2021-08-21
tags:
  - 读书
  - 笔记
  - 操作系统
  - CPU 调度
---

> CPU 调度

## The Objective of Multiprogramming

The objective of multiprogramming is to have some process running at all times, to maximize CPU utilization. The idea is relatively simple. A process is executed until it must wait, typically for the completion of some I/O request. In a simple computer system, the CPU then just sits idle. All this waiting time is wasted; no useful work is accomplished. With multiprgramming, we try to use this time productively. Several processes are kept in memory at one time. When one process has to wait, the operating system takes the CPU away from that process and gives the CPU to another process. This pattern continues. Every time one process has to wait, another process can take over use of the CPU. On a multicore system, this concept of keeping the CPU busy is extended to all processing cores on the system.

## CPU-I/O Burst Cycle

The success of CPU scheduling depends on an observed property of processes: process execution consists of a `cycle` of CPU execution and I/O wait. Processes alternate between these two states. Process execution begins with a `CPU burst`. That is followed by an `I/O burst`, which is followed by another CPU burst, then another I/O burst, and so on.

The durations of CPU bursts have been measured extensively. Although they vary greatly from process to process and from computer to computer, they tend to have a frequency curve. The curve is generally characterized as exponential or hyperexponential, with a large number of short CPU bursts and a small number of long CPU bursts. An I/O-bound program typically has many short CPU bursts. A CPU-bound program might have a few long CPU bursts. This distribution can be important when implementing a CPU-scheduling algorithm.

## CPU Scheduler

Whenever the CPU becomes idle, the operating system must select one of the processes in the ready queue to be executed. The selection process is carried out by the `CPU scheduling. A new process (if one exists in the ready queue) must be selected for execution. There is a choice, however, for situations 2 and 3.

When scheduling takes place only under circumstances 1 and 4, we say that the scheduling scheme is `nonpreemptive` for `cooperative`. Otherwise, it is `preemptive`. , which selects a process from the processes in memory that are ready to execute and allocates the CPU to that process.

Note that the ready queue is not necessarily a first-in, first-out (FIFO) queue. As we shall see when we consider the various scheduling algorithms, a ready queue can be implemented as a FIFO queue, a priority queue, a tree, or simply an unordered linked list. Conceptually, however, all the processes in the ready queue are lined up waiting for a chance to run on the CPU. The records in the queues are generally process control blocks (PCBs) of the processes.

## Preemptive and Nonpreemptive Scheduling

CPU-scheduling decisions may take place under the following four circumstances:

1. When a process switches from the running state to the waiting state (for example, as the result of an I/O request or an invocation of `wait()` for the termination of a child process)
2. When a process switches from the running state to the ready state (for example, when an interrupt occurs)
3. When a process switches from the waiting state to the ready state (for example, at completion of I/O)
4. When a process terminates

For situations 1 and 4, there is no choice in terms of scheduling. A new process (if one exists in the ready queue) must be selected for execution. There is a choice, however, for situations 2 and 3.

When scheduling takes place only under circumstances 1 and 4, we say that the scheduling scheme is `nonpreemptive` for `cooperative`. Otherwise, it is `preemptive` (抢占式的). Under nonpreemptive scheduling, once the CPU has been allocated to a process, the process keeps the CPU util it releases it either by terminating or by switching to the waiting state.

A nonpreemptive kernel will wait for a system call to complete or for a process to block while waiting for I/O to complete to take place before doing a context switch. This scheme ensures that the kernel structure is simple, since the kernel will not preempt a process while the kernel data structures are in an inconsistent state. Unfortunately, this kernel-execution model is a poor one for supporting real-time computing, where tasks must complete execution within a given time frame. A preemptive kernel requires mechanisms such as mutex locks to prevent race conditions when accessing shared kernel data structures. Most modern operating systems are now fully preemptive when running in kernel mode.

## Dispatcher

Another component involved in the CPU-scheduling function is the `dispatcher`. The dispatcher is the module that gives control of the CPU's core to the process selected by the CPU scheduler. This function involves the following:

- Switching context from one process to another
- Switching to user mode
- Jumping to the proper location in the user program to resume that program

The dispatcher should be as fast as possible, since it is invoked during every context switch. The time it takes for the dispatcher to stop one process and start another runing is known as the `dispatch latency`.

### Linux Commands

```bash
vmstat 1 3
----cpu---
24 # the avarage number of context switches over 1 second since the system booted
225 # the number of context switches in the past second
339 # the number of context switches in the second previous above
```

```bash
cat /proc/2166/status
...
voluntary_ctxt_switches        150
nonvoluntary_ctxt_switches     8
...
```

## Scheduling Criteria

- `CPU utilization.` We want to keep the CPU as busy as possible. Conceptually, CPU utilization can range from 0 to 100 percent. In a real system, it should range from 40 percent (for a lightly loaded system) to 90 percent (for a heavily loaded system). (CPU utilization can be obtained by using the `top` command on Linux, macOS, and UNIX systems.)
- `Thoughput.` If the CPU is busy executing processes, then work is being done. One measure of work is the number of processes that are completed per time unit, called `throughput`. For long processes, this rate may be one process over several seconds; for short transactions, it may be tens of processes per second.
- `Turnaround time.` From the point of view of a particular process, the important criterion is how long it takes to execute that process. The interval from the time of submission of a process to the time of completion is the turnaround time. Turnaround time is the sum of periods spent waiting in the ready queue, executing on the CPU, and doing I/O.
- `Waiting time.` The CPU-scheduling algorithm does not affect the amount of time during which a process executes or does I/O. It affects only the amount of time that a process spends waiting in the ready queue. Waiting time is the sum of the periods spent waiting in the ready queue.
- `Response time.` In an interactive system, turnaround time may not be the best criterion. Often, a process can produce some output fairly early and can continue computing new results while previous results are being output to the user. Thus, another measure is the time from the submission of a request until the first response is produced. This measure, called response time, is the time it takes to start responding, not the time it takes to output the response.

It is desirable to maximize CPU utilization and throughput and to minimize turnaround time, waiting time, and response time. In most cases, we optimize the average measure. However, under some circumstances, we prefer to optimize the minimum or maximum values rather than the average. Investigators have suggested that, for interactive systems (such as a PC desktop or laptop system), it is more important to minimize the variance in the response time than to minimize the average response time. A system with reasonable and predictable response time may be considered more desirable than a system that is faster on the average but is highly variable.

## First-Come, First-Served Scheduling

By far the simplest CPU-scheduling algorithm is the `first-come first-served (FCFS)` scheduling algorithm, which is also nonpreemptive. With this scheme, the process that requests the CPU first is allocated the CPU first. The implementation of the FCFS policy is easily managed with a FIFO queue. On the negetive side, the average waiting time under the FCFS policy is often quite long, and is generally not minimal and may vary substantially if the processes' CPU burst times vary greatly. In addition, consider the performance of FCFS scheduling in a dynamic situation. There is a `convoy effect` as all the other processes wait for the one big process to get off the CPU. This effect results in lower CPU and device utilization than might be possible if the shorter processes were allowed to go first.

## Shortest-Job-First Scheduling

A different approach to CPU scheduling is the `shortest-job-first (JSF)` (shortest-next-CPU-burst) scheduling algorithm. This algorithm associates with each process the length of the process's next CPU burst. When the CPU available, it is assigned to the process that has the smallest next CPU burst. If the next CPU burst of two processes are the same, FCFS scheduling is used to break the tie.

The SJF scheduling algorithm is provalbly optimal, in that it gives the minimum average waiting time for a given set of process. Moving a short process before a long one decreases the waiting time of short process more than it increases the waiting time of the long process. Consequently, the average waiting time decreases.

Although the SJF algorithm is optimal, it cannot be implemented at the level of CPU scheduling, as there is no way to know the length of the next CPU burst. One approach to this problem is to try to approximate SJF scheduling. We may not know the length of the next CPU burst, but we may be able to predict its value.

The next CPU burst is generally predicted as an `exponential average` of the measured lengths of previous CPU bursts. We can define the exponential average with the following formula. Let $t_n$ be the length of the nth CPU burst, and let $\tau_{n+1}$ be our predicted value for the next CPU burst. Then, for $\alpha$, $0\leq\alpha\leq1$, fedine:

$$
\tau_{n+1} = \alpha t_n + (1-\alpha) \tau_n.
$$

The value of $t_n$ contains our most recent information, while $\tau_n$ stores the past history. The parameter $\alpha$ controls the relative weight of recent and past history in our prediction. If $\alpha=0$, then $\tau_{n+1}=\tau_n$, and recent history has no effect (current conditions are assumed to be transient). If $\alpha=1$, then $\tau_{n+1}=t_n$, and only the most recent CPU burst matters (history is assumed to be old and irrelevant). More commonly, $\alpha=1/2$, so recent history and past history are equally weighted. The initial $\tau_0$ can be defined as a constant or as an overall system average. Figure below shows an exponential average with $\alpha=1/2$ and $\tau_0=10$.

![Prediction of the Length of the Next CPU Burst](Operating-System-Concepts-5-CPU-Scheduling/Prediction-of-the-Length-of-the-Next-CPU-Burst.png '=768px-')

The SJF algorithm can be either preemptive or nonpreemptive. The choice arises when a new process arrives at the ready queue while a previous process is still executing. The next CPU burst of the newly arrived process may be shorter then what is left of the currently executing process. A preemptive SJF algorithm will preempt the current executing process, whereas a nonpreemptive SJF algorithm will allow the current running process to finish it CPU burst. Preemptive SJF scheduling is sometimes called `shortest-remaining-time-first` scheduling.

## Round-Robin Scheduling

The `round-robin (RR)` scheduling algorithm is similar to FCFS scheduling, but preemption is added to enable the system to switch between processes. A small unit of time, called a `time quantum` or `time slice`, is defined. A time quantum is generally from 10 to 100 milliseconds in length. The ready queue is treated as a circular queue. The CPU scheduler goes around the read queue, allocating the CPU to each process for a time interval of up to 1 time quantum.

The average waiting time under the RR policy is often long. The performance of the RR algorithm depends heavily on the size of the time quantum. At one extreme, if the time quantum is extremely large, the RR policy is the same as the FCFS policy. In contrast, if the time quantum is extremely small (say, 1 millisecond), the RR approach can result in a large number of context switches. Thus, we want the time quantum to be large with respect to the context switch time, and it should not be too large. A rule of thumb is that 80 percent of the CPU bursts should be shorter than the time quantum.

## Priority Scheduling

The SJF algorithm is a special case of the general `priority-scheduling` algorithm. A priority is associated with each process, and the CPU is allocated to the process with the highest priority. Equal-priority processes are scheduled in FCFS order. An SJF algorithm is simply a priority alogrithm where the priority is the inverse of the (predicted) next CPU burst.

Priority can be defined either internally or externally. Internally defined priorities use some measurable quantity or quantities to compute the priority of a process. For example, time limits, memory requirements, the number of open files, and the ratio of average I/O burst to average CPU burst have been used in computing priorities. External priorities are set by criteria outside the operating system, such as the importance of the process, the type and amount of funds being paid for computer use, the department sponsoring the work, and other, often political, factors.

Priority scheduling can be either preemptive or nonpreemptive. When a process arrives at the ready queue, its priority is compared with the priority of the currently running process. A preemptive priority scheduling algorithm will preempt the CPU if the priority of the newly arrived process is higher than the priority of the currently running process. A nonpreemptive priority scheduling algorithm will simply put the new process at the head of the ready queue.

A major problem with priority scheduling algorithms is `indefinite blocking`, or `starvation`. A process that is ready to run but waiting for the CPU can be considered blocked. A priority scheduling algorithm can leave some low-priority processes waiting indefinitely. A solution to the problem of indefinite blockage of low-priority processes is `aging`. Another option is to combine round-robin and priority scheduling in such a way that the system executes the highest-priority process and runs processes with the same priority using round-robin scheduling.

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
