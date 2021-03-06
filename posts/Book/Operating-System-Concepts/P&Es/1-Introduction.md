---
style: antique
title: 读书习题之《Operating System Concepts》1
date: 2021-02-16 00:00:01
tags:
  - 读书
  - 习题
  - 操作系统
  - 概论
---

> 习题 of 概述

## 1.1 What are the three main purposes of an operating system?

- 给用户提供一个在硬件上方便且高效的执行应用程序的环境
- 尽可能公正且高效的为运行的应用程序分配计算机资源
- 监督应用程序的执行过程，避免宕机；管理 I/O 设备等

## 1.2 We have stressed the need for an operatinig system to make efficient use of the computing hardware. When is it appropriate for the operating system to forsake this principle and to "waste" resources? Why is such a system not really wasteful?

如果说计算机的主要用途是提供计算能力，那么 GUI 就是一种浪费。然而，GUI 却提供了更好的人机交互方式。

## 1.3 What is the main difficulty that a programmer must overcome in writing an operating system for a real-time environment?

实时系统需要系统对外部事件在规定时间内做出响应，这很像图形学程序中一帧内如果没有完成渲染就会掉帧。
而很多实时系统运行的设备都要完成人命关天的任务，所以压力山大啊。

## 1.4 Keeping in mind the various definitions of *operating system*, consider whether the operating system should include applications such as web browsers and mail programs. Argue both that it should and that is should not, and support your answers.

- 应当包含：
  - 内嵌于操作系统的软件有更快的运行速度，换句话说运行在内核态，性能好
- 不应当包含：
  - 从概念上说，应用程序就是应用程序，操作系统对它应该是监控，而不是放任在内核里
  - 内核里运行虽然性能好，但是天晓得有没有漏洞，被恶意网站或恶意邮件利用
  - 加入常用功能都包含在操作系统的话，那操作系统就会非常臃肿

## 1.5 How does the distinction between kernel mode and user mode function as a rudimentary form of protection (security)?

计算机硬件中存放一个状态比特：内核(0)，用户(1)；或者相反。一部分 CPU 指令仅在内核态下才能执行，以此达到一种保护和安全的作用。

## 1.6 Which of the following instructions should be privileged? a) Set value of timer. b) Read the clock. c) Clear memory. d) Issue a trap instruction. e) Turn off interrupts. f) Modify entries in device-status table. g) Switch from user to kernel mode. h) Access I/O device.

a) Set value of timer. c) Clear memory. e) Turn off interrupts. f) Modify entries in device-status table. h) Access I/O device.

## 1.7 Some early computers protected the operating system by placing it in a memory partition that could not be modified by either the user job or the operating system itself. Describe two difficulties that you think could arise with such a scheme.

主要从安全性角度去分析，早期计算机多为多个用户共享。
放在保护区的内容可能包含每个用户的敏感信息，虽然不可写但却是对系统里所有其它用户开放读取的。
另外，敏感信息同时可能因为在非保护区读写造成泄露。
最好的办法是，利用操作系统的系统机制保护相关敏感数据，而不仅仅用硬件解决。

## 1.8 Some CPUs provide for more than two modes of operation. What are two possible uses of these multiple modes?

1. 虚拟机
2. USB设备的驱动程序可以自动运行在“准用户/内核态”

## 1.9 Timers could be used to compute the current time. Provide a short description of how this could be accomplished.

首先，计时器分为固定频率的和变量控制的两种；通过对时钟振动的计数实现；即内核中维护一个当前时间的变量 `jiffies`，每次固定频率计时器触发中断时，加上对应的周期。
有个一模一样的场景：JS中有这样一段代码 `performance.now()`，就是获取页面开始载入开始到代码执行时的时间，即当前时间。

## 1.10 Give two reasons why caches are useful. What problems do they solve? What problems do they cause? If a cache can be made as large as the device for which it is caching (for instance, a cache as large as disk), why not make it that large and eliminate the device?

由于CPU的运算速度与CPU和主存间传输速度的巨大差异，在CPU和主存间放置高速的缓存可以消除或缩短CPU空闲时间，以充分利用CPU算力，提高系统性能。
然而缓存可以说是主存的一份拷贝，而CPU不仅会读这份拷贝，也会有写入操作，造成缓存与主存的不一致；在多核处理器中这种不一致更为复杂。
之所以，缓存不能取代主存，就是因为对比单位比特造价上，缓存远高于主存；另外缓存往往是易失性的。

## 1.11 Distinguish between the client-server and peer-to-peer models of distributed systems.

要想区分这两种模型其实挺简单的，恐怕最大的相似之处就是 p2p 打洞过程中需要一台公网上的服务器获取 peer 的 `MAPPED_ADDRESS`，这一步是 client-server 模式的。
打洞成功后，p2p 中的客户端同时也是服务器，他们之间可以直接通信。
而 client-server 模式下若客户端之间要通信，必须经过 server。

---

## 1.12 How do clustered systems differ from multiprocessor systems? What is required for two machines belonging to a cluster to cooperate to provide a highly available service?

集群利用分散在不同的物理机上提供的算力，外部看上去像是一台物理机；多核处理器是真的一台有多个处理器的物理机。
两台物理机组成的集群对外提供高可用服务时，一台提供服务，一台监控服务状态；当服务宕机时，立刻提供服务。

