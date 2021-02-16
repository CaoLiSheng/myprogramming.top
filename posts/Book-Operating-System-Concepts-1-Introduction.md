---
style: antique
title: 读书笔记之《Operating System Concepts》1
date: 2021-01-03
tags:
  - 读书
  - 笔记
  - 操作系统
  - 概论
---

> 概述

## Why Study Operating Systems?

Although there are many practitioners of computer science, only a small percentage of them will be involved in the creation or modification of an operating system.
Why, then, study operating systems and how they work?
Simply because, as almost all code runs on top of an operating system, knowledge of how operating systems work is crucial to proper, efficient, effective, and secure programming.
Understanding the fundamentals of operating systems, how they drive computer hardware, and what they provide to applications is not only essential to those who program them but also highly useful to those who write programs on them and use them.

## Modern Interrupt-Handling Features

In a modern operating system, however, we need more sophisticated interrupt-handling features.

1. We need the ability to defer interrupt handling during critical processing.
2. We need an efficient way to dispatch to the proper interrupt handler for a device.
3. We need multilevel interrupts, so that the operating system can distinguish between high- and low-priority interrupts and can respond with the appropriate degree of urgency.

In modern computer hardware, these three features are provided by the CPU and the interrupt-controller hardware.

## Definations of Computer System Components

- CPU -- The hardware that executes instructions
- Processor -- A physical chip that contains one or more CPUs.
- Core -- The basic computation unit of the CPU.
- Multicore -- Including multiple computing cores on the same CPU.
- Multiprocessor -- Including multiple processors.

Although virtually all systems are now multicore, we use the general term CPU when referring to a single computational unit of a computer system and core as well as multicore when specifically referring to one or more cores on a CPU.

## Clustered System : Hadoop

Hadoop is an open-source software framework that is used for distributed processing of large data sets (known as big data) in a clustered system containing simple, low-cost hardware components. Hadoop is designed to scale from a single system to a cluster containing thousands of computing nodes. Tasks are assigned to a node in the cluster, and Hadoop arranges communication between nodes to manage parallel computations to process and coalesce results. Hadoop also detects and manages failures in nodes, providing an efficient and highly reliable distributed computing service.

Hadoop is organized around the following three components:

1. A distributed file system that manages data and files across distributed computing nodes.
2. The YARN (Yet Another Resource Negotiator) framework, which manages resources within the cluster as well as scheduling tasks on nodes in the cluster.
3. The MapReduce system, which allows parallel processing of data across nodes in the cluster.

Hadoop is designed to run on Linux systems, and Hadoop applications can be written using several programming languages, including scipting languages such as PHP, Perl, and Python. Java is a popular choice for developing Hadoop applications, as Hadoop has several Java libraries that support MapReduce.

## Variable Timer

A variable timer is generally implemented by a fixed-rate clock and a counter.
The operating system sets the counter.
Every time the clock ticks, the counter is decremented.
When the counter reaches 0, an interrupt occurs.
For instance, a 10-bit counter with a 1-millisecond clock allows interrupts at intervals from 1 millisecond to 1,024 milliseconds, in steps of 1 millisecond.

## Process Management

The operating system is responsible for the following activities in connection with process management:

- Creating and deleting both user and system processes
- Scheduling processes and threads on the CPUs
- Suspending and resuming processes
- Providing mechanisms for process synchronization
- Providing mechanisms for process conmmunication

## Memory Management

The operating system is responsible for the following activities in connection with memory management:

- Keeping track of which parts of memory are currently being used and which process is using them
- Allocating and deallocating memory space as needed
- Deciding which process (or parts of processes) and data to move into and out of memory

## File-System Management

The operating system is responsible for the following activities in connection with file management:

- Creating and deleting files
- Creating and deleting directories to organize files
- Supporting primitives for manipulating files and directories
- Mapping files onto mass Storage
- Backing up files on stable (nonvolatile) storage media

## Mass-Storage Management

The operating system is responsible for the following activities in connection with secondary storage management:

- Mounting and unmounting
- Free-space management
- Storage allocation
- Disk scheduling
- Partitioning
- Protection

## Characteristics of various types of storage

<div class="covtos">
<style>
.markdown-body .covtos + table th { width: 18%; }
.markdown-body .covtos + table th:first-of-type { width: 10%; }
</style>
</div>

| Level                     | 1                                      | 2                             | 3                | 4                | 5                |
| :------------------------ | :------------------------------------- | :---------------------------- | :--------------- | :--------------- | :--------------- |
| Name                      | registers                              | cache                         | main memory      | solid-state disk | magnetic disk    |
| Typical size              | < 1KB                                  | < 16MB                        | < 64GB           | < 1TB            | < 10TB           |
| Implementation technology | custom memory with multiple ports CMOS | on-chip or off-chip CMOS SRAM | CMOS SRAM        | flash memory     | magnetic disk    |
| Access time (ns)          | 0.25-0.5                               | 0.5-25                        | 80-250           | 25,000-50,000    | 5,000,000        |
| Bandwidth (MB/sec)        | 20,000-100,000                         | 5,000-10,000                  | 1,000-5000       | 500              | 20-150           |
| Managed by                | compiler (or programmer)               | hardware                      | operating system | operating system | operating system |
| Backed by                 | cache                                  | main memory                   | disk             | disk             | disk or tape     |

