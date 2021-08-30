---
style: antique
title: 读书笔记之《Operating System Concepts》5
date: 2021-08-30
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

## Load Balancing

`Load balancing` attempts to keep the workload evenly distributed across all processors in an SMP system. There are two general approaches to load balancing: push migration and pull migration. With `push migration`, a specific task periodically checks the load on each processor and —— if it finds an imbalance —— evenly distributes the load by moving (or pushing) threads from overload to idle or less-busy processors. `Pull migration` occurs when an idle processor pulls a waiting task from a busy processor. Push and pull migration need not be mutually exclusive and are, in fact, often implemented in parallel on load-balancing systems.

## Processor Affinity

Interestingly, load balancing often counteracts the benifits of processor affinity. That is, the benifit of keeping a thread running on the same processor is that the thread can take advantage of its data being in that processor's cache memory. Balancing loads of moving a thread from one processor to another removes this benifit. Similarly, migrating a thread between processors may incur a penalty on NUMA systems, where a thread may be moved to a processor that requires longer memory access times. In other words, there is a natural tension between load balancing and minimizing memory access times.

## Heterogeneous Multiprocessing

Although mobile systems now include multicore architectures, some systems are now designed using cores that run the same instruction set, yet vary in terms of their clock speed and power management, including the ability to adjust the power consumption of a core to the point of idling the core. Such systems are known as `heterogeneous multiprocessing` (`HMP`).

## Real-Time CPU Scheduling

`Soft real-time systems` provide no guarantee as to when a critical real-time process will be scheduled. They guarantee only that the process will be given perference over noncritical processes. `Hard real-time systems` have stricter requirements. A task must be serviced by its deadline; service after the deadline has expired is the same as no service at all.

## Minimizing Latency

Two types of latency affect the performance of real-time systems:

1. Interrupt latency
2. Dispatch latency

`Interrupt latency` refers to the period of time from the arrival of an interrupt at the CPU to the start of the routine that services the interrupt. One important factor contributing to interrupt latency is the amount of time interrupts may be disabled while kernel data structures are being updated.

The amount of time required for the scheduling dispatcher to stop one process and start another is known as `dispatch latency`. The `conflic phase` of dispatch latency has two components:

1. Preemption of any process running in the kernel
2. Release by low-priority processes of resources needed by a high-priority process

Following the conflic phase, the dispatch phase schedules the high-priority process onto an available CPU.

## Priority-Based Scheduling

As a result, the scheduler for a real-time operating system must support a priority-based algorithm with preemption. In hard real-time systems, the processes are considered `periodic`. What is unusual about this form of scheduling is that a process may have to announce its deadline requirements to the scheduler. Then, using a technique known as an `admission-control` algorithm, the scheduler does one of two things. It either admits the process, guaranteeing that the proceess will complete on time, or rejects the request as impossible if it cannot guarantee that the task will be serviced by its deadline.

## Rate-Monotonic Scheduling

The `rate-monotonic` scheduling algorithm schedules periodic tasks using a static priority policy with preemption. Upon entering the system, each periodic task is assigned a priority inversely based on its period. The shorter the period, the higher the priority. The rationale bebind this policy is to assign a higher priority to tasks that require the CPU more often. Futhermore, rate-monotonic scheduling assumes that the processing time of a periodic process is the same for each CPU burst.

Rate-monotonic scheduling is considered optimal in that if a set of processes cannot be scheduled by this algorithm, it cannot be scheduled by any other algorithm that assigns static priorities. Despite being optimal, then, rate-monotonic scheduling has a limitation: CPU utilization is bounded, and it is not always possible to maximize CPU resources fully. The worst-case CPU utilization for scheduling $N$ processes is

$$
N(2^{1/N}-1).
$$

With one process in the system, CPU utilization is 100 percent, but it falls to approximately 69 percent as the number of processes approaches infinity. With two processes, CPU utilization is bounded at about 83 percent.

## Earliest-Deadline-First Scheduling

`Earliest-deadline-first` (`EDF`) scheduling assigns prioities dynamically according to deadline. The earlier the deadline, the higher the priority. Under the EDF policy, when a process becomes runnable, it must announce its deadline requirements to the system. Priorities may have to be adjusted to reflect the deadline of the newly runnable process. Not how this differs from real-monotonic scheduling, where priorities are fixed.

Unlike the rate-monotonic algorithm, EDF scheduling does not require that processes be periodic, nor must a process require a constant amount of CPU time per burst. The only requirement is that a process announce its deadline to the scheduler when it becomes runnable. The appeal of EDF scheduling is that it is theoretically optimal —— theoretically, it can schedule processes so that each process can meet its deadline requirements and CPU utilization will be 100 percent. In practice, however, it is impossible to achieve this level of CPU utilization due to the cost of context switching between processes and interrupt handling.

