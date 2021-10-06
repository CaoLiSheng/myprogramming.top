---
style: antique
title: 读书笔记之《Operating System Concepts》8
date: 2021-10-06
tags:
  - 读书
  - 笔记
  - 操作系统
  - 死锁
---

> 死锁

## System Model

Under the normal mode of operation, a thread may utilize a resource in only the following sequence:

1. **Request.** The thread requests the resource. If the request cannot be granted immediately (for example, if a mutex lock is currently held by another thread), then the requesting thread must wait until it can acquire the resource.
2. **Use.** The thread can operate on the resource (for example, if the resource is a mutex lock, the thread can access its critical section).
3. **Release.** The thread releases the resource.

## Deadlock Example

```c
/* thread_one runs in this function */
void *do_work_one(void *param) {
  pthread_mutex_lock(&first_mutex);
  pthread_mutex_lock(&second_mutex);
  /**
   * Do some work
   */
  pthread_mutex_unlock(&second_mutex);
  pthread_mutex_unlock(&first_mutex);

  pthread_exit(0);
}

/* thread_two runs in this function */
void *do_work_two(void *param) {
  pthread_mutex_lock(&second_mutex);
  pthread_mutex_lock(&first_mutex);
  /**
   * Do some work
   */
  pthread_mutex_unlock(&first_mutex);
  pthread_mutex_unlock(&second_mutex);

  pthread_exit(0);
}
```

## Livelock

`Livelock` is another form of liveness failure. It is similar to deadlock; both prevent two or more threads from processing, but the threads are unable to proceed for different reasons. Whereas deadlock occurs when every thread in a set is blocked waiting for an event that can be caused only by another thread in the set, livelock occurs when a thread continuously attempts an action that fails.

```c
/* thread_one runs in this function */
void *do_work_one(void *param) {
  int done = 0;

  while (!done) {
    pthread_mutex_lock(&first_mutex);
    if (pthread_mutex_trylock(&second_mutex)) {
      /**
      * Do some work
      */
      pthread_mutex_unlock(&second_mutex);
      pthread_mutex_unlock(&first_mutex);
      done = 1;
    } else {
      pthread_mutex_unlock(&first_mutex);
    }
  }
  
  pthread_exit(0);
}

/* thread_two runs in this function */
void *do_work_two(void *param) {
  int done = 0;

  while (!done) {
    pthread_mutex_lock(&second_mutex);
    if (pthread_mutex_trylock(&first_mutex)) {
      /**
      * Do some work
      */
      pthread_mutex_unlock(&first_mutex);
      pthread_mutex_unlock(&second_mutex);
      done = 1;
    } else {
      pthread_mutex_unlock(&second_mutex);
    }
  }
  
  pthread_exit(0);
}
```

## Deadlock Necessary Conditions

A deadlock situation can arise if the following four conditions hold simultaneously in a system:

1. **Mutual exclusion.** At least one resource must be held in a nonsharable mode; that is, only one thread at a time can use the resource. If another thread requests that resource, the requesting thread must be delayed until the resource has been released.
2. **Hold and wait.** A thread must be holding at least one resource and waiting to acquire additional resources that are currently being held by other threads.
3. **No preemption.** Resources cannot be preempted; that is, a resource can be released only voluntarily by the thread holding it, after that thread has completed its task.
4. **Circular wait.** A set $\{T_0,T_1,...,T_n\}$ of waiting threads must exist such that $T_0$ is waiting for a resource held by $T_1$, $T_1$ is waiting for a resource held by $T_2$, ..., $T_{n-1}$ is waiting for a resource held by $T_n$, and $T_n$ is waiting for a resource held by $T_0$.

## Resource-Allocation Graph

Deadlocks can be described more precisely in terms of a directed graph called a `system resource-allocation graph`. This graph consists of a set of vertices $V$ and a set of edges $E$. The set of vertices $V$ is partitioned into two different types of nodes: $T=\{T_1,T_2,...,T_n\}$, the set consisting of all the active threads in the system, and $R=\{R_1,R_2,...,R_m\}$, the set consisting of all resource types in the system.

