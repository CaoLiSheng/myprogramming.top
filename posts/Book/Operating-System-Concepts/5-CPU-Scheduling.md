---
style: antique
title: 读书笔记之《Operating System Concepts》5
date: 2021-08-24
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

## Multilevel Queue Scheduling

With both priority and round-bobin scheduling, all processes may be placed in a single queue, and the scheduler then selects the process with the highest priority to run. Depending on how the queues are managed, an O(n) search may be necessary to determine the highest-priority process. In practice, it is often easier to have separate queue for each distinct priority, and priority scheduling simply schedules the process in the highest-priority queue. This approach —— known as `multilevel queue` —— also works well when priority scheduling is combined with round-robin: if there are multiple processes in the highest-priority queue, they are executed in round-robin order. In the most generalized form of this approach, a priority is assigned statically to each process, and a process remains in the same queue for the duration of its runtime.

A multilevel queue scheduling algorithm can also be used to partition processes into several separate queue based on the process type. For example, a common division is made between `foreground` (interactive) processes and `background` (batch) processes. These two types of processes have different response-time requirements and so may have different scheduling needs. In addition, foreground process may have priority (externally defined) over background processes, and each queue might have its own scheduling algorithm. The foreground queue might be scheduled by an RR algorithm, for example, while the background queue is scheduled by an FCFS algorithm.

In addition, there must be scheduling among the queues, which is commonly implemented as fixed-priority preemptive scheduling. For example, the real-time queue may have absolute priority over the interactive queue.

Another prossibility is to time-slice among the queues. Here, each queue get a certain portion of the CPU time, which it can then schedule among its various processes. For instance, in the foreground-background queue example, the foreground queue can be given 80 percent of the CPU time for RR scheduling among its processes, while the background queue receives 20 percent of the CPU to give to its processes on an FCFS basis.

## Multilevel Feedback Queue Scheduling

Normally, when the multilevel queue scheduling algorithm is used, processes are permanently assigned to a queue when they enter the system. This setup has the advantage of low scheduling overhead, but it is inflexible. The `multilevel feedback queue` scheduling algorithm, in contrast, allows a process to move between queues. The idea is to separate processes according to the characteristics of their CPU bursts. If a process uses too much CPU time, it will be moved to a lower-priority queue. In addition, a process that waits too long in a lower-priority queue may be moved to a higher-priority queue. This form of aging prevent starvation.

In general, a multilevel feedback queue scheduler is defined by the following parameters:

- The number of queues
- The scheduling algorithm for each queue
- The method used to determine when to upgrade a process to a higher-priority queue 
- The method used to determine when to demote a process to a lower-priority queue 
- The method used to determine which queue a process will enter when that process needs service

The definition of a multilevel feedback queue scheduler makes it the most general CPU-scheduling algorithm. It can be configured to match a specific system under design. Unfortunately, it is also the most complex algorithm, since defining the best scheduler requires some means by which to select values for all the parameters.

## Contention Scope

One distinction between user-level and kernel-level threads lies in how they are scheduled. On systems implementing the many-to-one and many-to-many models, the thread library schedules user-level threads to run on an available LWP. This scheme is known as `process-contention scope` (`PCS`), since competition for the CPU takes place among threads belonging to the same process. To decide which kernel-level thread to schedule onto a CPU, the kernel uses `system-contention scope` (`SCS`). Competition for the CPU with SCS scheduling takes place among all threads in the system. Systems using the one-to-one model, such as Windows and Linux schedule threads using only SCS.

## Pthread Scheduling

On systems implementing the many-to-many model, the `PTHREAD_SCOPE_PROCESS` policy schedules user-level threads onto available LWPs. The number of LWPs is maintained by the thread library, perhaps using scheduler activations. The `PTHREAD_SCOPE_SYSTEM` scheduling policy will create and bind an LWP for each user-level thread on many-to-many systems, effectively mapping threads using the one-to-one policy.

The Pthread IPC (Interprocess Communication) provides two functions for setting —— and getting —— the contention scope policy:

```c
pthread_attr_setscope(pthread_attr_t *attr, int scope)
pthread_attr_getscope(pthread_attr_t *attr, int *scope)
```

In codes below, we illustrate a Pthread scheduling API. The program first determines the existing contention scope and sets it to `PTHREAD_SCOPE_SYSTEM`. It then creates five separate threads that will run using the SCS scheduling policy. Note that on some systems, only certain contention scope values are allowed. For example, Linux and macOS systems allow only `PTHREAD_SCOPE_SYSTEM`.

