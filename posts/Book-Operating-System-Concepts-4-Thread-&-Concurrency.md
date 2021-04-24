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

## Asynchronous Threading vs. Synchronous Threading

- `asynchronous threading` &ndash; With asynchronous threading, once the parent creates a child thread, the parent resumes its execution, so that the parent and child execute concurrently and independently of one another. Because the threads are independent, there is typically little data sharing between them. Asynchronous threading is the strategy used in `the multithreaded server` and is also commonly used for `designing responsive user interfaces`.
- `synchronous threading` &ndash; Synchronous threading occurs when the parent thread creates one or more children and then must wait for all of its children to terminate before it resumes. Here, the threads created by the parent perform work concurrently, but the parent cannot continue until this work has been completed. Once each thread has finished its work, it terminates and joins with its parent. Only after all of the children have joined can the parent resume execution. Typically, synchronous threading involves `significant data sharing among threads`. For example, the parent thread may combine the results calculated by its various children.

## Thread Libraries

> ## POSIX Pthreads
> `Pthreads` refers to the `POSIX standard` (IEEE 1003.1c) defining an API for thread creation and synchronization.
> This is a ***specification*** for the thread behavior, **not** an ***implementation***.
> Operating-system designers may implement the specification in any way they wish.
> Numerous systems implement the Pthreads specification; most are UNIX-type systems, including Linux and macOS.
> Although Windows doesn't support Pthreads natively, some thrid-party implementations for Windows are available.
> This library may be provided as either a user-level or kernel-level library.

```c
#include <pthread.h>
#include <stdio.h>

#include <stdlib.h>

int sum; /* this data is shared by the thread(s) */
void *runner(void *param); /* threads call this function */

int main(int argc, char *argv[])
{
  pthread_t tid; /* the thread identifier */
  pthread_attr_t attr; /* set of thread attributes */

  /* set the default attributes of the thread */
  pthread_attr_init(&attr);
  /* create the thread */
  pthread_create(&tid, &attr, runner, argv[1]);
  /* wait for the thread to exit */
  pthread_join(tid, NULL);

  printf("sum = %d\n", sum);
}

/* The thread will execute in this function */
void *runner(void *param)
{
  int i, upper = atoi(param);
  sum = 0;

  for (i = 1; i <= upper; i++)
  {
    sum += i;
  }

  pthread_exit(0);
}
```

> This example program creates only a single thread. The example program below joins on ten threads using the Pthread code.

```c
#define NUM_THREADS 10

/* an array of threads to be joined upon */
pthread_t workers[NUM_THREADS];

for (int i = 0; i < NUM_THREADS; i++)
{
  pthread_join(workers[i], NULL);
}
```

> ## Windows Threads
> The technique for creating threads using the Windows thread library is similar to the Pthreads technique in several ways.
> This library is a kernel-level library on Windows systems.

```c
#include <windows.h>
#include <stdio.h>

DWORD Sum; /* data is shared by the thread(s) */

/* The thread will execute in this function */
DWORD WINAPI Summation(LPVOID Param)
{
  DWORD Upper = *(DWORD*)Param;
  for (DWORD i = 1; i <= Upper; i++)
  {
    Sum += i;
  }
  return 0;
}

int main(int argc, char *argv[])
{
  DWORD ThreadId;
  HANDLE ThreadHandle;
  int Param;

  Param = atoi(argv[1]);
  /* create the thread */
  ThreadHandle = CreateHandle(
    NULL, /* default security attributes */
    0, /* default stack size */
    Summation, /* thread function */
    &Param, /* parameter to thread function */
    0, /* default creation flags */
    &ThreadId); /* returns the thread identifier */

  /* now wait for the thread to finish */
  WaitForSingleObject(ThreadHandle, INFINITE);

  /* close the thread handle */
  CloseHandle(ThreadHandle);

  printf("sum = %d\n", Sum);
}
```

> The Pthread program has the parent thread wait for the summation thread using the `pthread_join()` statement.
> The equivalent of this in the Windows API is the `WaitForSingleObject()` function,
> which causes the creating thread to block until the summation thread has exited.
> In situations that requires waiting for multiple threads to complete,
> the `WaitForMultipleObjects()` funtion is used.

```c
WaitForMultipleOjbects(
  N, /* the number of objects to wait for */
  THandles, /* a pointer to the array of objects */
  TRUE, /* a flag indicating whether all objects have been signaled */
  INFINITE); /* a timeout duration (or INFINITE) */
```