## Proportional Share Scheduling

`Proportional share` schedulers operate by allocating T shares among all applications. An application can receive N shares of time, thus ensuring that the application will have N/T of the total processor time. Proportional share schedulers must work in conjunction with an admission-control policy to guarantee that an application receives its allocated share of time. An admission-control policy will admit a client requesting a particular number of shares only if sufficient shares are available.

## POSIX Real-Time Scheduling

The POSIX standard also provides extensions for real-time computing —— POSIX.1b. POSIX defines two scheduling classes for real-time threads:

- SCHED_FIFO
- SCHED_RR
- SCHED_OTHER (system specific)

The POSIX API specifies the following two functions for getting and setting the scheduling policy:

```c
pthread_attr_getschedpolicy(pthread_attr_t *attr, int *policy)
pthread_attr_setschedpolicy(pthread_attr_t *attr, int policy)
```

## Example: Linux Scheduling

With Version 2.5 of the kernel, the scheduler was overhauled. During development of the 2.6 kernel, the scheduler was again revised; and in release 2.6.23 of the kernel, the `Completely Fair Scheduler` (`CFS`) became the default Linux scheduling algorithm. Standard Linux kernels implement two scheduling classes: (1) a default scheduling class using the CFS scheduling algorithm and (2) a real-time scheduling class.

Rather than using strict rules that associate a relative priority value with the length of a time quantum, the CFS scheduler assigns a proportion of CPU processing time to each task. This proportion is calculated based on the `nice value` assigned to each task. Nice values range from -20 to +19, where a numerically lower nice value indicates a higher relative priority. Tasks with lower nice values receive a higher proportion of CPU processing time than tasks with higher nice values. The default nice value is 0. CFS doesn't use discrete values of time slices and instead identifies a `targeted latency`, which is an interval of time during which every runnable task should run at least once. Proportions of CPU time are allocated from the value of targeted latency. In addition to have default and minimum values, targeted latency can increase if the number of active tasks in the system grows beyond a certain threshold.

The CFS scheduler doesn't directly assign priorities. Rather, it records how long each task has run by maintaining the `virtual run time` of each task using the per-task variable `vruntime`. The virtual run time is associated with a decay factor based on the priority of a task: lower-priority tasks have higher rates of decay than higher-priority tasks. The Linux CFS scheduler provides an efficient algorighm for selecting with task to run next. Rather than using a standard queue data structure, each runnable task is placed in a red-black tree —— a balanced binary search tree whose key is based on the value of `vruntime`. For efficiency reasons, the Linux scheduler caches this value in the variable `rb_leftmost`, and thus determining which task to run next requires only retrieving the cached value.

Linux also implements real-time scheduling using the POSIX standard. Any task scheduled using either the SCHED_FIFO or the SCHED_RR real-time policy runs at a higher priority than normal (non-real-time) tasks. Linux uses two separate priority ranges, one for real-time tasks and a second for normal tasks. Real-time tasks are assigned static priorities within the range of 0 to 99, and normal tasks are assigned priorities from 100 to 139.

The CFS scheduler also supports load balancing, using a sophisticated technique that equalizes the load among processing cores yet is also NUMA-aware and minimizes the migration of threads. Linux identifies a hierarchical system of scheduling domains. A `scheduling domain` is a set of CPU cores that can be balanced against one another. The general strategy behind CFS is to balance loads within domains, bigining at the lowest level of the hierarchy.

## Example: Windows Scheduling

Windows schedules threads using a priority-based, preemptive scheduling algorithm. The Windows scheduler ensures that the highest-priority thread will always run. The portion of the Windows kernel that handles scheduling is called the `dispatcher`. A thread selected to run by the dispatcher will run until it is preempted by a higher-priority thread, until it terminates, until its time quantum ends, or until it calls a blocking system call, such as for I/O.

The dispatcher uses a 32-level priority scheme to determine the order of thread execution. Priorities are divided into two classes. The `variable class` contains threads having priorities from 1 to 15, and the `real-time class` contains threads with priorities ranging from 16 to 31. There is also a thread running at priority 0 that is used for memory management.