```c
#include <pthread.h>
#include <stdio.h>
#define NUM_THREADS 5

int main(int argc, char *argv[])
{
  int i, scope;
  pthread_t tid[NUM_THREADS];
  pthread_attr_t attr;

  /* get the default attributes */
  pthread_attr_init(&attr);

  /* first inquire on the current scope */
  if (pthread_attr_getscope(&attr, &scope) != 0)
    fprintf(stderr, "Unable to get scheduling scope\n");
  else {
    if (scope == PTHREAD_SCOPE_PROCESS)
      printf("PTHREAD_SCOPE_PROCESS");
    else if (scope == PTHREAD_SCOPE_SYSTEM)
      printf("PTHREAD_SCOPE_SYSTEM");
    else
      fprintf(stderr, "Illegal scope value\n");
  }

  /* set the scheduling algorithm to PCS or SCS */
  pthread_attr_setscope(&attr, PTHREAD_SCOPE_SYSTEM);

  /* create the threads */
  for (i = 0; i < NUM_THREADS; i++)
    pthread_create(&tid[i], &attr, runner, NULL);

  /* now join on each thread */
  for (i = 0; i < NUM_THREADS; i++)
    pthread_join(tid[i], NULL);
}

/* Each thread will begin control in this function */
void *runner(void *param)
{
  /* do some work ... */
  
  pthread_exit(0);
}
```

## Approaches to Multiple-Processor Scheduling

One approach to CPU scheduling in a multiprocessor system has all scheduling decisions, I/O processing, and other system activities handled by a single processor —— the master server. The other processors execute only user code. This `asymmetric multiprocessing` is simple because only one core accesses the system data structures, reducing the need for data sharing. The downfall of this approach is the master server becomes a potential bottleneck where overall system performance may be reduced.

The standard approach for supporting multiprocessors is `symmetric multiprocessing` (`SMP`), where each processor is self-scheduling. Scheduling proceeds by having the scheduler for each processos examine the ready queue and select a thread to run. Note that this provides two possible strategies for organizing the threads eligible to be scheduled:

1. All threads may be in a common ready queue.
2. Each processor may have its own private queue of threads.

If we select the first option, we have a possible race condition on the shared ready queue and therefore must ensure that two separate processors do not choose to schedule the same thread and that threads are not lost from the queue. We could use some form of locking to protect the common ready queue from this race condition. Locking would be highly contended, however, as all accesses to the queue would require lock ownership, and acccessing the shared queue would likely be a performance bottleneck. The second option permits each processor to schedule threads from its private run queue and therefore does not suffer from the possible performance problems associated with a shared run queue. Thus, it is the most common approach on systems supporting SMP. Additionally, having private, perprocessor run queues in fact may lead to more efficient use of cache memory. There are issues with per-processor run queues —— most notably, workloads of varying sizes. However, balancing algorithms can be used to equalize workloads among all processors.

## Multicore Processors

Traditionally, SMP systems have allowed several processes to run in parallel by providing multiple physical processors. However, most contemporary computer hardware now places multiple computing cores on the same physical chip, resulting in a `multicore processor`. Each core maintains its architectural state and thus appears to the operating system to be a separate logical CPU. SMP systems that use multicore processors are faster and comsume less power than systems in which each CPU has its own physical chip.

Multicore processors may complicate scheduling issues. Processors can spend up to 50 percent of its time waiting for data to become available from memory. To remedy this situation, many recent hardware designs have implemented multithreaded processing cores in which two (or more) `hardware threads` are assigned to each core. That way, if one hardware thread stalls while waiting for memory, the core can switch to another thread. From an operating system perspective, each hardware thread maintains its architectural state, such as instruction pointer and register set, and thus appears as a logical CPU that is available to run a software thread. This technique —— known as `chip multithreading` (CMT) (also known as `simultaneous multithreading` or `hyper-threading`).

In general, there are two ways to multithread a processing core: `coarse-grained` and `fine-grained` multithreading. With coarse-grained multithreading, a thread executes on a core until a long-latency event such as a memory stall occurs. Because of the delay caused by the long-latency event, the core must switch to another thread to begin execution. However, the cost of switching between threads is high, since the instruction pipeline must be flushed before the other thread can begin execution on the processor core. Once this new thread begins execution, it begins filling the pipeline with its instructions. Fine-grained (or interleaved) multithreading switches between threads at a much finer level of granularity —— typically at the boundary of an instruction cycle. However, the architectural design of fine-grained system includes logic for thread switching. As a result, the cost of switching between therads is small.

There are several strategies to adopt in scheduling that specifies how each core decides which hardware thread to run. One approach is to use a simple round-robin algorithm to schedule a hardware thread to the processing core. This is the approach adopted by the UltraSPARC T3, another approach is used by the Intel Itanium. Assigned to each hardware thread is a dynamic `urgency` value ranging from 0 to 7, with 0 representing to lowest urgency and 7 the highest. The Itanium identifies five different events that may trigger a thread switch. When one of these events occurs, the thread-switching logic compares the urgency of the two threads and selects the thread with the hgitest urgency value to execute on the process core.



## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
