---
style: antique
title: 读书习题之《Operating System Concepts》3
date: 2021-02-26
tags:
  - 读书
  - 习题
  - 编程题
  - 编程项目
  - 操作系统
  - 进程
---

> 习题 of 进程

## 3.1 Using the program shown below, explain what the output will be at the LINE A.

```c
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int value = 5;

int main()
{
  pid_t pid;

  pid = fork();

  if (pid == 0) { /* child process */
    value += 15;
    return 0;
  } else if (pid > 0) { /* parent process */
    wait(NULL);
    printf("Parent: value = %d", value); /* LINE A */
    return 0;
  }
}
```

`Parent: value = 5`

## 3.2 Including the initial parent process, how many processes are created by the program shown below?

```c
#include <stdio.h>
#include <unistd.h>

int main()
{
  /* fork a child process */
  fork();

  /* fork another child process */
  fork();

  /* and fork another */
  fork();

  return 0;
}
```

`8`

## 3.3 Original versions of Apple's mobile iOS operating system provided no means of concurrent processing. Discuss three major complications that concurrent processing adds to an operating system.

- 多进程需要复杂的进程调度算法
- 多进程引入 IPC 通信问题
- 手机设备硬件条件限制
  1. 除操作系统占用的内存空间外，剩余的内存空间最好能支持存放多道程序。
  2. 多进程在多核 CPU 的支持下才能发挥作用。
  3. 多进程会加快电池电量的消耗。

## 3.4 Some computer systems provide multiple register sets. Describe what happens when a context switch occurs if the new context is already loaded into one of the register sets. What happens if the new context is in memory rather than in a register set and all the register sets are in use?

当新的上下文已经加载到寄存器组时，只需更改 CPU 的当前执行寄存器组指针到这个新上下文所在的寄存器组即可；假如，所有寄存器组都被占用，需要使 CPU 上的当前寄存器组备份到内存，将内存的新上下文加载到 CPU 当前寄存器组，以此切换上下文。

## 3.5 When a process creates a new process using the `fork()` operation, which of the following states is shared between the parent process and the child process?

1. ***a.*** Stack
1. ***b.*** Heap
1. ***c.*** Shared memory segments

***C***

## 3.6 Consider the "exactly once" semantic with respect to the RPC mechanism. Does the algorithm for implementing this semantic execute correctly even if the ACK message sent back to the client is lost due to a network problem? Describe the sequence of messages, and discuss whether "exactly once" is still preserved.

RPC 在“仅执行一次”的语义机制下，既使 ACK 消息丢失，算法依然正确运行。因为，客户端收不到 ACK 消息，将会不断重发 RPC 请求，服务端有 “最多执行一次”语义机制作为保障，实际上该 RPC 请求**仅执行了一次**。

但是，如果客户端有请求超时机制，则另当别论。

## 3.7 Assume that a distributed system is susceptible to server failure. What mechanisms would be required to guarantee the "exactly once" semantic for execution of RPCs?

✰ 服务端可以将“仅执行一次”的请求写入数据库，以备宕机重启后，保持语义一致性。

---

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
