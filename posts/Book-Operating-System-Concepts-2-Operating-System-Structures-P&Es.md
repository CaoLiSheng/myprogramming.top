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

## 2.2 What is the purpose of the command interpreter? Why is it usually separate from the kernel?

## 2.3 What system calls have to be executed by a command interpreter or shell in order to start a new process on a UNIX system?

## 2.4 What is the purpose of system programs?

## 2.5 What is the main advantage of the layered approach to system design? What are the disadvantages of the layered approach?

## 2.6 List five services provided by an operating system, and explain how each creates convenience for users. In which cases would it be impossible for user-level programs to provide the services? Explain your answer.

## 2.7 Why do some systems store the operating system in frimware, while others store it on disk?

## 2.8 How could a system be designed to allow a choice of operating systems from which to boot? What would the bootstrap program need to do?

## 2.9 The services and functions provided by an operating system can be divided into two main categories. Briefly describe the two categories, and discuss how they differ.

## 2.10 Describe three general methods for passing parameters to the operating system.

## 2.11 Describe how you could obtain a statistical profile of the amount of time a program spends executing different sections of its code. Discuss the importance of obtaining such a statistical profile.

## 2.12 What are the advantages and disadvantages of using the same system-call interface for manipulating both files and services?

## 2.13 Would it be possible for the user to develop a new command interpreter using the system-call interface provided by the operating system?

## 2.14 Describe why Android uses ahead-of-time (AOT) rather than just-in-time (JIT) compilation.

## 2.15 What are the two models of interprocess communication? What are the strengths and weaknesses of the two approaches?

## 2.16 Contrast and compare an application programming interface (API) and an application binary interface (ABI).

## 2.17 Why is the separation of mechanism and policy desirable?

## 2.18 It is sometimes difficult to achieve a layered approach if two components of the operating system are dependent on each other. Identify a scenario in which it is unclear how to layer two system components that require tight coupling of their functionalities.

## 2.19 What is the main advantage of the microkernel approach to system design? How do user programs and system services interact in a microkernel architecture? What are the disadvantage of using the microkernel approach?

## 2.20 What are the advantages of using loadable kernel modules?

## 2.21 How the iOS and Android similar? How are they different?

## 2.22 Explain why Java programs running on Android systems do not use the standard Java API and virtual machine.

## 2.23 The experimental Synthesis operating system has an assembler incorpoorated in the kernel. To optimize system-call performance, the kernel assembles routines within kernel space to minimize the path that the system call must take through the kernel. This approach is the antithesis of the layered approach, in which the path through the kernel is extended to make building the operating system easier. Discuss the pros and cons of the Synthesis approach to kernel design and system performance optimization.

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
