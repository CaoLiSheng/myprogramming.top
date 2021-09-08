---
style: antique
title: 读书笔记之《Operating System Concepts》6
date: 2021-09-07
tags:
  - 读书
  - 笔记
  - 操作系统
  - 同步工具
---

> 同步工具

## The Critical-Section Problem

Consider a system consisting of n processes $\{P_0,P_1,...,P_{n-1}\}$. Each process has a segment of code, called a `critical section`, in which the process may be accessing —— and updating —— data that is shared with at least one other process. The important feature of the system is that, when one process is executing in its critical section, no other process is allowed to execute in its critical section. That is, no two processes are executing in their critical sections at the same time. The `critical-section problem` is to design a protocol that the processes can use to synchronize their activity so as to cooperatively share data. Each process must request permission to enter its critical section. The section of code implementing this request is the `entry section`. The critical section may be followed by an `exit section`. The remaining code is the `remainder section`.

A solution to the critical-section problem must satisfy the following three requirements:

1. `Mutual exclusion.` If process $P_i$ is executing in its critical section, then no other processes can be executing in their critical sections.
2. `Progress.` If no process is executing in its critical section and some processes wish to enter their critical sections, then only those processes that are not executing in their remainder sections can participate in deciding which will enter its critical section next, and this section cannot be postponed indefinitely.
3. `Bounded waiting.` There exists a bound, or limit, on the number of times that other processes are allowed to enter their critical sections after a process has made a request to enter its critical section and before that request is granted.

## Peterson's Solution

```c
int turn;
boolean flag[2];

/* solution of critical-section problem */
while (true) {
  flag[i] = true;
  turn = j;
  while (flag[j] && turn == j)
    ;
  
    /* critical section */
  
  flag[i] = false;

    /* remainder section */
}
```

We now prove that this solution is correct. We need to show that:

1. Mutual exclusion is preserved.
2. The progress requirement is satisfied.
3. The bounded-waiting requirement is met.

To prove proporty 1, we note that each $P_i$ enters its critical section only if either `flag[j] == false` or `turn == i`. Also note that, if both processes can be executing in their critical sections at the same time, then `flag[o] == flag[1] == true`. These two observations imply that $P_0$ and $P_1$ could not have successfully executed their while statements at about the same time, since the value of `turn` can be either 0 or 1 but cannot be both. Hence, one of the processes —— say, $P_j$ —— must have successfully executed the while statement, whereas $P_i$ had to execute at least one additional statement ("`turn == j`"). However, at that time, `flag[j] == true` and `turn == j`, and this condition will persist as long as $P_j$ is in its critical section; as a result, mutual exclusion is preserved.

To prove properties 2 and 3, we note that a process $P_i$ can be prevented from entering the critical section only if its stuck in the while loop with the condition `flag[j] == true` and `turn == j`; this loop is the only one possible. If $P_j$ is not ready to enter the critical section, then `flag[j] == false`, and $P_i$ can enter its critical section. If $P_j$ has set `flag[j]` to true and is also executing in its while statement, then either `turn == i` or `turn == j`. If `turn == i`, then $P_i$ will enter the critical section. If `turn == j`, then $P_j$ will enter the critical section. However, once $P_j$ exists its critical section, it will reset `flag[j]` to `false`, allowing $P_i$ to enter its critical section. If $P_j$ resets `flag[j]` to `true`, it must also set `turn` to `i`. Thus, since $P_i$ does not change the value of the variable `turn` while executing the `while` statement, $P_i$ will enter the critical section (progress) after at most one entry by $P_j$ (bounded waiting).

Peterson's solution is not guaranteed to work on modern computer architectures for the primary reason that, to improve system performance, processors and/or compilers may reorder read and write operations that have no dependencies.

## Memory Barriers