+---------------+-----------+------+--------------+--------+--------------+---------------+
|               | real-time | high | above normal | normal | below normal | idle priority |
+:==============+:=========:+:====:+:============:+:======:+:============:+:=============:+
| time-critical | 31        | 15   | 15           | 15     | 15           | 15            |
+---------------+-----------+------+--------------+--------+--------------+---------------+
| highest       | 26        | 15   | 12           | 10     | 8            | 6             |
+---------------+-----------+------+--------------+--------+--------------+---------------+
| above normal  | 25        | 14   | 11           | 9      | 7            | 5             |
+---------------+-----------+------+--------------+--------+--------------+---------------+
| normal        | 24        | 13   | 10           | 8      | 6            | 4             |
+---------------+-----------+------+--------------+--------+--------------+---------------+
| below normal  | 23        | 12   | 9            | 7      | 5            | 3             |
+---------------+-----------+------+--------------+--------+--------------+---------------+
| lowest        | 22        | 11   | 8            | 6      | 4            | 2             |
+---------------+-----------+------+--------------+--------+--------------+---------------+
| idle          | 16        | 1    | 1            | 1      | 1            | 1             |
+---------------+-----------+------+--------------+--------+--------------+---------------+

## Example: Solaris Scheduling

Solaris uses priority-based thread scheduling. Each thread belongs to one of six classes:

1. Time sharing (TS)
2. Interactive (IA)
3. Real time (RT)
4. System (SYS)
5. Fair share (FSS)
6. Fixed priority (FP)

Within each class there are different priorities and different scheduling algorithms. Each scheduling class includes a set of priorities. However, the scheduler converts the class-specific priorities into global priorities and selects the thread with the highest global priority to run. If there are multiple threads with the same priority, the scheduler uses a round-robin queue. Figure below illustrates how the six scheduling classes reate to one another and how they map to global priorities. Notice that the kernel maintains ten threads for servicing interrupts. These threads do no belong to any scheduling class and execute at the highest priority (160-169). As mentioned, Solaris has traditionally used the many-to-many model but switched to the one-to-one model beginning with Solaris 9.

![Solaris scheduling](Operating-System-Concepts-5-CPU-Scheduling/Solaris-Scheduling.png '=365px-')

## Deterministic Modeling

One major class evaluation methods is `analytic evaluation`. Analytic evaluation uses the given algorithm and the system workload to produce a formula or number to evaluate the performance of the algorithm for that workload. `Deterministic modeling` is one type of analytic evaluation. This method takes a particular predetermined workload and defines the performance of each algorithm for that workload.

Deterministic modeling is simple and fast. It gives us exact numbers, allowing us to compare the algorithms. However, it requires exact number for input, and its answers apply only to those cases. The main uses of deterministic modeling are in describing scheduling algorithms and providing examples. In cases where we are running the same program over and over again and can measure the program's processing requirements exactly, we may be able to use deterministic modeling to select a scheduling algorithm. Furthermore, over a set of examples, deterministic modeling may indicate trends that can then be analyzed and proved separately.

## Queueing Models

On many systems, the processes that are run vary from day to day, so there is no static set of processes (or times) to use for deterministic modeling. What can be determined, however, is the distribution of CPU and I/O bursts. These distributions can be measured and then approximated or simply estimated. The result is a mathmatical formula describing the probability of a particular CPU burst. From the CPU-burst distributions and the arrival-time distributions, it is possible to compute the average throughput, utilization, waiting time, and so on for most algorithms.

The computer system is described as a network of servers. Each server has a queue of waiting processes. The CPU is a server with its ready queue, as is the I/O system with its device queues. Knowing arrival rates and service rates, we can compute utilization, average queue length, average waiting time, and so on. This area of study is called `queueing-network analysis`.

Queueing analysis can be useful in comparing scheduling algorithms, but it also has limitations. At the moment, the classes of algorithms and distributions that can be handled are fairly limited. The mathmatics of complicated algorithms and distributions can be difficult to work with. Thus, arrival and service distributions are often defined in mathmatically tractable —— but unrealistic —— ways. It is also generally necessary to make a number of independent assumptions, which may not be accurate. As a result of these difficulties, queueing models are often only approximations of real systems, and the accuracy of the computed results may be questionable.

## Simulations

To get a more accurate evaluation of scheduling algorithms, we can use simulations. Running simulations involves programming a model of the computer system. Software data structures represent the major components of the system. The simulator has a variable representing a clock. As this variable's value is increased, the simulator modifies the system state to reflect the activities of the devices, the processes, and the scheduler. As the simulation executes, statistics that indicate algorithm performance are gathered and printed.

The data to drive the simulation can be generated in several ways. The most common method uses a random-number generator that is programmed to generate data according to probability distributions. Another method is using `trace files`. Simulations can be expensive, often requiring many hours of computer time.

## Implementation

Even a simulation is of limited accuracy. The only completely accurate way to evaluate a scheduling algorithm is to code it up, put it in the operating system, and see how it works. This approach puts the actual alogrithm in the real system for evaluation under real operating conditions. `Regression testing` confirms that the changes haven't made anything worse, and haven't caused new bugs or caused old bugs to be recreated.

## Another COPY of Summary in the Book

- 

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
