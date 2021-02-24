---
style: antique
title: 读书笔记之《Operating System Concepts》3
date: 2021-02-24
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
2. The parent waits until some or all of its children have terminated.

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

## IPC in Message-Passing

Here are several methods for logically implementing a link and the `send()/receive()` operations:

- Direct or indirect communication
- Synchronous or asynchronous communication
- Automatic or explicit buffering

## Mach Message Passing

When a task is created, two special ports--the **Task Self** port and the **Notify** port--are also created.
The kernel has receive rights to the Task Self port, which allows a task to send messages to the kernel.
The kernel can send notification of event occurrences to a task's Nofity port (to which, of course, the task has receive rights).

Each task also has access to a `bootstrap port`, which allows a task to register a port it has created with a system-wide `bootstrap server`.
Once a port has been registered with the bootstrap server, other tasks can look up the port in this registry and obtain rights for sending messagees to the port.

Mach messages contain the following two fields:

- A fixed-size message header containing metadata about the message, including the size of the message as well as source and destination ports. Commonly, the sending thread expects a reply, so the port name of the source is passed on to the receiving task, which can use it as a "return address" in sending a reply.
- A variable-sized body containing data.

The major problem with message systems has generally been poor performance caused by copying of the messages from the sender's port to the receiver's port.
The Mach message system attampts to avoid copy operations by using virtual-memory-management techniques.
Essentially, Mach maps the address space containing the sender's message into the receiver's address space.
Therefore, the message itself is never actually copied,, as both the sender and receiver access the same memory.
This message-management technique provides a large performance boost but works only for intrasystem messages.

## ALPC Facility in Windows

The message-passing facility in Windows is called the `advanced local procedure call (ALPC)` facility.
It is similar to the standard remote procedure call (RPC) mechanism that is widely used, but it is optimized for and specific to Windows.
Like Mach, Windows use a port object to establish and maintain a connection between two processes.
Windows uses two types of ports: `connection ports` and `communication ports`.

When an ALPC channel is created, one of three message-passing techniques is chosen:

1. For small messages (up to 256 bytes), the port's message queue is used as intermediate storage, and the messages are copied from one process to the other.
2. Larger messages must be passed through a `section object`, which is a region of shared memory associated with the channel.
3. When the amount of data is too large to fit into a section object, an API is available that allows server processes to read and write directly into the address space of a client.

It's important to note that the ALPC facility in Windows is not part of the Windows API and hence is not visible to the application programmer.
Rather, applications using the Windows API invoke standard remote procedure calls.
When the RPC is being invoked on a process on the same system, the RPC is handled indirectly through an ALPC procedure call.
Additionally, many kernel services use ALPC to communicate with client processes.

## Pipes

A `pipe` acts as a conduit allowing two processes to communicate.
Pipes were one of the first IPC mechanisms in early UNIX system.
In implementing a pipe, four issues must be considered:

1. Does the pipe allow bidirectional communication, or is communication unidirectional?
2. If two-way communication is allowed, is it half duplex (data can travel only one way at a time) or full duplex (data can travel in both directions at the same time)?
3. Must a relationship (such as parent-child) exist between the communicating processes?
4. Can the pipes communicate over a network, or must the communicating processes reside on the same machine?

Brief contrast between `Ordinary Pipes` and `Named Pipes` on `UNIX` and `Windows`:

- Ordinary Pipes (termed `anonymous pipes` on Windows systems)
  - unidirectional
  - parent-child relationship
  - cease to exist, once the processes have finished communicating and have terminated
- Named Pipes
  - bidirectional
  - no need for parent-child relationship
  - continue to exist, ...
  - UNIX
    - half-duplex
    - on the same machine
  - Windows
    - full-duplex
    - ability to communicate over a network

## RPCs (remote procedure calls)

Communication using sockets -- although common and efficient -- is considered a low-level form of communication between distributed processes.
One reason is that sockets allow only an unstructured stream of bytes to be exchanged between the communicating threads.
It is the responsibility of the client and server application to impose a structure on the data.
RPCs is a higher-level method of communication.
There are several issues:

- Parameter marshaling addresses the issue concerning differences in data representation on the client and server machines. Many RPC systems define a machine-independent representation of data. One such representation is known as `external data representation (XDR)`.
- Another important issue involves the semantic of a call. One way to address this problem is for the operating system to ensure that messages are acted on **exactly once**, rather than **at most once**. For **exactly once**, we need to remove the risk that the server will never receive the request. To accomplish this, the server must implement the **at most once**protocol (the server must keep a history of all the timestamps of messages it has already processed, incoming messages that have a timestamp already in the history are ignored) but must also acknowledge to the client that the RPC call was received and executed. The client must resend each RPC call periodically until it receives the ACK for that call.
- Yet another important issue concerns the communication between a server and a cient. Two approaches are common. First, the binding information may be predetermined, in the form of fixed port addresses. Second, binding can be done dynamically by a rendezvous mechanism. Typically, an operating system provides a rendezvous (also called a matchmaker) daemon on a fixed RPC port. Figure below shows a sample interaction.

![Execution of a remote procedure call (RPC)](Operating-System-Concepts-3-Processes/execution-of-a-remote-procedure-call.png '=666px--0.5-')

## Another COPY of Summary in the Book

- A process is a program in execution, and the status of the current activity of a process is represented by the program counter, as well as other registers.
- The layout of a process in memory is represented by four different sections: (1)text, (2)data, (3)heap, and (4)stack.
- As a process executes, it changes state. There are four general states of a process: (1)ready, (2)running, (3)waiting, and (4)terminated.
- A process control block (PCB) is the kernel data structure that represents a process in an operating system.
- The role of the process scheduler is to select an available process to run on a CPU.
- An operating system performs a context switch when it switches from running one process to running another.
- The `fork()` and `CreateProcess()` system calls are used to create processes on UNIX and Windows systems, respectively.
- When shared memory is used for communication between processes, two (or more) processes share the same region of memory. POSIX provides an API for shared memory.
- Two processes may communicate by exchanging messages with one another using message passing. The Mach operating system uses message passing as its primary form of interprocess communication. Windows provides a form of message passing as well.
- A pipe provides a conduit for two processes to communicate. There are two forms of pipes, ordinary and named. Ordinary pipes are designed for communication between processes that have a parent-child relationship. Named pipes are more general and allow serveral processes to communicate.
- UNIX systems provide ordinary pipes through the `pipe()` system call. Ordinary pipes have a read end and a write end. A parent process can, for example, send data to the pipe using its write end, and the child process can read it from its read end. Named pipes in UNIX are termed FIFOs.
- Windows systems also provide two forms of pipes -- anonymous and named pipes. Anonymous pipes are similar to UNIX ordinary pipes. They are unidirectional and employ parent-child relationships between teh communicating processes. Named pipes offer a richer form of interprocess communication than the UNIX couterpart, FIFOs.
- Two common forms of client-server communication are sockets and remote procedure calls (RPCs). Sockets allow two processes on different machines to communicate over a network. RPCs abstract the concept of function (procedure) calls in such a way that a function can be invoked on another process that may reside on a seperate computer.
- The Android operating system uses RPCs as a form of interprocess communication using its binder framework.

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