> ## Java Threads
> All Java programs comprise at least a single thread of control &ndash; 
> even a simple Java program consisting of only a `main()` method runs as a single thread in the JVM.
> Java threads are available on any system that provides a JVM including Windows, Linux, and macOS.
> The Java thread API is available for Android applications as well.
>
> There are two techniques for explicitly creating threads in a Java program.
> One approach is to create a new class that is derived from the Thread class and to override its `run()` method.
> An alternative &ndash; and more commonly used &ndash; technique is to define a class that implements the `Runnable` interface.
> This interface defines a single abstract method with the signature `public void run()`.
> The code in the `run()` method of a class that implements `Runnable` is what executes in a separate thread.
> An example is shown below:

```java
class Task implements Runnable {
  public void run() {
    System.out.println("I'm a thread.");
  }
}

/* thread creation somewhere */
Thread worker = new Thread(new Task());

/* Lambda expressions in Java */
Runnable task = () -> {
    System.out.println("I'm a thread.");
};
Thread worker = new Thread(task);

/* allocates memory and initializes a new thread in the JVM */
/* implicitly calls the run() method, making the thread eligible to be run by the JVM */
worker.start();

/* wait for the thread to finish */
try {
  worker.join();
} catch (InterruptedException e) { }
```

> ### Java Executor Framework
> Java has supported thread creation using the approach above far since its origins.
> However, beginning with Version 1.5 and its API,
> Java introduced several new concurrency features that provide developers with much greater control over thread creation and communication.
> These tools are available in the `java.util.concurrent` package.

```java
public interface Executor {
  void execute(Runnable command);
}

Executor service = new Executor...;
service.execute(new Task());
```

```java
import java.util.concurrent.*;

class Summation implements Callable<Integer> {
  private int upper;

  public Summation(int upper) {
    this.upper = upper;
  }

  /* The thread will execute in this method */
  public Integer call() {
    int sum = 0;
    for (int i = 1; i <= upper; i++) {
      sum += i;
    }
    return new Integer(sum);
  }
}

public class Driver {
  public static void main(String[] args) {
    int upper = Integer.parseInt(args[0]);

    ExecutorService pool = Executors.newSingleThreadExecutor();
    Future<Integer> result = pool.submit(new Summation(upper));

    try {
      System.out.println("sum = " + result.get());
    } catch (InterruptedException | ExecutionException e) { }
  }
}
```

## Implicit Threading

With the continued growth of multicore processing, applications containing hundreds &ndash; or even thousands &ndash; of threads are looming on the horizon. Designing such applications is not a trivial undertaking: programmers must address additional challenges which relate to program correctness &ndash; `Synchronization` and `Deadlocks`.

One way to address these challenges and better support the design of concurrent and parallel applications is to transfer the creation and management of threading from application developers to `compilers` and `run-time libraries`. This strategy, termed **implicit threading**, is an increasingly popular trend. Implicit threading generally require application developers to identify ***tasks*** &ndash; not threads &ndash; that can run in parallel. A task is usually writen as a function, which the run-time libraries then maps to a seperate thread, typically using the **many-to-many model**. The advantage of this approach is that developers only need to identify parallel tasks, and the libraries determine the specific details of thread creation and management.

> ## Thread Pools
> Thread pools offer these benefits:
> 1. Servicing a request with an existing thread is often faster than waiting to create a thread.
> 2. A thread pool limits the number of threads that exist at any one point. This is particularly important on systems that cannot support a large number of concurrent threads.
> 3. Separating the task to be performed from the mechanics of creating the task allows us to use different strategies for running the task. For example, the task could be scheduled to execute after a time delay or to execute periodically.
>
> The number of threads in the pool can be set heuristically based on factors such as the number of CPUs in the system, the amount of physical memory, and the expected number of concurrent client requests. More sophisticated thread-pool architectures can dynamically adjust the number of threads in the pool according to usage patterns. For instance, Apple's Grand Central Dispatch is one such architecture.

```c
DWORD WINAPI PoolFunction(PVOID Param)
{
  /* this function runs as a seperate thread. */
}

QueueUserWorkItem(
  &PoolFunction, /* a pointer to the function that is to run as a seperate thread */
  NULL, /* the parameter passed to Function */
  0); /* flags indicating how the thread pool is to create and manage execution of the thread */

/**
 * Other members in the Windows thread pool API include utilities that invoke functions
 * at periodic intervals or when an asynchronous I/O request completes.
 */
```

> ### Java Thread Pools
> The `java.util.concurrent` package includes an API for several varieties of thread-pool architectures.
> 1. **Single thread executor** &ndash; `Executors.newSingleThreadExecutor()` &ndash; creates a pool of size 1.
> 2. **Fixed thread executor** &ndash; `Executors.newFixedThreadPool(int size)` &ndash; creates a thread pool with a specified number of threads.
> 3. **Cached thread executor** &ndash; `Executors.newCachedThreadPool()` &ndash; creates an unbounded thread pool, reusing threads in many instances.

