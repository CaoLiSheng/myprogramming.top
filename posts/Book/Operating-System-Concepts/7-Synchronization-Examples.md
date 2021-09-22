---
style: antique
title: 读书笔记之《Operating System Concepts》7
date: 2021-09-22
tags:
  - 读书
  - 笔记
  - 操作系统
  - 同步示例
---

> 同步示例

## The Bounded-Buffer Problem

```c
int n;
semaphore mutex = 1;
semaphore empty = n;
semaphore full = 0;
/* The structure of the producer process */
while (true) {
  ...
  /* produce an item in next_produced */
  ...
  wait(empty);
  wait(mutex);
  ...
  /* add next_produced to the buffer */
  ...
  signal(mutex);
  signal(full);
}
/* The structure of the comsumer process */
while (true) {
  wait(full);
  wait(mutex);
  ...
  /* remove an item from buffer to next_consumed */
  ...
  signal(mutex);
  signal(empty);
  ...
  /* consume the item in next_consumed */
  ...
}
```

## The Readers-Writers Problem

The reader-writer problem has several variations, all involving priorities. The simplest one, referred to as the first reader-wirter problem, requires that no reader be kept waiting unless a writer has already obtained permission to use the shared object. In other words, no reader should wait for other readers to finish simply because a writer is waiting. The second readers-writers problem requires that, once a writer is ready, the writer perform its write as soon as possible. In other words, if a writer is waiting to access the object, no new readers may start reading.

```c
semaphore rw_mutex = 1;
semaphore mutex = 1;
int read_count = 0;
/* The structure of a writer process */
while (true) {
  wait(rw_mutex);
  ...
  /* writing is performed */
  ...
  signal(rw_mutex);
}
/* The structure of a reader process */
while (true) {
  wait(mutex);
  read_count++;
  if (read_count == 1)
    wait(rw_mutex);
  signal(mutex);
  ...
  /* reading is performed */
  ...
  wait(mutex);
  read_count--;
  if (read_count == 0)
    signal(rw_mutex);
  signal(mutex);
}
```

## The Dining-Philosophers Problem

Several possible remedies to the deadlock problem are the following:

- Allow at most four philosophers to be sitting simultaneously at the table.
- Allow a philosopher to pick up her chopsticks only if both chopsticks are available (to do this, she must pick them up in a critical section).
- Use an asymmetric solution —— that is, an odd-numbered philosopher picks up first her left chopstick and then her right chopstick, whereas an even-numbered philosopher picks up her right chopstick and then her left chopstick.

### Semaphore Solution

```c
/* deadlock, starvation */
semaphore chopstick[5];

while (true) {
  wait(chopstick[i]);
  wait(chopstick[(i+1)%5]);
  ...
  /* eat for a while */
  ...
  signal(chopstick[i]);
  signal(chopstick[(i+1)%5]);
  ...
  /* think for a while */
  ...
}
```

### Monitor Solution

```c
/* deadlock-free, starvation */
monitor DiningPhilosophers {
  enum {THINKING, HUNGRY, EATING} state[5];
  condition self[5];

  void pickup(int i) {
    state[i] = HUNGRY;
    test(i);
    if (state[i] != EATING)
      self[i].wait();
  }

  void putdown(int i) {
    state[i] = THINKING;
    test((i+4)%5);
    test((i+1)%5);
  }

  voit test(int i) {
    if ((state[(i+4)%5] != EATING) && (state[i] == HUNGRY) && (state[(i+1)%5] != EATING)) {
      state[i] = EATING;
      self[i].signal();
    }
  }

  initialization_code() {
    for (int i=0; i<5; i++)
      state[i] = THINKING;
  }
}

while (true) {
  DiningPhilosophers.pickup(i);
  ...
  /* eat for a while */
  ...
  DiningPhilosophers.putdown(i);
  ...
  /* think for a while */
  ...
}
```

## Synchronization in Windows

The Windows operating system is a multithreaded kernel that provides support for real-time applications and multiple processors. When the Windows kernel accesses a global resource on a single-processor system, it temporarily masks interrupts for all interrupt handlers that may also access the global resource. On a multiprocessor system, Windows protects access to global resources using spinlocks, although the kernel uses spinlocks only to protect short code segments. Futhermore, for reasons of efficiency, the kernel ensures that a thread will never be preempted while holding a spinlock.

For thread synchronization outside the kernel, Windows provides `dispatcher objects`. Using a dispatcher object, threads synchronize according to several different mechanisms, including mutex locks, semaphores, events, and timers. The system protects shared data by requiring a thread to gain ownership of a mutex to access the data and to release ownership when it is finished. Semaphores behave as described in [Chapter 6](post:Book<->Operating-System-Concepts<->6-Synchronization-Tools). Events are similar to condition variables; that is, they may nofity a waiting thread when a desired condition occurs. Finally, timers are used to nofity on (or more than one) thread that a specified amount of time has expired.

Dispatcher objects may be in either a signaled state or a nonsignaled state. An object in a `signaled state` is available, and a thread will not block when acquiring the object. An object in a `nonsignaled state` is not available, and a thread will block when attempting to acquire the object.