Memory models vary by processor type, so kernel developers cannot make any assumptions regarding the visibility of modifications to memory on a shared-memory multiprocessor. To address this issue, computer architectures provide instructions that can `force` any changes in memory to be propagated to all other processors, thereby ensureing that memory modifications are visible to threads running on other processors. Such instructions are known as `memory barriers` or `memory fences`. When a memory barrier instruction is performed, the system ensures that all loads and stores are completed before any subsequent load or store operations are performed. Therefore, even if instructions were recordered, the memory barrier ensures that the store operations are completed in memory and visible to other processors before future load and store operations are performed.

```c
int turn;
boolean flag[2];

/* solution of critical-section problem */
while (true) {
  flag[i] = true;
  memory_barrier();
  turn = j;
  while (flag[j] && turn == j)
    ;
  
    /* critical section */
  
  flag[i] = false;

    /* remainder section */
}
```

## Hardware instructions

```c
boolean test_and_set(boolean *target) {
  boolean rv = *target;
  *target = true;
  return rv;
}

do {
  while (test_and_set(&lock))
    ; /* do nothing */

    /* critical section */

  lock = false;

    /* remainder section */
} while (true);
```

```c
int compare_and_swap(int *value, int expected, int new_value) {
  int temp = *value;

  if (*value == expected)
    *value = new_value;

  return temp;
}

while (true) {
  while (compare_and_swap(&lock, 0, 1) != 0)
    ; /* do nothing */

    /* critical section */

  lock = 0;

    /* remainder section */
}
```

```c
while (true) {
  waiting[i] = true;
  key = 1;
  while (waiting[i] && key == 1)
    key = compare_and_swap(&lock, 0, 1);
  waiting[i] = false;

    /* critical section */

  j = (i+1) % n;
  while ((j != i) && !waiting[j])
    j = (j+1) % n;
  
  if (j == i)
    lock = 0;
  else
    waiting[j] = false;

    /* remainder section */
}
```

## Atomic Variables

```c
void increment(atomic_int *v) {
  int temp;
  do {
    temp = *v;
  } while (temp != compare_and_swap(v, temp, temp+1));
}
```

## Mutex Lock

```c
acquire() {
  while (!compare_and_swap(&available, true, false))
    ; /* busy wait */
}

release() {
  available = true;
}
```

## Semaphores

```c
wait(S) {
  while (S <= 0)
    ; // busy wait
  S--;
}

signal(S) {
  S++;
}
```

```c
typedef struct {
  int value;
  struct process *list;
} semaphore;

wait(semaphore *S) {
  S->value--;
  if (S->value < 0) {
    add this process to S->list;
    sleep();
  }
}

signal(semaphore *S) {
  S->value++;
  if (S->value <= 0) {
    remove a process P from S->list;
    wakeup(P);
  }
}
```

## Monitor

```c
monitor monitor_name {
  /* shared variable declarations */

  function OP1 (...) {
    ...
  }

  function OP2 (...) {
    ...
  }

  ...

  function OPn (...) {
    ...
  }

  initializatin_code (...) {
    ...
  }
}

/* mutual exclusion */
wait(mutex);
  ...
  body of OP
  ...
if (next_count > 0)
  signal(next);
else
  signal(mutex);

/* condition wait */
x_count++;
if (next_count > 0)
  signal(next);
else
  signal(mutex);
wait(x_sem);
x_count--;

/* condition signal */
if (x_count > 0) {
  next_count++;
  signal(x_sem);
  wait(next);
  next_count--;
}
```

```c
monitor ResourceAllocator {
  boolean busy;
  condition x;

  void acquire(int time) {
    if (busy)
      x.wait(time);
    busy = true;
  }

  void release() {
    busy = false;
    x.signal();
  }

  initialization_code() {
    busy = false;
  }
}
```

Now suppose that,, when the x.signal() operation is invoked by a process P, there exist a suspended process Q associated with the condition x. Clearly, if the suspended process Q is allowed to resume its execution, the signaling process P must wait. Otherwise, both P and Q would be active simultaneously within the monitor. Note, however, that conceptually both processes can continue with their execution. Two possiblilities exist:

1. `Signal and wait.` P either waits until Q leaves the monitor or waits for another condition.
2. `Signal and continue.` Q either waits until P leaves the monitor or waits for another condition.

