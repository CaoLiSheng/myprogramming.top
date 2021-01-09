---
style: antique
title: 读书笔记之《Operating System Concepts》2
date: 2021-01-10
tags:
  - 读书
  - 笔记
  - 操作系统
  - 组织结构
---

> 操作系统组织结构

We can view an operating system from several vantage points. One view focuses on the services that the system provides; another, on the interface that it makes available to users and programmers; a third, on its components and their interconnetions.

## Operating-System Services

One set of operating system services provides functions that are helpful to the user.

- _**User interface**_. This interface can take several forms. **graphical user interface**, **touch-screen interface**, **command-line interface**.
- _**Program execution**_. THe system must be able to load a program into memory and to run that program. The program must be able to end its execution, either normally or abnormally (indicating error).
- _**I/O operations**_. For efficiency and protection, users usually cannot control I/O devices directly. Therefore, the operating system must provide a means to do I/O.
- _**File-system manipulation**_. Many operating systems provide a variety of file systems, sometimes to allow personal choice and sometimes to provide special features or performance characteristics.
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

Most of the details of the operating-system interface are hidden from the programmer by the API and are managed by the RTE, run-time environment (the full suite of software needed to execute applications writen in a given programming language, including its compilers or interpreters as well as other software, such as libraries and loaders).

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

+------------------------------+----------------------------------+--------------+
|                              | Windows                          | Unix         |
+==============================+==================================+==============+
| Process <br> control         | `CreateProcess()`                | `fork()`     |
|                              | `ExitProcess()`                  | `exit()`     |
|                              | `WaitForSingleObject()`          | `wait()`     |
+------------------------------+----------------------------------+--------------+
| File <br> management         | `CreateFile()`                   | `open()`     |
|                              | `ReadFile()`                     | `read()`     |
|                              | `WriteFile()`                    | `write()`    |
|                              | `CloseHandle()`                  | `close()`    |
+------------------------------+----------------------------------+--------------+
| Device <br> management       | `SetConsoleMode()`               | `ioctl()`    |
|                              | `ReadConsole()`                  | `read()`     |
|                              | `WriteConsole()`                 | `write()`    |
+------------------------------+----------------------------------+--------------+
| Information <br> maintenance | `GetCurrentProcessID()`          | `getpid()`   |
|                              | `SetTimer()`                     | `alarm()`    |
|                              | `Sleep()`                        | `sleep()`    |
+------------------------------+----------------------------------+--------------+
| Communications               | `CreatePipe()`                   | `pipe()`     |
|                              | `CreateFileMapping()`            | `shm_open()` |
|                              | `MapViewOfFile()`                | `mmap()`     |
+------------------------------+----------------------------------+--------------+
| Protection                   | `SetFileSecurity()`              | `chmod()`    |
|                              | `InitializeSecurityDescriptor()` | `umask()`    |
|                              | `SetSecurityDescriptorGroup()`   | `chown()`    |
+------------------------------+----------------------------------+--------------+

## Single Step

Microprocessors provide a CPU mode known as **Single Step**, in which a trap is executed by the CPU after every instruction. The trap is usually caught by a debugger.

## Time Profile

Many operating systems provide a time profile of a program to indicate the amount of time that the program executes at a particular location or set of locations.
A time profile requires either a **tracing facility** or **regular timer interrupt**. 
At every occurrence of the **timer interrupt**, the value of the program counter is recorded.
With sufficiently **frequent timer interrupts**, a statistical picture of the time spent on various parts of the program can be obtained.

## Two Common Models of Interprocess Communication

### message-passing model

Messages can be exchanged beteween the processes either directly or indirectly through a common mailbox.
Before communication can take place, a connection must be opened.
The name of the other communication must be known, be it another process on the same system or another computer connected by a communications network.
The `get_hostid()` and `get_processid()` system calls do this translation.
The identifiers are then passed to the general-purpose `open()` and `close()` calls provided by the file system or to special `open_connection()` and `close_connection()` system calls, depending on the system's model of communication.
The recipient process usually must give its permission for communication to take place with an `accept_connection()` call.
Most processes that will be reveiving connections are special-purpose **daemons**, which are system programs provided for that purpose.
They execute a `wait_for_connection()` call and are awakened when a connection is made.
The source of the communication, known as the **client**, and the reveiving daemon, known as **server**, then exchange message by using `read_message()` and `write_message()` system calls.
The `close_connection()` call terminates the connection.