A relationship exists between the state of a dispatcher object and the state of a thread. When a thread blocks on a nonsignaled dispatcher object, its state changes from ready to waiting, and the thread is placed in a waiting queue for that object. When the state for the dispatcher object moves to signaled, the kernel checks whether any threads are waiting on the object. If so, the kernel moves one thread —— or possibly more —— from the waiting state to the ready state, where they can resume executing. The number of threads the kernel selects from the waiting queue depends on the type of dispatcher object for which each thread is waiting. The kernel will select only one thread from the waiting queue for a mutex, since a mutex object may be "owned" by only a single thread. For an event object, the kernel will select all threads that are waiting for the event.

A `critical-section object` is a user-mode mutex that can often be acquired and released without kernel intervention. On a multiprocessor system, a critical-section object first uses a spinlock while waiting for the other thread to release the object. If it spins too long, the acquiring thread will then allocate a kernel mutex and yield its CPU. Critical-section objects are particularly efficient because the kernel mutex is allocated only when there is contention for the object. In practice, there is very little contention, so the savings are significant.

## Synchronization in Linux

Prior to version 2.6, Linux was a nonpreemptive kernel, meaning that a process running in kernel mode could not be preempted —— even if a higher-priority process became available to run. Now, however, the Linux kernel is fully preemptive, so a task can be preempted when it is running in the kernel.

Linux provides several different mechanisms for synchronization in the kernel. As most computer architectures provide instructions for atomic versions of simple math operations, the simplest synchronization technique within the Linux kernel is an atomic integer, which is represented using the opaque data type `atomic_t`.

| Atomic Operation | Effect |
|:-----------------|:-------|
| atomic_set(&counter, 5);       | counter = 5            |
| atomic_add(10, &counter);      | counter = counter + 10 |
| atomic_sub(4, &counter);       | counter = counter - 4  |
| atomic_inc(&counter);          | counter = counter + 1  |
| value = atomic_read(&counter); | value = 12             |

Atomic integers are particularly efficient in situations where an integer variable —— such as a counter —— needs to be updated, since atomic operations to not require the overhead of locking mechanisms. However, their use is limited to these sorts of scenarios. In situations where there are several variables contributing to a possible race condition, more sophisticated locking tools must be used.

Mutex locks are available in Linux for protecting critical sections within the kernel. Here, a task must invoke the `mutex_lock()` function prior to entering a critical section and the `mutex_unlock()` function after exiting the critical section. If the mutex lock is unavailable, a task calling `mutex_lock()` is put into a sleep state and is awakened when the lock's owner invokes `mutex_unlock()`.

| Single Processor          | Multiple Processors |
|---------------------------|---------------------|
| Disable kernel preemption | Acquire spin lock   |
| Enable kernel preemption  | Release spin lock   |

In the Linux kernel, both spinlocks and mutex locks are `nonrecursive`, which means that if a thread has acquired one of these locks, it cannot acquire the same lock a second time without first releasing the lock. Otherwise, the second attempt at acquiring the lock will block.

Linux uses an interesting approach to disable and enable kernel preemption. It provide two simple system calls —— `preempt_disable()` and `preempt_enable()` —— for disabling and enabling kernel preemption. The kernel is not preemptiable, however, if a task running in the kernel is holding a lock. To enforce this rule, each task in the system has a `thread_info` structure containing a counter, `preempt_count`, to indicate the number of locks being held by the task. When a lock is acquired, `preempt_count` is incremented. It is decremented when a lock is released. If the value of `preempt_count` for the task currently running in the kernel is greater than 0, it is not safe to preempt the kernel, as this task currently holds a lock. If the count is 0, the kernel can safely be interrupted (assuming there are no outstanding calls to `preempt_disable()`).

Spinlocks —— along with enabling and disabling kernel preemption —— are used in the kernel only when a lock (or disabling kernel preemption) is held for a short duration. When a lock must be held for a longer period, semaphores or mutex locks are appropriate for use.

## POSIX Mutex Locks

```c
#include <pthread.h>
pthread_mutex_t mutex;
/* create and initializa the mutex lock */
pthread_mutex_init(&mutex, NULL);
/* acquire the mutex lock */
pthread_mutex_lock(&mutex);
/* critical section */
/* release the mutex lock */
pthread_mutex_unlock(&mutex);
```

## POSIX Semaphores

```c
#include <semaphore.h>
/* Create the named semaphore and initialize it to 1 */
sem_t *sem = sem_open("SEM", O_CREAT, 0666, 1);
/* Create the unnamed semaphore and initialize it to 1 */
sem_t sem;
sem_init(&sem, 0, 1);
/* acquire the semaphore */
sem_wait(sem);
/* critical section */
/* release the semaphore */
sem_post(sem);
```

## POSIX Condition Variables

```c
pthread_mutex_t mutex;
pthread_cond_t cond_var;

pthread_mutex_init(&mutex, NULL);
pthread_cond_init(&cond_var, NULL);

pthread_mutex_lock(&mutex);
while (a != b) {
  /* also release mutex lock */
  pthread_cond_wait(&cond_var, &mutex);
}
pthread_mutex_unlock(&mutex);

pthread_mutex_lock(&mutex);
a = b;
/* also acquire mutex lock, go to `pthread_cond_wait(&cond_var, &mutex);` line */
pthread_cond_signal(&cond_var);
pthread_mutex_unlock(&mutex);
```