A directed edge from thread $T_i$ to resource type $R_j$ is denoted by $T_i \rarr R_j$; it signifies that thread $T_i$ has requested an instance of resource type $R_j$ and is currently waiting for that resource. A directed edge from resource type $R_j$ to thread $T_i$ is denoted by $R_j \rarr T_i$; it signifies that an instance of resource type $R_j$ has been allocated to thread $T_i$. A directed edge $T_i \rarr R_j$ is called a `request edge`; a directed edge $R_j \rarr T_i$ is called an `assignment edge`.

Pictorially, we represent each thread $T_i$ as a circle and each resource type $R_j$ as a rectangle. Since resource type $R_j$ may have more than one instance, we represent each such instance as a dot within the rectangle. Note that a request edge points only to the rectangle $R_j$, whereas an assignment edge must also designate one of the dots in the rectangle.

## Methods for Handling Deadlocks

Generally speaking, we can deal with the deadlock problem in one of three ways:

- We can ignore the problem altogether and pretend that deadlocks never occur in the system.
- We can use a protocol to prevent or avoid deadlocks, ensuring that the system will never enter a deadlocked state.
- We can allow the system to enter a deadlocked state, detect it, and recover.

The first solution is the one used by most operating systems, including Linux and Windows. It is then up to kernel and application developers to write programs that handle deadlocks, typically using approaches outlined in the second solution. Some systems -- such as databases -- adopt the third solution, allowing deadlocks to occur and then managing the recovery.

## Deadlock Prevention

### Mutual Exclusion

The mutual-exclusion condition must hold.

### Hold and Wait

To ensure this condition never occurs in the system, we must guarantee that, whenever a thread requests a resource, it does not hold any other resources. One protocol that we can use requires each thread to request and be allocated all its resources before it begins execution. This is, of course, impractical for most applicationss due to the dynamic nature of requesting resources.

An alternative protocol allows a thread to request resources only when it has none. A thread may request some resources and use them. Before it can request any additional resources, it must release all the resources that it is currently allocated.

Both these protocols have two main disadvantages. First, resource utilization may be low, since resources may be allocated but unused for a long period. For example, a thread may be allocated a mutex lock for its entire execution, yet only require it for a short duration. Second, starvation is possible. A thread that needs several popular resources may have to wait indefinitely, because at least one of the resources that is needs is always allocated to some other thread.

### No Preemption

To ensure that this condition does not hold, we can use the following protocol. If a thread is holding some resources and requests another resource that cannot be immediately allocated to it (that is, the thread must wait), then all resources the thread is currently holding are preempted.

This protocol is often applied to resources whose state can be easily saved and restored later, such as CPU registers and database transactions. It cannot generally be applied to such resources as mutex locks and semaphores, precisely the type of resources where deadlock occurs most commonly.

### Circular Wait

One way to ensure that this condition never holds is to impose a total ordering of all resource types and to require that each thread requests resources in an increasing order of enumeration.

## Deadlock Avoidance

### Safe State

A state is *safe* if the system can allocate resources to each thread (up to its maximum) in some order and still avoid a deadlock. More formally, a system is in a safe state only if there exists a `safe sequence`. A sequence of threads $<T_1, T_2, ..., T_n>$ is a safe sequence for the current allocation state if, for each $T_i$, the resource requests that $T_i$ can still make can be satisfied by the currently available resources plus the resources held by all $T_j$, with *j < i*. In this situation, if the resources that $T_i$ needs are not immediately available, then $T_i$ can wait until all $T_j$ have finished. When they have finished, $T_i$ can obtain all of its needed resources, complete its designated task, return its allocated resources, and terminate. When $T_i$ terminates, $T_{i+1}$ can obtain its needed resources, and so on. If no such sequence exists, then the system state is said to be *unsafe*.

A safe state is not a deadlocked state. Conversely, a deadlocked state is an unsafe state. Not all unsafe states are deadlocks, however.

### Resource-Allocation-Graph Algorithm