### shared-memory model

In this model, processes use `shared_memory_create()` and ` shared_memory_attach()` system calls to create and gain access to regions of memory owned by other processes.
Shared memory requires that two or more processes agree to remove the restriction which the operating system prevents one process from accessing another process's memory.
The form of exchanged data is determined by the processes andd is not under the operating system's control.
The processes are also responsible for ensuring that they are not writing to the same location simultaneously.
So problems exist, however, in the area of protection and synchronization between the processes sharing memory.

## System Services (system utilities)

- ***File management.*** These programs create, delete, copy, rename, print, list, and generally access and manipulate files and directories.
- ***Status information.***
  - Some programs simply ask the system for the date, time, amount of available memory or disk space, number of users, or similar status information.
  - Others are more complex, prorviding detailed performance, logging, and debugging information. Typically, these programs format and print the output to the terminal or other output devices or files or display it in a window of the GUI.
  - Some systems also support a *registry*, which is used to store and retrieve configuration information.
- ***File management.*** Several text editors my be available to create and modify the content of files stored on disk or other storage devices. There may also be specail commands to search contents of files or perform transformations of the text.
- ***Programming-language support.*** Compilers, assemblers, debuggers, and intercepters for common programming language (such as C, C++, Java, and Python) are often provided with the operating system or available as a seperate download.
- ***Program loading and execution.*** Once a program is assembled or compiled, it must be loaded into memory to be executed. The system may provide *absolute loaders*, *relocatable loaders*, *linkage editors*, and *overlay loaders*. Debugging systems for either higher-level language or machine language are needed as well.
- ***Communications.*** These programs provide the mechanism for creating virtual connections among processes, users, and computer systems. They allow users to send messages to one anothers's screens, to browse web pages, to send e-mail messages, to log in remotely, or to transfer files from one machine to another.
- ***Background services.*** All general-purpose systems have methods for launching certain system-program processes at boot time. Some of these processes terminate after completinng their tasks, while others continue to run until the system is halted. Constantly running system-program processes are known as *services*, *subsystems*, or *daemons*. One example is the network daemon, a system needed a service to listen for network connections in order to connect those requests to the correct processes.

## Linker and Loader

![the role of the linker and loader](Operating-System-Concepts-2-Operating-System-Structures/the-role-of-the-linker-and-loader.png '=500px-')

Object files and executable files typically have standard formats that include the compiled machine code and a symbol table containing metadata about functions and variables that are referenced in the program. For UNIX and Linux systems, this standard format is known as ELF (for Executable and Linkable Format). There are separate ELF formats for relocatable and executable files. One piece of information in the ELF file for executable files is the program's **entry point**, which contains the address of the first instruction to be executed when the program runs. Windows system use the *Portable Executable* (PE) format, and macOS uses the *Mach-O* format.

## Cross-Platform Software Development

An application can be made available to run on multiple operating systems in one of three ways:

1. The application can be writen in an interpreted language (such as Python or Ruby) that has an interpreter available for multiple operating systems. The interpreter read each line of the source program, executes equivalent instructions on the native instruction set, and calls native operating systems calls. Performance suffers relative to that for native applications, and the interpreter provides only a subset of each operating system's features, possibly limiting the feature sets of the associated applications.
2. The application can be writen in a language that includes a virtual machine containing the running application. The virtual machine is **part** of the language's full RTE. One example of this method is Java. Java has an RTE that includes a loader, byte-code verifier, and other components that load the Java application into the Java virtual machine. This RTE has been **ported**, or developed, for many operating system, from mainframes to smartphones, and in theory any Java app can run within the RTE wherever it is available. System of this kind have disadvantages similar to those of interpreters, discussed above.
3. The application developer can use a standard language or API in which the compiler generates binaries in a machine- and operating-system-specific language. The application must be ported to each operatng systemon which it will run. This porting can be quite time sonsuming and must be done for each new version of the application, with subsequent testing and debugging.

API and ABI (Application Binaries Interface, architecture level) are both causing the general lack of application mobility.