## I/O System Management

The I/O subsystem consists of several components:

- A memory-management component that includes buffering, caching, and spooling
- A general device-driver interface
- Drivers for specific hardware devices

## Difference between Distributed and Cluster

Distributed, in a narrow sense, is similar to a cluster, but its organization is relatively loose, unlike clusters, which are organized, one server is paralyzed, and other servers can be topped up.

Each node in the distributed network completes different services. When one node is smashed, the service is inaccessible.

1. Distributed refers to splitting a business into different sub-services and distributing them on different machines.

2. Cluster refers to a group of servers that are grouped together to achives the same business and can be considered as one computer.

Each node that is distributed can be used for clustering. Clusters are not neccessarily distributed.

## Kinds of Area Networks

- A _**local-area network (LAN)**_ connects computers within a room, a building, or a campus.
- A _**wide-area network (WAN)**_ usually links buildings, cities, or countries.
- A _**metropolitan-area network (MAN)**_ could link buildings within a city.
- BlueTooth and 802.11 devices use wireless technology to conmmunicate over a distance of several feet, in essence creating a _**personal-area network (PAN)**_ between a phone and a headset or a smartphone and a desktop computer.
- _storage-area networks (SANs)_ is another story!

## Distributed Operating System : Hormony

A _**network operating system**_ is an operating system that provides features such as file sharing across the network, along with a communication scheme that allows different processes on different computers to exchange messages. A computer running a network operating system acts autonomously from all other computers on the network, although it is aware of the network and is able to communicate with other networked computers. A _**distributed operating system**_ provides a less autonomous environment. The different computers communicate closely enough to provide the illusion that only a single operating system controls the network.

## Two Specialized Distributed System

a _**client-server system**_, the form of specialized **distributed system**, is a contemporary network architeture features arragements in which server systems satisfy requests generated by all-ends client systems (desktop, laptop, smartphone).

while the other is a _**peer-to-peer system**_ (with or without centralized lookup service on the network).

## Cloud Computing

- **Public cloud** -- a cloud available via the Internet to anyone willing to pay for the services
- **Private cloud** -- a cloud run by a company for that company's own use
- **Hybird cloud** -- a cloud that includes both public and private cloud components
- Software as a service (**SaaS**) -- one or more applications (such as word processors or spreadsheets) available via the Internet
- Platform as a service (**PaaS**) -- a software stack ready for application use via the Internet (for example, a database server)
- Infrastructure as a service (**IaaS**) -- servers or starge abailable over the Internet (for example, storage available for making backup copies of production data)

These cloud-computing types are not discrete, as a cloud computing environment may provide a combination of several types. Notice that both the cloud services and the cloud user interface are protected by a firewall.

## Another COPY of Summary in the Book

- An operating system is software that manages the computer hardware, as well as providing an environment for application programs to run.
- Interrupts are a key way in which hardware interacts with the operating system. A hardware device triggers an interrupt by sending a signal to the CPU to alert the CPU that some event requires attention. The interrupt is managed by the interrupt handler.
- For a computer to do its job of executing programs, the programs must be in main memory, which is the only large storage area that the processor can access directly.
- The main memory is usually a volatile storage device that loses its contents when power is turned off or lost.
- Nonvolatile storage is an extension of main memory and is capable of holding large quantities of data permanently.
- The most common nonvolatile storage device is a hard disk, which can provide storage of both programs and data.
- The wide variety of storage systems in a computer system can be organized in a hierarchy according to speed and cost. The higher levels are expensive, but they are fast. As we move down the hierarchy, the cost per bit generally decreases, whereas the access time generally increases.
- Modern computer architectures are multiprocessor system employ multiprogramming, which allows several jobs to be in memory at the same time, thus ensuring that the CPU always has a job to execute.
- Multitasking is an extension of multiprogramming wherein CPU scheduling algorithms rapidly switch between processes, providing users with a fast response time.
- To prevent user programs from interfering with the proper operation of the system, the system hardware has two modes: user mode and kernel mode.
- **_Various instructions are privileged and can be executed only in kernel mode._** Examples include I/O control, timer management, and interrupt management.
- A process is the fundamental unit of work in an operating system. Process management includes creating and deleting processes and providing mechanisms for processes to communicate and synchronize with each other.
- An operating system manages memory by keeping track of what parts of memory are being used and by whom. It is also responsible for dynamically allocating and freeing memory space.
- Storage space is managed by the operating system; this includes providing file systems for representing files and directories and managing space on mass-storage devices.
- Operating system provide mechanisms for protecting and securing the operating system and users. Proctection measures control the access of processes or users to the resources made available by the computer system.
- Virtualization involves abstracting a computer's hardware into several defferent execution environment.
- Data structures that are used in an operating system includes lists, stacks, queues, trees, and maps.
- Computing takes place in a variety of environments, including traditional computing, mobile computing, client-server computing, peer-to-peer systems, cloud computing, and real-time embedded systems.
- Free and open-source operating systems are available in source-code format. Free software is licensed to allow no-cost use, redistribution, and modification. GNU/Linux, FreeBSD, and Solaris are examples of popular open-source systems.

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