If we have a resource-allocation system with only one instance off each resource type, we can use a variant of the resource-allocation graph. In addition to the request and assignment edges, we introduce a new type of edge, called a `claim edge`. A claim edge $T_i \rarr R_j$ indicates that thread $T_i$ may request resouce $R_j$ at some time in the future. This edge resembles a request edge in direction but is represented in the graph by a dashed line. When thread $T_i$ requests resource $R_j$, the claim edge $T_i \rarr R_j$ is converted to a request edge. Similarly, when a resource $R_j$ is released by $T_i$, the assignment edge $R_j \rarr T_i$ is reconverted to a claim edge $T_i \rarr R_j$.

### Banker's Algorithm

Several data structures must be maintained to implement the banker's algorithm. These data structures encode the state of the resource-allocation system. We need the following data structures, where *n* is the number of threads in the system and *m* is the number of resource types:

- **Available.** A vector of length *m* indicates the number of available resources of each type. If ***Available[j]*** equals *k*, then *k* instances of resource type $R_j$ are available.
- **Max.** An $n \times m$ matrix defines the maximum demand of each thread. If ***Max[i][j]*** equals *k*, then thread $T_i$ may request at most *k* instances of resource type $R_j$.
- **Allocation.** An $n \times m$ matrix defines the number of resources of each type currently allocated to each thread. If ***Allocation[i][j]*** equals *k*, then thread $T_i$ is currently allocated *k* instances of resource type $R_j$.
- **Need.** An $n \times m$ matrix indicates the remaining resource need of each thread. If ***Need[i][j]*** equals *k*, then thread $T_i$ may need *k* more instances of resource type $R_j$ to complete its task. Note that ***Need[i][j]*** equals ***Max[i][j] - Allocation[i][j]***.

#### Safety Algorithm

1. Let ***Work*** and ***Finish*** be vectors of length *m* and *n*, respectively. Initialize ***Work = Available*** and ***Finish[i] = false*** for *i = 0, 1, ..., n-1*.
2. Find and index *i* such that both
   a. ***Finish[i] == false***
   b. ***Need[i] <= Work***
   If no such *i* exist, go to step 4.
3. ***Work = Work + Allocation[i]***,
   ***Finish[i] = true***.
   Go to step 2.
4. If ***Finish[i] == true*** for all *i*, then the system is in a safe state.

#### Resource-Request Algorithm

1. If ***Request[i] <= Need[i]***, go to step 2. Otherwise, raise an error condition, since the thread has exceeded its maximum claim.
2. If ***Request[i] <= Available***, go to step 3. Otherwise, $T_i$ must wait, since the resources are not available.
3. Have the system pretend to have allocated the requested resources to thread $T_i$ by modifying the state as follows:
   a. ***Available = Available - Request[i]***
   b. ***Allocation[i] = Allocation[i] + Request[i]***
   c. ***Need[i] = Need[i] - Request[i]***.
If the resulting resource-allocation state is safe, the transaction is completed, and thread $T_i$ is allocated its resource. However, if the new state is unsafe, then $T_i$ must wait for ***Request[i]***, and the old resource-allocation state is restored.

## Deadlock Detection

### Single Instance of Each Resource Type

If all resources have only a single instance, then we can define a deadlock-detection algorithm that uses a variant of the resource-allocation graph, called a `wait-for` graph. We obtain this graph from the resource-allocation graph by removing the resource nodes and collapsing the appropriate edges.

### Several Instances of a Resource Type

The algorithm employs several time-varying data structures that are similar to those used in the banker's algorithm:

- **Available.** A vector of length m indicates the number of available resources of each type.
- **Allocation.** An $n \times m$ matrix defines the number of resources of each type currently allocated to each thread.
- **Request.** An $n \times m$ matrix indicates the current request of each thread. If ***Request[i][j]*** equals *k*, then thread $T_i$ is requesting *k* more instances of resource type $R_j$.

The detection algorithm described here simply investigates every possible allocation sequence for the threads that remain to be completed.

1. Let ***Work*** and ***Finish*** be vectors of length *m* and *n*, respectively. Initialize ***Work = Available***. For *i = 0, 1, ..., n-1*, if ***Allocation[i]*** != 0, then ***Finish[i] = false***. Otherwise, ***Finish[i] = true***.
2. Find an index *i* such that both
   a. ***Finish[i] == false***
   b. ***Request[i] <= Work***
  If no such *i* exist, go to step 4.
