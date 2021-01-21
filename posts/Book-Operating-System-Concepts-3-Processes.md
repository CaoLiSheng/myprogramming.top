---
style: antique
title: 读书笔记之《Operating System Concepts》3
date: 2021-01-19
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
- ***ready queue***. A queue of process which is ready and wwaiting to execute on a CPU's core.
- ***wait queue***. A queue of process which is waiting for a certain event to occur (such as completion of I/O).

## Queueing Diagram

![queueing-diagram representation of process scheduling](Operating-System-Concepts-3-Processes/queueing-diagram-representation-of-process-scheduling.png '=600px-')

## Swapping

Some operating systems have an intermediate form of scheduling, known as `swapping`, whose key idea is that sometimes it can be advantageous to remove a process from memory (and from active contention for the CPU) and thus reduce the degree of multiprogramming.
Later, the process can be reintroduced into memory, and its execution can be continued where it left off.
This scheme is known as ***swapping*** because a process can be "swapped out" from memory to disk, where its current status is saved, and later "swapped in" from disk back to memory, where its status is restored.
Swapping is typically only necessary when memory has been overcommitted and must be freed up.

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
