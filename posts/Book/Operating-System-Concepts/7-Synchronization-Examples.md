---
style: antique
title: 读书笔记之《Operating System Concepts》7
date: 2021-09-19
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

## Another COPY of Summary in the Book

- Classic problems of process synchronization include the bounded-buffer, readers-writers, and dining-philosophers problems. Solutions to these problems can be developed using the tools presented in Chapter 6, including mutex locks, semaphores, monitors, and condition variables.
- Windows uses dispatcher objects as well as events to implement process synchronization tools.
- Linux uses a variety of approaches to protect against race conditions, including atomic variables, spinlocks, and mutex locks.
- The POSIX API provides mutex locks, semaphores, and condition variables. POSIX provides two forms of semaphores: named and unnamed. Several unrelated processes can easily access the same named semaphores by simply referring to its name. Unnamed semaphores cannot be shared as easily, and require placing the semaphore in a region of shared memory.
- Java has rich library and API for synchronization. Available tools include monitors (which are provided at the language level) as well as reentrant locks, semaphores, and condition variables (which are supported by the API).
- Alternative approaches to solving the critical-section problem include transactional memory, OpenMP, and functional languages. Functional languages are particularly intriguing, as they offer a different programming paradigm from procedural languages. Unlike procedural languages, functional languages do not maintain state and therefore are generally immune from race conditions and critical sections.

## 笔记目录

0. [回到开头](scroll-to-the-very-top)