3. ***Work = Work + Allocation[i]***,
   ***Finish[i] = true***.
   Go to step 2.
4. If ***Finish[i] == false*** for some *i, 0 <= i < n*, then the system is in a deadlocked state. Moreover, if ***Finish[i] == false***, then thread $T_i$ is deadlocked.

### Detection-Algorithm Usage

When should we invoke the detection algorithm? The answer depends on two factors:

1. How **often** is a deadlock likely to occur?
2. How **many** threads will be affected by deadlock when it happens?

## Recovery from Deadlock

### Process and Thread Termination

To eliminat deadlocks by aborting a process or thread, we use of two methods. In both methods, the system reclaim all resources allocated to the terminated processes.

- **Abort all deadlocked processes.** This method clearly will break the deadlock cycle, but at great expense. The deadlocked processes may have computed for a long time, and the results of these partial computations must be discarded and probably will have to be recomputed later.
- **Abort one process at a time until the deadlock cycle is eliminated.** This method incurs considerable overhead, since after each process is aborted, a deadlock-detection algorithm must be invoked to determine where any processes are still deadlocked.

If the partial termination method is used, then we must determine which deadlocked process (or processes) should be terminated. Many factors may affect which process is chosen, including:

1. What the priority of the process is
2. How long the process has computed and how much longer the process will compute before completing is designated task
3. How many and what types of resources the process has used (for example, whether the resources are simple to preempt)
4. How many more resources the process needs in order to complete
5. How many processes will need to be terminated

### Resource Preemption

To eliminate deadlocks using resource preemption, we successively preempt some resources from processes and give these resources to other processes until the deadlock cycle is broken.

If preemption is required to deal with deadlocks, then three issues need to be addressed:

1. **Selecting a victim.** Which resources and which processes are to be preempted? As in process termination, we must determine the order of preemption to minimize cost. Cost factors may include such parameters as the number of resources a deadlocked process is holding and the amount of time the process has thus far consumed.
2. **Rollback.** If we preempt a resource from a process, what should be done with that process? Clearly, it cannot continue with its normal execution; it is missing some needed resource. We must roll back the process to some safe state and restart it from that state.

Since, in general, it is difficult to determine what a safe state is, the simplest solution is a total rollback: abort the process and then restart it. Although it is more effective to roll back the process only as far as necessary to break the deadlock, this method requires the system to keep more information about the state of all running processes.

3. **Starvation.** How do we ensure that starvation will not occur? That is, how can we guarantee that resources will not always be preempted from the same process?

In a system where victim selection is based primarily on cost factors, it may happen that same process is always picked as a victim. As a result, this process never completes it designed task, a starvation situation any practical system must address. Clearly, we must ensure that a process can be picked as a victim only a (small) finite number of times. The most common solution is to include the number of rollbacks in the cost factor.

## Another COPY of Summary in the Book

- Deadlock occurs in a set of processes when every process in the set is waiting for an event that can only be caused by another process in the set.
- There are four necessary conditions for deadlock: (1) mutual exclusion, (2) hold and wait, (3) no preemption, and (4) circular wait. Deadlock is only possible when all four conditions are present.
- Deadlocks can be modeled with resource-allocation graphs, where a cycle indicates deadlock.
- Deadlocks can be prevented by ensuring that one of the four necessary conditions for deadlock cannot occur. Of the four necessary conditions, eliminating the circular wait is the only practical approach.
- Deadlock can be avoided by using the banker's algorithm, which does not grant resources if doing so would lead the system into an unsafe state where deadlock would be possible.
- A deadlock-detection algorithm can evaluate processes and resouces on a running system to determine if a set of processes is in a deadlock state.
- If deadlock does occur, a system can attempt to recover from the deadlock by either aborting one of the processes in the circular wait or preempting resources that have been assigned to a deadlock process.

## 笔记目录

0. [回到开头](scroll-to-the-very-top)
