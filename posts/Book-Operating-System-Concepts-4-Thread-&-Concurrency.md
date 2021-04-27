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
> OpenMP is a set of compiler directives as well as an API for programs written in C,C++,or FORTRAN that provides support for parallel programming in shared-memory environments. OpenMP is available on several open-source and commercial compilers for Linux, Windows, and macOS systems. OpenMP identifies **parallel regions** as blocks of code that may run in parallel. Application developers insert compiler directives into their code at parallel regions, and these directives instruct the OpenMP run-time library to execute the region in parallel.

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

> ## Grand Central Dispatch
> Grand Central Dispatch (GCD) is a technology developed by Apple for its macOS and iOS operating systems.
> It is a combination of a run-time library, an API, and language extensions that allow developers to identify sections of code (tasks) to run in parallel.
> Like OpenMP, GCD manages most of the details of threading.
> 
> GCD schedules tasks for run-time execution by placing them on a **dispatch queue**.
> When it removes a task from a queue, it assigns the task to an available thread from a pool of threads that it manages.
> GCD identifies two types of dispatch queues: ***serial*** and ***concurrent***.

- `serial` &ndash; Tasks placed on a serial queue are removed in FIFO order. Once a task has been removed from the queue, it must complete execution before another task is removed. Each process has its own serial queue (known as its **main queue**), and developers can create additional serial queues that are local to a particular process. (This is why serial queues are sole known as ***private dispatch queues***.) Serial queues are useful for ensuring the sequential execution of several tasks.
- `concurrent` &ndash; Tasks placed on a concurrent queue are also removed in FIFO order, but several tasks may be removed at a time, thus allowing multiple tasks to execute in parallel. There are several system-wide concurrent queues (also known as ***global dispatch queues***), which are divided into four primary quality-of-service classes:
  - `QOS_CLASS_USER_INTERACTIVE` &ndash; The **user-interactive** class represents tasks that interact with the user, such as the user interface and event handling, to ensure a responsive user interface. Completing a task belonging to this class should require only a small amount of work.
  - `QOS_CLASS_USER_INITIATED` &ndash; The **user-initiated** class is similar to the user-interactive class in that tasks are associated with a responsive user interface; however, user-initiated tasks may require longer processing times. Opening a file or a URL is a user-initiated task, for example. Tasks belonging to this class must be completed for the user to continue interacting with the system, but they do not need to be serviced as quickly as tasks in the user-interactive queue.
  - `QOS_CLASS_UTILITY` &ndash; The **utility** class represents tasks that reuire a longer time to complete but do not demand immediate results. This class includes work such as importing data.
  - `QOS_CLASS_BACKGROUND` &ndash; Tasks belonging to the **background** class are not visible to the user and are not time sensitive. Examples include indexing a mailbox system and preforming backups.

> Internally, GCD's thread pool is composed of POSIX threads.
> GCD actively manages the pool, allowing the number of threads to grow and shrink according to application demand and system capacity.
> GCD is implemented by the libdispatch library, which Apple has released under the Apache Commons license.
> It has since been ported to the FreeBSD operating system.

> ## Intel Thread Building Blocks
> Intel threading building blocks (TBB) is a template library that supports designing parallel applications in C++.
> As this is a library, it requires no special compiler or language support.
> Developers specify tasks that can run in parallel, and the TBB task scheduler maps these tasks onto underlying threads.
> Furthermore, the task scheduler provides load balancing and is cache aware, meaning that it will give precedence to tasks that likely have their data stored in cache memory and thus will execute more quickly.
> TBB provides a rich set of features, including templates for parallel loop structures, atomic operations, and mutual exlusion locking.
> In addition, it provides concurrent data structures, inlcuding a hash map, queue, and vetor, which can serve as equivalent thread-safe versions of the C++ standard template library data structures.
> Intel TBB has both commercial and open-source versions that run on Windows, Linux, and macOS.

```c++
#include <array>

using namespace std;

int main()
{
  array<double, 10> v {0.5,1.0,1.5,,2.0};
  parallel_for (size_t(0), v.size(), [=](size_t i) {apply(v[i]);} );
}
```

> The TBB library will divide the loop iterations into seperate "chunks" and create a number of tasks that operate on those chunks. (The parallel_for function allows developers to manually specify the size of the chunks if they wish to.)

## Threading Issues

### The `fork()` and `exec()` System Calls

The semantics of the `fork()` and `exec()` system calls change in a multithreaded program. If a thread invokes the `exec()` system call, the program specified in the parameter to `exec()` will replace the entire process &ndash; including all threads.

Some UNIX systems have chosen to have two versions of `fork()`, one that duplicates all threads and another that duplicates only the thread that invoked the `fork()` system call. Which of the two version of `fork()` to use depends on the application. If `exec()` is called immediately after forking, then duplicating all threads is unnecessary, as the program specified in the parameters to `exec()` will replace the process. In this instance, duplicating only the calling thread is appropriate. If, however, the separate process does not call `exec()` after forking, the separate process should duplicate all threads.