## Liveness

`Liveness` refers to a set of properties that a system must satisfy to ensure that process make progress during their execution life cycle. A process waiting indefinitely under the circumstances just described is an example of a "liveness failure".

## Deadlock

The implementation of a semaphore with a waiting queue may result in a situation where two or more progress are waiting indefinitely for an event that can be caused only by one of the waiting processes. The event in question in the execution of a `signal()` operation. When such a state is reached, these processes are said to be `deadlocked`.

## Priority Inversion

A scheduling challenge arises when a higher-priority process needs to read or modify kernel data that are currently being accessed by a lower-priority process —— or a chain of lower-priority processes. Since kernel data are typically protected with a lock, the higher-priority process will have to wait for a lower-priority one to finish with the resource. The situation becomes more complicated if the lower-priority process is preempted in favor of another process with a higher priority.

This liveness problem is known as `priority inversion`, and it can occor only in systems with more than two priorities. Typically, priority inversion is avoided by implementing a `priority-inheritance protocol`. According to this protocol, all processes that are accessing resources needed by a higher-priority process inherit the higher priority until they are finished with the resources in question. When they are finished, their priorities revert to their original values.

## Optimistic Approach vs. Pessimistic Strategy

CAS-based `lock-free` approaches are considered an optimistic approach —— you optimistically first update a variable and then use collision detection to see if another thread is updating the variable concurrently. If so, you repeatedly retry the operatoin until it is successfully updated without conflict. Mutual-exclusion locking, in contrast, is considered a pessimistic strategy; you assume another thread is concurrently updating the variable, so you pessimistically acquire the lock before making any updates.

The following guidelines identify general rules concerning performance differences between CAS-based synchronization and traditional synchronization (such as mutex locks and semaphores) under varying contention loads:

- `Uncontended.` Although both options are generally fast, CAS protection will be somewhat faster than traditional synchronization.
- `Moderate contention.` CAS protection will be faster —— possibly much faster —— than traditional synchronization.
- `High contention.` Under very highly contended loads, traditional synchronization will ultimately be faster than CAS-based synchronization.

## Ongoing Research of Concurrent Programming

- Designing compilers that generate more efficient code.
- Developing languages that provide support for concurrent programming.
- Improving the performance of existing libraries and APIs.

## Another COPY of Summary in the Book

- A race condition occurs when processes have concurrent access to shared data and the final result depends on the particular order in which concurrent accesses occur. Race conditions can result in corrupted values of shared data.
- A critical section is a section of code where shared data may be manipulated and a possible race condition may occur. The critical-section problem is to design a protocol whereby processes can synchronize their activity to cooperatively share data.
- A solution to the critical-section problem must satisfy the following three requirements: (1) mutual exclusion, (2) progress, and (3) bounded waiting. Mutual exclusion ensures that only one process at a time is active in its critical section. Progress ensures that programs will cooperatively determine what process will next enter its critical section. Bounded waiting limits how much time a program will wait before it can enter its critical section.
- Software solutions to the critical-section problem, such as Peterson's solution, do not work well on modern computer architectures.
- Hardware support for the critical-section problem includes memory barriers; hardware instructions, such as the compare-and-swap instruction; and atomic variables.
- A mutex lock provides mutual exclusion by requiring that a process acquire a lock before entering a critical section and release the lock on exiting the critical section.
- Semaphores, like mutex locks, can be used to provide mutual exclusion. However, whereas a mutex lock has a binary value that indicates if the lock is available or not, a semaphore has an integer value and can therefore be used to solve a variety of synchronization problems.
- A monitor is an abstract data type that provides a high-level form of process synchronization. A monitor uses condition variables that allow processes to wait for certain conditions to become true and to signal one another when conditions have been set to true.
- Solutions to the critical-section problem may suffer from liveness problems, including deadlock.
- The various tools that can be used to solve the critical-section problem as well as to synchronize the activity of processes can be evaluated under varying levels of contention. Some tools work better under certain contention loads than others.

## 笔记目录

0. [回到开头](scroll-to-the-very-top)