```java
import java.util.concurrent.*;

public class ThreadPoolExample {
  public static void main(String[] args) {
    int numTasks = Integer.parseInt(args[0].trim());

    /* Create the thread pool */
    ExecutorService pool = Executors.newCachedThreadPool();

    /* Run each task using a thread in the pool */
    for (int i = 0; i < numTasks; i++) {
      pool.execute(new Task());
    }

    /* Shutdown the pool once all threads have completed */
    /* The pool rejects additional tasks once the shutdown() method is invoked */
    pool.shutdown();
  }
}
```

> ## Fork Join
> The fork-join synchronous model is often characterized as explict thread creation, but it is also and excellent candidate for implicit threading.
> In the latter situation, threads are not constructed directly during the fork stage; rather, parallel tasks are designated.
> A library manages the number of threads that are created and is also responsible for assigning tasks to threads.
>
> ### Fork Join in Java
> Java introduced a fork-join library in Version 1.7 of the API that is designed to be used with recursive divide-and-conquer algorithms such as QuickSort and Mergesort. The general recursive algorithm behind Java's fork-join model is shown below:

```python
Task(problem)
  if problem is small enough
    solve the problem directly
  else
    subtask1 = fork(new Task(subset of problem))
    subtask2 = fork(new Task(subset of problem))

    result1 = join(subtask1)
    result2 = join(subtask2)

    return combined results
```

> In Version 1.7 of the API Java introduced a new thread pool &ndash; the `ForkJoinPool` &ndash; that can be assigned tasks that inherit the abstract base class `ForkJoinTask`. The Java fork-join strategy is orgenized around the abstract base class `ForkJoinTask`, and the `RecursiveTask` and `RecursiveAction` class extend this class. The fundamental difference between these two classes is that `RecursiveTask` returns a result, and `RecursiveAction` does not return a result.
> 
> What is interesting in Java's fork-join model is the management of tasks wherein the library constructs a pool of worker threads and balances the load of tasks among the available workers. In some situations, there are thousands of tasks, yet only a handful of threads performing the work (for example, a separate thread for each CPU). Additionally, each thread in a `ForkJoinPool` maintains a queue of tasks that it has forked, and if a thread's queue is empty, it can steal a task from another thread's queue using a *work stealing* algorithm, thus balancing the workload of tasks among all threads.

```java
import java.util.concurrent.*;

class SumTask extends RecursiveTask<Integer> {
  static final int THRESHOLD = 1000;

  private int begin;
  private int end;
  private int[] array;

  public SumTask(int begin, int end, int[] array) {
    this.begin = begin;
    this.end = end;
    this.array = array;
  }

  protected Integer compute() {
    if (end - begin < THRESHOLD) {
      int sum = 0;
      for (int i = begin; i <= end; i++) {
        sum += array[i];
      }
      
      return sum;
    } else {
      int mid = (begin + end) / 2;

      SumTask leftTask = new SumTask(begin, mid, array);
      SumTask rightTask = new SumTask(mid + 1, end, array);

      leftTask.fork();
      rightTask.fork();

      return rightTask.join() + leftTask.join();
    }
  }
}

public class App {
  static final int SIZE = 9999999;

  public static void main(String[] args) {
    ForkJoinPool pool = new ForkJoinPool();
    // array contains the integers to be summed
    int[] array = new int[SIZE];
    // ……

    SumTask task = new SumTask(0, SIZE - 1, array);
    int sum = pool.invoke(task);
    // ……
  }
}
```

> ## OpenMP
> OpenMP is a set of compiler directives as well as an API for programs written in C,C++,or FORTRAN that provides support for parallel programming in shared-memory environments. OpenMP is available on several open-source and commercial compilers for Linux, Windows, and macOS systems. OpenMP identifies **parallel regions** as blocks of code that may run in parallel. Application developers insert compiler directives into their code at parallel regions, and these directives instruct the OpenMP runtime library to execute the region in parallel.

```c
#include <omp.h>
#include <stdio.h>

int main(int argc, char *argv[])
{
  /* sequential code */

  #pragma omp parallel
  {
    printf("I am a parallel region.");
  }

  /* sequential code */

  return 0;
}
```

> OpenMP creates as many threads as there are processing cores in the system.
> Thus, for a dual-core system, two threads are created;
> for a quad-core system, four are created; and so forth.
> All the threads then simultaneously execute the parallel region.
> As each thread exits the parallel region, it is terminated.

```c
#pragma omp parallel for
for (i = 0; i < N; i++)
{
  c[i] = a[i] + b[i];
}
```

> OpenMP divides the work contained in the for loop among the threads it has created.
> It also allow developers to set the number of threads manually and to identify whether data are shared between threads or are private to a thread.

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