### Signal Handling

A **singal** is used in UNIX systems to notify a process that a particular event has occurred.
A signal may be received either synchronously or asynchronously, dependingon the source of and the reason for the event being signaled.
All signals, whether synchronous or asynchronous, follow the same pattern:

1. A signal is generated by the occurrence of a particular event.
2. The signal is delivered to a process.
3. Once delivered, the signal must be handled.

Examples of synchronous signals include illegal memory access and division by 0.
If a running program performs either of these actions, a signal is generated.
Synchronous signals are delivered to the same process that performed the operation that caused the signal (that is the reason they are considered synchronous).

When a signal is generated by an event external to a running process, that process receives the signal asynchronously.
Examples of such signals include terminating a process with specific keystrokes (such as <control><C>) and having a timer expire.
Typically, an asynchronous signal is sent to another process.

A signal may be handled by one of two possible handlers:

1. A default signal handler
2. A user-defined signal handler

Every signal has a **default signal handler** that the kernel runs when handling that signal.
This default action can be overridden by a **user-define signal handler** that is called to handle the signal.
Signals are handled in different ways.
Some signals may be ignored, while others (for example, an illegal memory access) are handled by terminating the program.

Where should a signal be delivered in multithreaded programs, where a process may have several threads?
In general, the following options exist:

1. Deliver the signal to the thread to which the signal applies.
2. Deliver the signal to every thread in the process.
3. Deliver the signal to certain threads in the process.
4. Assign a specific thread to receive all signals for the process.

The standard UNIX function for delivering a signal is

```c
kill(pid_t pid, int signal)
```

POSIX Pthreads provides the following function, which allows a signal to be delivered to a specified thread (tid):

```c
pthread_kill(pthread_t tid, int signal)
```

Although Windows does no explicitly provide support for signals, it allows us to emulate them using **asynchronous procedure calls** (**APCs**). However, whereas UNIX must contend with how to deal with signals in a multithreaded environment, the APC facility is more straightforward, since an APC is delivered to a particular thread rather than a process.

### Thread Cancellation

**Thread cancellation** involves terminating a thread before it has completed.
A thread that is to be canceled is often referred to as the **target thread**.
Cancellation of a target thread may occur in two different scenarios:

1. `Asynchronous cancellation.` &ndash; One thread immediately terminates the target thread.
2. `Deferred cancellation.` &ndash; The target thread periodically checks whether it should terminate, allowing it an opportunity to terminate itself in an orderly fashion.

Pthreads supports three cancellation modes.
Each mode is defined as a state and a type, as illustrated in the table below.

| Mode | State | Type |
|------|-------|------|
| Off | Disabled | &ndash; |
| Deferred | Enabled | Deferred |
| Asynchronous | Enabled | Asynchronous |

As the table illustrates, Pthreads allows threads to disable or enable cancellation.
Obviously, a thread cannot be canceled if cancellation is disabled.
However, cancellation requests remain pending, so the thread can later enable cancellation and respond to the request.

The default cancellation type is deferred cancellation.
However, cancellation occurs only when a thread reaches a **cancellation point**.
Most of the blocking system calls in the POSIX and standard C library are defined as cancellation points,
and these are listed when invoking the command `man pthreads` on a Linux system.
For example, the `read()` system call is a cancellation point that allows cancelling a thread that is blocked while awaiting input from `read()`.

One technique for establishing a cancellation point is to invoke the `pthread_testcancel()` function.
If a cancellation request is found to be pending, the call to `pthread_testcancel()` will not return,
and the thread will terminate; otherwise, the call to the function will return, and the thread will continue to run.
Additionally, Pthreads allows a function known as a **cleanup handler** to be invoked if a thread is canceled.
This function allows any resources a thread may have acquired to be released before the thread is terminated.

Because asynchronous cancellation may cause troubles, it is not recommended in Pthreads documentation.

On Linux systems, thread cancellation using the Pthreads API is handled through signals.
Thread cancellation in Java uses a policy similar to deferred cancellation in Pthreads.
To cancel a Java thread, you invoke the `interrupt()` method, which sets the interruption status of the target thread to true. A thread can check its interruption status by invoking the `isInterrupted()` method, which returns a boolean value of a thread's interruption status.

### Thread-Local Storage

Threads belonging to a process share the data of the process.
Indeed, this data sharing provides one of the benefits of multithreaded programming.
However, in some circumstances, each thread might need its own copy of certain data.
Such data is the socalled **thread-local storage** (or **TLS**).

