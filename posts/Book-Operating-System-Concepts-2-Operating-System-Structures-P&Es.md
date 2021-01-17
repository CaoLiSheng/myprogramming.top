---
style: antique
title: 读书习题之《Operating System Concepts》2
date: 2021-01-12 00:00:00.010Z
tags:
  - 读书
  - 习题
  - 编程题
  - 编程项目
  - 操作系统
  - 组织结构
---

> 习题 of 组织结构

## 2.1 What is the purpose of system calls?

对用户级程序提供操作系统的功能调用。

## 2.2 What is the purpose of the command interpreter? Why is it usually separate from the kernel?

提供一种解析文字输入并执行命令的人机交互接口。
命令解释执行的软件有很多，用户可以使用自己习惯的；因为其可变性，一般不会做到内核里。

## 2.3 What system calls have to be executed by a command interpreter or shell in order to start a new process on a UNIX system?

fork() & exec()

## 2.4 What is the purpose of system programs?

系统软件也是通过系统调用来使用操作系统提供的服务的。
与用户自己编写的或者安装的软件相比，系统软件大多解决一些所有用户的共性问题。

## 2.5 What is the main advantage of the layered approach to system design? What are the disadvantages of the layered approach?

- 优点
  - 松耦合
  - 在构建和调试中的简洁性
- 缺点
  - 每层的界限不易定夺
  - 这种系统中程序性能低下

## 2.6 List five services provided by an operating system, and explain how each creates convenience for users. In which cases would it be impossible for user-level programs to provide the services? Explain your answer.

1. 进程管理
2. I/O 操作
3. 文件管理
4. 通信管理
5. 错误检测

由于 CPU 及其它硬件资源系程序运行实际载体，如果不加以管理不同的程序就会提高造成错误的可能；所以，多任务环境下，这个管理程序就是操作系统。

## 2.7 Why do some systems store the operating system in frimware, while others store it on disk?

放在固件中的操作系统往往本身体积很小，固件的单位比特价格比硬盘高很多。另外，这类设备一般没有硬盘，最多只有闪存卡。

## 2.8 How could a system be designed to allow a choice of operating systems from which to boot? What would the bootstrap program need to do?

在 Boot Loader 中存放一个特殊的程序（Boot Manager）首地址，这个程序让用户选择要进入的系统，或者选择超时进入默认系统。

## 2.9 The services and functions provided by an operating system can be divided into two main categories. Briefly describe the two categories, and discuss how they differ.

- 保护进程运行，通过服务操作硬件
- 提供硬件本身不提供的功能，例如文件系统、虚拟内存空间

## 2.10 Describe three general methods for passing parameters to the operating system.

- 寄存器传参
- 开辟一块内存空间存放参数，将这块内存空间首地址及大小放入寄存器，传参
- 栈空间传参

## 2.11 Describe how you could obtain a statistical profile of the amount of time a program spends executing different sections of its code. Discuss the importance of obtaining such a statistical profile.

BCC (eBPF).

## 2.12 What are the advantages and disadvantages of using the same system-call interface for manipulating both files and services?

统一的接口风格，有利于简化应用程序的设计。

## 2.13 Would it be possible for the user to develop a new command interpreter using the system-call interface provided by the operating system?

Yes

## 2.14 Describe why Android uses ahead-of-time (AOT) rather than just-in-time (JIT) compilation.

为了提高应用运行时的速度，并减少使用的电量。

## 2.15 What are the two models of interprocess communication? What are the strengths and weaknesses of the two approaches?

- 共享内存
  - 优点
    - 比内核通信系统调用更方便
    - 可应用于大数据量
  - 缺点
    - 只能应用与同一台机器上的不同进程
    - 有安全隐患
    - 有冲突时需要同步
- 消息收发
  - 优点 
    - 适合少量数据收发
    - 不会产生冲突
    - 容易实现
  - 缺点
    - 数据量大时效率低

## 2.16 Contrast and compare an application programming interface (API) and an application binary interface (ABI).

API 是给开发人员看的，实际程序调用时使用的是 ABI。

## 2.17 Why is the separation of mechanism and policy desirable?

不同的用户可以应用不同的策略，新增一种或者一个用户，就可以新增若干策略。
而所有这些针对同一块业务的策略都可以用同一个机制去实现，策略起到调节作用。

## 2.18 It is sometimes difficult to achieve a layered approach if two components of the operating system are dependent on each other. Identify a scenario in which it is unclear how to layer two system components that require tight coupling of their functionalities.

虚拟内存管理和存储系统。

## 2.19 What is the main advantage of the microkernel approach to system design? How do user programs and system services interact in a microkernel architecture? What are the disadvantage of using the microkernel approach?

- 优点
  - 方便扩展操作系统功能
- 缺点
  - 当上层模块越来越多后，各个服务间通过内核的通信成为瓶颈

用户程序和系统服务是通过内核提供通信机制中转信息以交互。

## 2.20 What are the advantages of using loadable kernel modules?

模块的设计上具备分层系统那样的简洁性，性能上接近巨型内核。

## 2.21 How the iOS and Android similar? How are they different?

都是运行在移动端的基于已有内核的分层设计的操作系统。安卓应用运行在 JVM 虚拟机里，而 iOS 不是。

## 2.22 Explain why Java programs running on Android systems do not use the standard Java API and virtual machine.

因为运行在安卓上的虚拟机就不是一个标准虚拟机，而且安卓上要适配的硬件跟 PC 上的不完全相同（例如陀螺仪，加速器），导致必须有响应的 API。

## 2.23 The experimental Synthesis operating system has an assembler incorporated in the kernel. To optimize system-call performance, the kernel assembler routines within kernel space to minimize the path that the system call must take through the kernel. This approach is the antithesis of the layered approach, in which the path through the kernel is extended to make building the operating system easier. Discuss the pros and cons of the Synthesis approach to kernel design and system performance optimization.

- pros
  - 提升系统调用的性能
- cons
  - 不方便于构建和调试

> 编程题 of 组织结构

## 2.24 This problem works by first prompting the user for the name of the source and destination files. Write this program using either the POSIX or Windows API. Be sure to include all necessary error checking, including ensuring that the source file exists.

Once correctly designed and tested the program, if you used a system that supports it, run the program using a utility that traces system calls.

- Linux: strace ./FileCopy
- macOS: sudo dtruss ./FileCopy (可惜需要关闭SIP，有点不太保险，还是用Linux虚拟机吧)
- Windows: debugger

> 编程项目 of 组织结构

## This assignment will involve designing two kernel modules:

### 1. Design a kernel module that creates a `/proc` file named `/proc/jiffies` that reports the current value of `jiffies` when the `/proc/jiffies` file is read, such as with the command `cat /proc/jiffies`. Be sure to remove `/proc/jiffies` when the module is removed.

### 2. Design a kernel module that creates a `/proc` file named `/proc/seconds` that reports the number of elapsed seconds since the kernel module was loaded. This will involve using the value of `jiffies` as well as the HZ rate. When a user enters the command `cat /proc/seconds`. This kernel module will report the number of seconds that have elapsed since the kernel module was first loaded. Be sure to remove `/proc/seconds` when the module is removed.

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