## 1.13 Consider a computing cluster consisting of two nodes running a database. Describe two ways in which the cluster software can manage access to the data on the disk. Discuss the benefits and disadvantages of each.

分别是非对称集群和对称集群。
所谓非对称集群，就是一台工作，另一台热备；这样做的好处是可以使整个系统高可用，缺点是硬件资源浪费。
所谓对称集群，就是两台同时工作；这样做的好处自然是充分利用资源，整个系统性能更高，而缺点是实现起来较复杂，属并行计算范畴。

## 1.14 What is the purpose of interrupts? How does an interrupt differ from a trap? Can traps be generated intentionally by a user program? If so, for what purpose?

中断就是 CPU 突然收到更高优先级任务的信号，根据信号类型不同分为软中断和硬中断，也可以分为可屏蔽中断和不可屏蔽中断。
陷阱是软中断的另一个名字。用户程序可以通过陷阱来请求操作系统完成一些其自身不能完成的功能，但不是系统调用。

## 1.15 Explain how the Linux kernel variables HZ and jiffies can be used to determine the number of seconds the system has been running since it was booted.

HZ 是时钟中断的频率 `f`。jiffies 是从计算机启动后发生的时钟中断计数。那么自系统启动至今的时间就是 `t = jiffies / f`。

## 1.16 Direct memory access is used for high-speed I/O devices in order to avoid increasing the CPU's execution load.

### a. How does the CPU interface with the device to coordinate the transfer?

当从外设读数据时，CPU 开辟一块缓冲区并把首地址，大小等信息发送给 I/O 控制器，由 I/O 控制器接管数据传输过程，当数据传输完毕，通过中断的方式通知 CPU 处理；数据写入外设亦然。

### b. How does the CPU know when the memory operations are complete?

中断。

### c. The CPU is allowed to execute other programs with the DMA controller is transferring data. Does this process interface with the execution of the user programs? If so, describe what forms of interference are caused.

由于 CPU 和 DMA 都需要访问主存空间以工作。所以如果在 DMA 工作时，CPU 修改了 DMA 要访问的主存空间，就会出现不一致的问题。

## 1.17 Some computer systems do not provide a privileged mode of operation in hardware. Is it possible to construct a secure operating system for these computer systems? Give arguments both that it is and that it is not possible.

也能，这里说的是操作系统还是强大的操作系统，比如那个 Win 或 Mac，只是那颗 CPU 比较坑。

1. 像 Java 这样的解释型编程语言，可以在虚拟机里实现特权指令的识别和处理。
2. 规定所有人写的代码都由一个安全的编译器编译，生成的二进制代码里包含对特权指令的处理。

## 1.18 Many SMP systems have different levels of caches; one level is local to each processing core, and another level is shared among all processing cores. Why are caching systems designed this way?

为了进一步提高 CPU 核心的利用率。

## 1.19 Rank the following storage systems from slowest to fastest: a) Hard-disk drives b) Registers c) Optical disk d) Main memeory e) Nonvolatile memory f)Magnetic tapes g) Cache

f < a < c < e < d < g < b.

## 1.20 Consider an SMP system. Illustrate with an example how data residing in memory could in fact have a different value in each of the local caches.

两个核心都缓冲了同一段内存，其中一个修改了，而另一个可能没有进行修改或者修改成了另外的值；这时都没有写回本地缓冲，更别说主存。

## 1.21 Discuss, with examples, how the problem of maintaining coherence of cached data manifests itself in the following processing environments:

### a. Single-processor systems

可以在缓冲区替换的时候写回主存也可以一修改就写回

### b. Multiprocessors systems

需要在多个核心间做同步

### c. Distributed systems

需要编程模型解决；大多 Map-Reduce 了。

## 1.22 Describe a mechanism for enforcing memory protection in order to prevent a program from modifying the memory associated with other programs.

程序在加载进内存后会获得一块内存区间，分配内存的操作仅会想着一个方向进行，超出程序本身范围的内存操作就操作系统保护起来。

## 1.23 Which network configuration--LAN or WAN--would best suit the following environments?

### a. A campus student union

LAN

### b. Several campus locations across a statewide university system

WAN

### c. A neighborhood

LAN 或 WAN

## 1.24 Describe some of the challenges of designing operating systems for mobile devices compared with designing operating systems for traditional PCs.

移动设备往往相比传统 PC，屏幕尺寸较小，内存空间较小；而需要适配的传感器更多；非常用心地设计以尽可能优化电池使用寿命。

## 1.25 What are some advantages of peer-to-peer systems over client-server systems?

极大地减轻了服务端的压力

## 1.26 Describe some distributed applications that would be appropriate for a peer-to-peer system.

聊天工具、分小房间的多人在线游戏。

## 1.27 Identify several advantages and several disadvantages of open-source operating systems. Identify the types of people who would find each aspect to be an advantage or a disadvantage.

- 优点
  - 有利于学习操作系统知识
  - 只要社区强大，不管是开发新功能的速度还是修复 bug 的速度都比较快
  - 更廉价的使用授权
  - 同样由于社区的原因，开源系统质量更高
- 缺点
  - 优点破坏市场竞争的可能性

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