## Policies and Mechanisms

One important `software engineering` principle is the separation of `policy` from `mechanism`. Mechanisms determine *how* to do something; policies determine *what* will be done.
For example, the timer construct is a mechanism for ensuring CPU protection, but the diciding how long the timer is to be set for a particular user is a policy decision.

## Operating-System Structures

### Monolithic Structure (`tightly coupled`)

The simplest structure for organizing an operating system is no structure at all.
That is, place all of the functionality of the kernel into a single, static binary fille that runs in a single address space.
This approach--known as a monolithic structure--is a common technique for designing operating systems.

Two examples:

![traditional UNIX system structure](Operating-System-Concepts-2-Operating-System-Structures/traditional-UNIX-system-structure.png '=600px-')

![Linux system structure](Operating-System-Concepts-2-Operating-System-Structures/Linux-system-structure.png '=300px-')

Despite the apparent simplicity of monolithic kernels, they are difficult to implement and extend.
Monolithic kernels do have a distinct performance advantage, however:
there is very little overhead in the system-call interface, and communication within the kernel is fast.
Therefore, despite the drawbacks of monolithic kernels, their speed and efficiency explains why we still see evidence of this structure in the UNIX, Linux, and Windows operating systems.

### Layered Approach (`loosely coupled`)

![A layered operating system](Operating-System-Concepts-2-Operating-System-Structures/A-layered-operating-system.png '=400px-')

If an error is found during the debugging of a particular layer, the error must be on that layer, because the layers below it are already debugged.
Thus, the design and implementation of the system are simplified.

Layered system have been successfully used in computer network (such as TCP/IP) and web applications.
Nevertheless, relatively few operating systems use a pure layered approach (challenges of appropriately define the functionality of each layer, poor performance due to the overhead of requiring a user program to traverse through multiple layers to obtain an operating-system service).

### Microkernels

> History: As UNIX expanded, the kernel became large and difficult to manage.
> In the mid-1980s, researchers at Carnegie Mellon University developed an operating system called `Mach` that modularized the kernel using the **microkernel** approach.

This method structures the operating system by removing all nonessential components from the kernel and implementing them as user-level programs that reside in seperate address spaces.

![Architecture of a typical microkernel](Operating-System-Concepts-2-Operating-System-Structures/Architecture-of-a-typical-microkernel.png '=666px-')

- Advantages
  - easier to extend the operating system
  - easier to port from one hardware design to another
  - providing more security and reliablity
- Disadvantages
  - the performance of microkernels can suffer due to increased system-function overhead
  - the overhead involevd in copying messages and switching between processes has been the largest impediment to the growth of microkernel-based operating systems

> History: Perhaps the best-known illustration of a microkernel operating system is **Darwin**, the kernel component of the macOS and iOS operating systems.
> Darwin , in fact, consists of two kernels, one of which is the **Mach** microkernel.

> Consider the history of Windows NT: The first release had a layered microkernel organization.
> This version's performance was low compared with that of Windows 95.
> Windows NT 4.0 partially corrected the performance problem by moving layers from user space to kernel space and intergrating them more closely.
> By the time Windows XP was designed, Windows architecture had become more monolithic than microkernel.

### Modules

Perhaps the best current mothodology for operating-system design involves using `loadable kernel modules (LKMs)`.
Here, the kernel has a set of core components and can link in additional services via modules, either at boot time or during run time.

> History: This type of design is common in modern implementations of UNIX, such as Linux, macOS, and Solaris, as well as Windows.
> Linux uses LKMs primarily for supporting device drivers and file systems, when a USB device is plugged into a running machine.

### Hybrid Systems

#### macOS and iOS