## Java Monitors

```java
public class BoundedBuffer<E> {
  private static final int BUFFER_SIZE = 5;

  private int count, in, out;
  private E[] buffer;

  public BoundedBuffer() {
    count = 0;
    in = 0;
    out = 0;
    buffer = (E[]) new Object[BUFFER_SIZE];
  }

  public synchronized void insert(E item) {
    while (count == BUFFER_SIZE) {
      try {
        wait();
      } catch (InterruptedException ie) {}
    }

    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
    count ++;

    notify();
  }

  public synchronized E remove() {
    E item;

    while (count == 0) {
      try {
        wait();
      } catch (InterruptedException ie) {}
    }

    item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    count --;

    notify();

    return item;
  }
}
```

## Java Reentrant Locks

```java
Lock key = new ReentrantLock();
key.lock();
try {
  /* critical section */
} finilly {
  key.unlock();
}
```

## Java Semaphores

```java
Semaphore sem = new Semaphore(1);

try {
  sem.acqurie();
  /* critical section */
} catch (InterruptedException ie) {
} finally {
  sem.release();
}
```

## Java Condition Variables

```java
Lock lock = new ReentrantLock();
Condition[] condVars = new Condition[5];

for (int i = 0; i < 5; i++)
  condVars[i] = lock.newCondition();

public void doWork(int threadNumber) {
  lock.lock();

  try {
    /* If it's not my turn, then wait until I'm signaled. */
    if (threadNumber != turn)
      condVars[threadNumber].await();

    /* Do some work for awhile ... */

    /* Now signal to the next thread. */
    turn = (turn + 1) % 5;
    condVars[turn].signal();
  } catch (InterruptedException ie) {
  } finally {
    lock.unlock();
  }
}
```

## Transactional Memory

Quite often in computer science, ideas from one area of study can be used to solve problems in other areas. The concept of `transactional memory` originated in database theory, for example, yet it provides a strategy for process synchronization. A `memory transaction` is a sequence of memory read-write operations that are atomic. If all operations in a transaction are completed, the memory transaction is committed. Otherwise, the operations must be aborted and rolled back.

The advantage of using such a mechanism rather than locks is that the transactional memory system —— not the developer —— is responsible for guaranteeing atomicity. Additionally, because no locks are involved, deadlock is not possible. Furthermore, a transactional memory system can identify which statements in atomic blocks can be executed concurrently, such as concurrent read access to a shared variable.

Transactional memory can be implemented in either software or hardware. `Software transactional memory (STM)`, as the name suggests, implements transactional memory exclusively in software —— no special hardware is needed. STM works by inserting instrumentation code inside transaction blocks. The code is inserted by a compiler and manages each transaction by examining where statements may run concurrently and where specific low-level locking is required. `Hardware transactional memory (HTM)` uses hardware cache hierarchies and cache coherency protocols to manage and resolve conflicts involving shared data residing in separate processors' caches. HTM requires no special code instrumentation and thus has less overhead than STM. However, HTM does require that existing cache hierarchies and cache coherency protocols be modified to support transactional memory.

## OpenMP

```c
void update(int value) {
  #pragma omp critical {
    counter += value;
  }
}
```

## Functional Programming Language

The fundamental difference between imperative and functional languages is that functional languages do not maintain state. That is, once a variable has been defined and assigned a value, its value is immutable —— it cannot change. Because functional languages disallow mutable state, they need not be concerned with issues such as race conditions and deadlocks. Several functional languages are presently in use, and we briefly mention two of them here: Erlang and Scala.

## Another COPY of Summary in the Book

- Classic problems of process synchronization include the bounded-buffer, readers-writers, and dining-philosophers problems. Solutions to these problems can be developed using the tools presented in [Chapter 6](post:Book<->Operating-System-Concepts<->6-Synchronization-Tools), including mutex locks, semaphores, monitors, and condition variables.
- Windows uses dispatcher objects as well as events to implement process synchronization tools.
- Linux uses a variety of approaches to protect against race conditions, including atomic variables, spinlocks, and mutex locks.
- The POSIX API provides mutex locks, semaphores, and condition variables. POSIX provides two forms of semaphores: named and unnamed. Several unrelated processes can easily access the same named semaphores by simply referring to its name. Unnamed semaphores cannot be shared as easily, and require placing the semaphore in a region of shared memory.
- Java has rich library and API for synchronization. Available tools include monitors (which are provided at the language level) as well as reentrant locks, semaphores, and condition variables (which are supported by the API).
- Alternative approaches to solving the critical-section problem include transactional memory, OpenMP, and functional languages. Functional languages are particularly intriguing, as they offer a different programming paradigm from procedural languages. Unlike procedural languages, functional languages do not maintain state and therefore are generally immune from race conditions and critical sections.

## 笔记目录

0. [回到开头](scroll-to-the-very-top)
