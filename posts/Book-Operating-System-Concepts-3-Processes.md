---
style: antique
title: 读书笔记之《Operating System Concepts》3
date: 2021-02-18
tags:
  - 读书
  - 笔记
  - 操作系统
  - 进程
---

> 进程

## Process Concept

The status of the current activity of a process is represented by the value of the `program counter` and the contents of the processor's regitsters.
The memory layout of a process is typically divided into multiple sections (from low address to high address):

- Text section--the executable code
- Data section--global variables
- Heap section--memory that is dynamically allocated during program run time
- Stack section--temporary data storage when invoking functions (activation record: such as function parameters, ruturn address, and local variables)

Although the stack and heap sections grow ***toward*** one another, the operating system must ensure they do not ***overlap*** one another.

## Program vs. Process

A program is a ***passive*** entity, such as a file containing a list of instructions stored on disk (often called an executable file).
In contrast, a process is an ***active*** entity, with a program counter specifying the next instruction to execute and a set of associated resources.
A program becomes a process when an executable file is loaded into memory.

## Process State

![diagram of process state](Operating-System-Concepts-3-Processes/diagram-of-process-state.png '=666px-')

## PCB (`process control block` / `task control block`)

- ***Process state***. The state may be new, ready, running, waiting, halted, and so on.
- ***Program counter***. The counter indicates the address of the next instruction to be executed for this process.
- ***CPU registers***. The registers vary in number and type, depending on the computer architecture. They include accumulators, index registers, stack pointers, and general-purpose registers, plus any condition-code information. Along with the program counter, this state information must be saved when an interrupt occurs, to allow the process to be continued correctly afterward when it is rescheduled to run.
- ***CPU-scheduling information***. This information includes a process priority, pointers to scheduling queues, and any other scheduling parameters.
- ***Memory-management information***. This information may include such items as the value of the base and limit registers and the page tables, or the segment tables, depending on the memory system used by the operating system.
- ***Accounting information***. This information includes the amount of CPU and real time used, time limits, account numbers, job or process numbers, and so on.
- ***I/O status information***. This information includes the list of I/O devices allocated to the process, a list of open files, and so on.

In brief, the PCB simply serves as the repository for all the data needed to start, or restart, a process, along with some accounting data.

> Within the Linux kernel, all active processes are represented using a doubly linked list of task_struct.
> The kernel maintains a pointer-current-to the process currently executing on the system.

## Process Scheduling Concepts

- ***degree of multiprogramming***. The number of processes currently in memory.
- ***I/O bound process***. One kind of process that spends more of its time doing I/O than it spends doing computations.
- ***CPU-bound process***. One kind of process that generates I/O requests infrequently, using more of its time doing computations.
- ***ready queue***. A queue of process which is ready and waiting to execute on a CPU's core.
- ***wait queue***. A queue of process which is waiting for a certain event to occur (such as completion of I/O).

## Queueing Diagram

![queueing-diagram representation of process scheduling](Operating-System-Concepts-3-Processes/queueing-diagram-representation-of-process-scheduling.png '=600px-')

## Swapping

Some operating systems have an intermediate form of scheduling, known as `swapping`, whose key idea is that sometimes it can be advantageous to remove a process from memory (and from active contention for the CPU) and thus reduce the degree of multiprogramming.
Later, the process can be reintroduced into memory, and its execution can be continued where it left off.
This scheme is known as ***swapping*** because a process can be "swapped out" from memory to disk, where its current status is saved, and later "swapped in" from disk back to memory, where its status is restored.
Swapping is typically only necessary when memory has been overcommitted and must be freed up.

## Process Creation

When a process creates a new process, two possibilities for execution exist:

1. The parent continues to execute concurrently with its children.
2. The parent waits until some or all of its children have terminatied.

There are also two address-space possibilities for the new process:

1. The child process is a duplicate of the parent process (it is the same program and data as the parent).
2. The child process has a new program loaded into it.

## Process Termination

A parent may terminate the execution of one of its children for a variety of reasons, such as these:

1. The child has exceeded its usage of some of the resources that it has been allocated. (To determine whether this has occurred, the parent must have a mechanism to inspect the state of its children.)
2. The task assigned to the child is no longer required.
3. The parent is exiting, and the operating system does not allow a child to continue if its parent terminates.

## Android Process Hierarchy

From most to least important, the hierarchy of process classifications is as follows:

+--------------------------+-------------------------------------------------------------------------------+
| ***Foreground process*** | The current process visible on the screen, representing the application the   |
|                          | user is currently interacting with                                            |
+--------------------------+-------------------------------------------------------------------------------+
| ***Visible process***    | A process that is not directly visible on the foreground but that is          |
|                          | performing an activity that the foreground process is referring to (that is,  |
|                          | a process performing an activity whose status is displayed on the foreground  |
|                          | process)                                                                      |
+--------------------------+-------------------------------------------------------------------------------+
| ***Service process***    | A process that is similar to a background process but is performing an        |
|                          | activity that is apparent to the user (such as streaming music)               |
+--------------------------+-------------------------------------------------------------------------------+
| ***Background process*** | A process that may be performing an activity but is not apparent to the user. |
+--------------------------+-------------------------------------------------------------------------------+
| ***Empty process***      | A process that holds no active components associated with any application.    |
+--------------------------+-------------------------------------------------------------------------------+

If system resources must be reclaimed, Android will first terminate empty processes, followed by background processes, and so forth.
Processes are assigned an importance ranking, and Android attempts to assign a process as high a ranking as possible.

Forthermore, Android development practices suggest following the guidelines of the process life cycle.
When these guidelines are followed, the state of a process will be saved prior to termination and resumed at its saved state
if the user navigates back to the application.

## Process Cooperation

There are several reasons for providing an environment that allow process cooperation:

- ***Information sharing.*** Since several applications may be interested in the same piece of information (for instance, coping and pasting), we must provide an environment to allow concurrent access to such information.
- ***Computation speedup.*** If we want a particular task to run faster, we must break it into subtasks, each of which will be executing in parallel with the others. Notice that such a speedup can be achieved only if the computer has multiple processing cores.
- ***Modularity.*** We may want to construct the system in a modular fashion, dividing the system functions into seperate processes or threads.

## Brief Contrast of Shared Memory and Message Passing

Both of the models are common in operating systems, and many systems implement both.
Message passing is useful for exchanging smaller amounts of data, because no conflicts need be avoided.
Message passing is also easier to implement in a distributed system than shared memory.
Shared memory can be faster than message passing, since message-passing systems are typically implementedd using system calls and thus require the more time-consuming task of kernel intervention.
In shared-memory systems, system calls are required only to establish shared-memory regions.
Once shared memory is established, all accesses are treated as routine memory accesses, and no assistance from the kernel is required.

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