![Architecture of Apple's macOS and iOS operating systems](Operating-System-Concepts-2-Operating-System-Structures/Architecture-of-Apples-macOS-and-iOS-operating-systems.png '=400px-')

- `User experience layer.` This layer defines the software interface that allows users to interact with the computing devices. macOS uses the ***Aqua*** user interface, which is designed for a mouse or trackpad, whereas iOS uses the ***Springboard*** user interface, which is designed for touch devices.
- `Application frameworks layer.` This layer includes the ***Cocoa*** and ***Cocoa Touch*** frameworks, which provide an API for the Objective-C and Swift programming languages. The primary defference between Cocoa and Cocoa Touch is that the former is used for developing macOS applications, and the latterby iOS to provide support for hardware features unique to mobile devices, such as touch screens.
- `Core frameworks.` This layer defines frameworks that support graphics and media including, Quicktime and OpenGL.
- `Kernel environment.` This environment, also known as `Darwin`, includes the Mach microkernel and the BSD UNIX kernel.

![The structure of Darwin](Operating-System-Concepts-2-Operating-System-Structures/The-structure-of-Darwin.png '=300px-')

Beneath the system-call interface, Mach provides fundamental operating-system services, including memory management, CPU scheduling,
and interprocess calls (IPC) facilities such as message passing and remote procedure calls (RPCs).
Much of the functionality provided by Mach is available through `kernel abstractions`, which include tasks (a Mach process), threads, memory objects, and ports (used for IPC).
As an example, an application may create a new process using the **BSD POISX `fork()`** system call. Mach will, in turn, use a task kernel abstraction to represent the process in the kernel.

In addition to Mach and BSD, the kernel environment provides an I/O kit for development of device drivers and dynamically loadable modules (which macOS refers to as `kernel extensions`, or `kexts`).

To address the performance problem caused by theh overhead of message passing between different services running in user space,
Darwin combines Mach, BSD, the I/O kit, and any kernel extensions into a single address space.
Message passing within Mach still does occur, but no copying is necessary, as the services have access to the same address space.

#### Android

![Architecture of Google's Android](Operating-System-Concepts-2-Operating-System-Structures/Architecture-of-Googles-Android.png '=365px-')

Software designers for Android devices develop applications in the Java language, but they do not generally use the standard Java API.
Google has designed a seperate Android API for Java development.
Java applications are compiled into a form that can execute on the Android RunTime (ART),
a virtual machine designed for Android and optimized for mobile devices with limited memory and CPU processing capabilities.
Java programs are first compiled to a Java bytecode .class file and then translated into an executable .dex file.
Whereas many Java virtual machines perform just-in-time (JIT) compilation to improve application efficiency,
ART performs `ahead-of-time` (`AOT`) compilation.
Here, .dex files are compiled into native machine code when they are installed on a device, from which they can execute on the ART.
AOT compilation allows more efficient application execution as well as reduced power consumption, features that are crucial for mobile systems.

Android developers can also write Java programs that use the Java native interface--or JNI--which allows developers to bypass the virtual machine and instead write Java programs that can access specific hardware features. Programs written using JNI are generally not portable from one hardware device to another.

Because Android can run on an almost unlimited number of hardware devices, Google has chosen to abstract the physical hardware through the hardware abstraction layer, or HAL.
By abstracting all hardware such as the camera, GPS ship, and other sensors, the HAL provides applications with a consistent view independent of specific hardware.
This feature, of course, allows developers to write programs that are portable across different hardware platforms.

The standard C library used by Linux system is the GNU C library (glibc).
Google instead developed the `Bionnic` standard C library for Android.
Not only does Bionic have a smaller memory footprint than **glibc**, but it also has been designed for the slower CPUs that characterize mobile devices.
(In addition, Bionic allows Google to bypass GPL licensing of **glibc**.)

At the bottom of Android's software stack is the Linux kernel.
Google has modified the Linux kernel used in Android in a variety of area to support the special needs of mobile systems, such as power management.
It has also made changes in memory management and allocation and has add a new form of IPC known as ***Binder***.

#### WSL

![Windows Subsystem of Linux](Operating-System-Concepts-2-Operating-System-Structures/Windows-Subsystem-of-Linux.png '=666px-')

> 相反的，之前看到 Linux 上也可以运行 Windows 程序了，而且不是通过 wine 模拟器。
> 为进一步丰富生态软件，优麒麟与 CodeWeavers 公司积极合作适配，正式推出 CrossOver 优麒麟版本，使优麒麟系统能够兼容运行 Windows 应用。
> 同时，将微信(crossover版) 和 QQ(crossover版) 上架麒麟软件商店，方便普通用户一键安装体验。
> [CrossOver正式版来了，微信、QQ上架麒麟软件商店！](https://www.ubuntukylin.com/news/1632-cn.html)

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
