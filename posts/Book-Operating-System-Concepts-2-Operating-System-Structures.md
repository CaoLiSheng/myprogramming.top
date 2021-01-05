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

## Application Programming Interface (API)

Why would an application programmer prefer programming according to an API rather than invoking actual system calls?

- One benefit concerns program portablity.
- Furthermore, actual system calls can often be more detailed and difficult to work with than the API available to an application programmer. Nevertheless, there often exists a strong correlation between a funtion in the API and its associated system call within the kernel.

Most of the details of the operating-system interface are hidden from the programmer by the API and are managed by the RTE, run-time enviroment (the full suite of software needed to execute applications writen in a given programming language, including its compilers or interpreters as well as other software, such as libraries and loaders).

The RTE provides a system-call interface that serves as the link to system calls made available by the operating system. The system-call interface intercepts function calls in the API and invokes the necessary system calls within the operating system. Typically, a number is associated with each system call, and the system-call interface maintains a table indexed according to these numbers. The system-call interface then invokes the intended system call in the operating-system kernel and returns the **_status_** of the system call.

Three general methods are used to pass parameters to the operating-system. The simplest approach is to pass the parameters in registers. In some cases, however, there may be more parameters than registers. In these cases, the parameters are generally stored in a block, or table, or stack, in memory, and the address of the block is passed as a parameter in a register. Linux uses a combination of these approaches. If there are five or fewer parameters, registers are used. If there are more than five parameters, the block method is used.

## System Calls

### Types of system calls

- Process control
  - create process, terminate process
  - load, execute
  - get process attributes, set process attributes
  - wait event, signal event
  - allocate and free memory
- File management
  - create file, delete file
  - open, close
  - read, write, reposition
  - get file attributes, set file attributes
- Device management
  - request device, release device
  - read, write, reposition
  - get device attributes, set device attributes
  - logically attach or detach devices
- Information maintenance
  - get time or date, set time or date
  - get system data, set system data
  - get process, file, or device attributes
  - set process, file, or device attributes
- Communications
  - create, delete communication connection
  - send, receive messages
  - transfer status information
  - attach or detach remote devices
- Protection
  - get file permissions
  - set file permissions

### Examples of Windows and UNIX system calls

The following illustrates various equivalent system calls for Windows and UNIX operating systems.

| \_                           | Windows                                                                             | Unix                                  |
| :--------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------ |
| Process <br> control         | `CreateProcess()` `ExitProcess()` `WaitForSingleObject()`                           | `fork()` `exit()` `wait()`            |
| File <br> management         | `CreateFile()` `ReadFile()` `WriteFile()` `CloseHandle()`                           | `open()` `read()` `write()` `close()` |
| Device <br> management       | `SetConsoleMode()` `ReadConsole()` `WriteConsole()`                                 | `ioctl()` `read()` `write()`          |
| Information <br> maintenance | `GetCurrentProcessID()` `SetTimer()` `Sleep()`                                      | `getpid()` `alarm()` `sleep()`        |
| Communications               | `CreatePipe()` `CreateFileMapping()` `MapViewOfFile()`                              | `pipe()` `shm_open()` `mmap()`        |
| Protection                   | `SetFileSecurity()` `InitializeSecurityDescriptor()` `SetSecurityDescriptorGroup()` | `chmod()` `umask()` `chown()`         |

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
