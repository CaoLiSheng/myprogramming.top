---
style: antique
title: 读书笔记之《Operating System Concepts》2
date: 2021-01-04
tags:
  - 读书
  - 笔记
  - 操作系统
  - 结构
---

> 操作系统结构

We can view an operating system from several vantage points. One view focuses on the services that the system provides; another, on the interface that it makes available to users and programmers; a third, on its components and their interconnetions.

## Operating-System Services

One set of operating system services provides functions that are helpful to the user.

- _**User interface**_. This interface can take several forms. **graphical user interface**, **touch-screen interface**, **command-line interface**.
- _**Program execution**_. THe system must be able to load a program into memory and to run that program. The program must be able to end its execution, either normally or abnormally (indicating error).
- _**I/O operations**_. For efficiency and protection, users usually cannot control I/O devices directly. Therefore, the operating system must provide a means to do I/O.
- _**File-system manipulation**_. Many operating systems provide a variety of file systems, sometimes to allow personal choice and sometimes to provide special features or performence characteristics.
- _**Communications**_. A communication may occur between processes that are executing on the same computer or between processes that are executing on different computer systems tied together by a network. Communications may be implemented via **shared memory**, in which two or more processes read and write to a shared section of memory, or **message passing**, in which packets of information in predefined formats are moved between processes by the operating system.
- _**Error detection**_. For each type of error, the operating system should take the appropriate action to ensure correct and consistent computing. Sometimes, it has no choice but to halt the system. At other times, it might terminate an error-causing process or return an error code to a process for the process to detect and possibly correct.

Another set of operating-system functions exists not for helping the user but rather for ensuring the efficient operation of the system itself. Systems with multiple processes can gain efficiency by sharing the computer resources among the different processes.

- _**Resource allocation**_. When there are multiple processes running at the same time, resources must be allocated to each of them.
- _**Logging**_. We want to keep track of which programs use how much and what kinds of computer resources. This record keeping may be used for accounting (so that users can be billed) or simply for accumulating usage statistics.
- _**Protection and security**_. If a system is to be protected and secure, precautions must be instituted throughout it. A chain is only as strong as its weakest link.

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