It is easy to confuse TLS with local variables.
However, local variables are visible only during a single function invocation,
whereas TLS data are visible across function invocations.
Additionally, when the developer has no control over the thread creation process &ndash;
for example, when using an implicit technique such as a thread pool &ndash;
then an alternative approach is necessary.

In some ways, TLS is similar to static data;
the difference is that TLS data are unique to each thread.
(In fact, TLS is usually declared as static.)
Most thread libraries and compilers provide support for TLS.
For example, Java provides a `ThreadLocal<T>` class with `get()` and `set()` methods for `ThreadLocal<T>` objects.
Pthreads includes the type `pthread_key_t`, which provides a key that is specific to each thread.
This key can then be used to access TLS data.
Microsoft's C# language simply requires adding the storage attribute `[ThreadStatic]` to declare thread-local data.
The gcc compiler provides the storage class keyword `__thread` for declaring TLS data.
For example, if we wished to assign a unique identifier for each thread, we could declare it as follows:

```c++
static __thread int threadID;
```

### Scheduler Activations

A issue to be considered with multithreaded programs concerns communication between the kernel and the thread library,
which may be required by the many-to-many and two-level models.
Such coordination allows the number of kernel threads to be dynamically adjusted to help ensure the best performance.

Many systems implementing either the many-to-many or the two-level model place an intermediate data structure between the user and kernel threads.
This data structure is typically known as a **lightweight process**, or **LWP**.
To the user-thread library, the LWP appears to be a virtual processor on which the application can schedule a user thread to run.
Each LWP is attached to a kernel thread, and it is kernel threads that the operating system schedules to run on physical processors.
If a kernel thread blocks (such as while waiting for an I/O operation to complete), the LWP blocks as well.
Up the chain, the user-level thread attached to the LWP also blocks.

An application may require any number of LWPs to run efficiently.
Consider a **CPU-bound** application running on a single processor.
In this scenario, only one thread can run at a time, so one LWP is sufficient.
An application that is **I/O-intensive** may require multiple LWPs to execute, however.
Typically, an LWP is required for each concurrent blocking system call.
Suppose, for example, that five different file-read requests occur simultaneously.
Five LWPs are needed, because all could be waiting for I/O completion in the kernel.
If a process has only four LWPs, then the fifth request must wait for one of the LWPs to return from the kernel.

> One scheme for communication between the user-thread library and the kernel is known as ***scheduler activation***.
> It works as follows: The kernel provides an application with a set of virtual processors (LWPs),
> and the application can schedule user threads onto an available virtual processor.
> Furthermore, the kernel must inform an application about certain events.
> This procedure is known as an ***upcall***.
> Upcalls are handled by the **thread library** with an ***upcall handler***,
> and upcall handlers must run on a virtual processor.

One event that triggers an upcall occurs when an application thread is about to block.
In this scenario, the kernel makes an upcall to the application informing it that a thread is about to block and identifying the specific thread.
The kernel then allocates a new virtual processor to the application.
The application runs an upcall handler on this new virtual processor,
which saves the state of the blocking thread and relinquishes the virtual processor on which the blocking thread is running.
The upcall handler then schedules another thread that is eligible to run on the new virtual processor.
When the event that the blocking thread was waiting for occurs,
the kernel makes another upcall to the thread library informing it that the previously blocked thread is now eligible to run.
The upcall handler for this event also requires a virtual processor,
and the kernel may allocate a new virtual processor or preempt one of the user threads and run the upcall handler on its virtual processor.
After marking the unblocked thread as eligible to run,
the application schedules an eligible thread to run on an available virtual processor.

## Operating-System Examples

> It is going to explore how threads are implemented in Windows and Linux systems.

### Windows Threads

A Windows application runs as a separate process, and each process may contain one or more threads.
Additionally, Windows uses the one-to-one mapping, where each user-level thread maps to an associated kernel thread.

The general components of a thread include:

- A thread ID uniquely identifying the thread
- A register set representing the status of the processor
- A program counter
- A user stack, employed when the thread is running in user mode, and a kernel stack, employed when the thread is running is kernel mode
- A private storage are used by various run-time libraries and dynamic link libraries (DLLs)

The register set, stacks, and private storage area are known as the **context** of the thread.
The primary data structures of a thread include:

- ETHREAD &ndash; executive thread block
- KTHREAD &ndash; kernel thread block
- TEB &ndash; thread environment block

The key components of the ETHREAD include a pointer to the process to which the thread belongs and the address of the routine in which the thread starts control. The ETHREAD also contains a pointer to the corresponding KTHREAD.

The KTHREAD includes scheduling and synchronization information for the thread.
In addition, the KTHREAD includes the kernel stack (used when the thread is running in kernel mode) and a pointer to the TEB.

The ETHREAD and the KTHREAD exist entirely in kernel space; this means that only the kernel can access them.
The TEB is a user-space data structure that is accessed when the thread is running in user mode.
Among other fields, the TEB contains the thread identifier, a user-mode stack, and an array for thread-local storage.
The structure of a Windows thread is illustrated in the figure below.

![Data structures of a Windows thread](Operating-System-Concepts-4-Thread-&-Concurrency/Data-structures-of-a-Windows-thread.png "=900px-")

### Linux Threads

Linux provides the `fork()` system call with the traditional functionality of duplicating a process.
Linux also provides the ability to create threads using the `clone()` system call.
However, Linux does not distinguish between process and threads.
In fact, Linux uses the term ***task*** &ndash; rather than ***process*** or ***thread*** &ndash;
when referring to a flow of control within a program.

When `clone()` is invoked, it is passed a set of flags that terminate how much sharing is to take place between the parent and child tasks.
Some of these flags are listed in the table below. For example, suppose that `clone()` is passed the flags `CLONE_FS`, `CLONE_VM`, `CLONE_SIGHAND`, and `CLONE_FILES`.
The parent and child tasks will then share the same file-system information (such as the current working directory),
the same memory space, the same signal handlers, and the same set of open files.
Using `clone()` in this fashion is euqivalent to creating a thread as using `fork()` system call,
since the parent task shares most of its resources with its child task.
However, if none of these flags is set when `clone()` is invoked, no sharing takes place,
resulting in functionality similar to that provied by the `fork()` system call.

| flag | meaning |
|------|---------|
| CLONE_FS | File-system information is shared. |
| CLONE_VM | The same memory space is shared. |
| CLONE_SIGHAND | Signal handlers are shared. |
| CLONE_FILES | The set of open files is shared. |

The varying level of sharing is possible because of the way a task is represented in the Linux kernel.
A unique kernel data structure (specifically, `struct task_struct`) exists for each task in the system.
This data structure, instead of storing data for the task, contains pointers to other data structures where these data are stored &ndash; for example, data structures that represent the list of open files, signal-handling information, and virtual memory.
When `fork()` is invoked, a new task is created, along with a ***copy*** of all the associated data structures of the parent process.
A new task is also created when the `clone()` system call is made.
However, rather than copying all data structures, the new task ***points*** to the data structures of the parent task, depending on the set of flags passed to `clone()`.

Finally, the flexibility of the `clone()` system call can be extended to the concept of containers, a virtualization technique provided by the operating system that allows creating multiple Linux systems (containers) under a single Linux kernel that run in isolation to one another.
Just as certain flags passed to `clone()` can distinguish between creating a task that behaves more like a process or a thread based upon the amount of sharing between the parent and child tasks, there are other flags that can be passed to `clone()` that allow a Linux container to be created.

## Another COPY of Summary in the Book

- A thread represents a basic unit of CPU utilization, and threads belonging to the same process share many of the process resources, including code and data.
- There are four primary benefits to multithreaded applications: (1) responsiveness, (2) resource sharing, (3) economy, and (4) scalability.
- Concurrency exists when multiple threads are making progress, whereas parallelism exists when multiple threads are making progress simultaneously. On a system with a single CPU, only concurrency is possible; parallelism requires a multicore system that provides multiple CPUs.
- There are several challenges in designing multithreaded applications. They include dividing and balancing the work, dividing the data between the different threads, and identifying any data dependencies. Finanlly, multithreaded programs are especially challenging to test and debug.
- Data parallelism distributes subsets of the same data across different computing cores and performs the same operation on each core. Task parallelism distributes not data but tasks across multiple cores. Each task is running a unique operation.
- User applications create user-level threads, which must ultimately be mapped to kernel threads to execute on a CPU. The many-to-one model maps many user-level threads to one kernel thread. Other approaches include the one-to-one and many-to-many models.
- A thread library provides and API for creating and managing threads. Three common thread libraries include Windows, Pthreads, and Java threading. Windows is for the Windows system only, while Pthreads is available for POSIX-compatible systems such as UNIX, Linux, and macOS. Java threads will run on any system that supports a Java virtual machine.
- Implicit threading involves identifying tasks &ndash; not threads &ndash; and allowing language or API frameworks to create and manage threads. There are several approaches to implicit threading, including thread pools, fork-join frameworks, and Grand Central Dispatch. Implicit threading is becoming an increasingly common technique for programmers to use the ddeveloping concurrent and parallel applications.
- Threads may be terminated using either asynchronous or deferred cancellation. Asynchronous cancellation stops a thread immediately, even if it is in the middle of performing an update. Deferred cancellation informs a thread that it should terminate but allows the thread to terminate in an orderly fashion. In most circumstances, derferred cancellation is preferred to asynchronous termination.
- Unlike many other operating systems, Linux does not distinguish between processes and threads; instead, it refers to each as a task. The Linux `clone()` system call can be used to create tasks that behave either more like processes or more like threads.

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
