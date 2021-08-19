---
style: antique
title: 读书笔记之《Operating System Concepts》5
date: 2021-04-28
tags:
  - 读书
  - 笔记
  - 操作系统
  - CPU 调度
---

> CPU 调度

## The Objective of Multiprogramming

The objective of multiprogramming is to have some process running at all times, to maximize CPU utilization. The idea is relatively simple. A process is executed until it must wait, typically for the completion of some I/O request. In a simple computer system, the CPU then just sits idle. All this waiting time is wasted; no useful work is accomplished. With multiprgramming, we try to use this time productively. Several processes are kept in memory at one time. When one process has to wait, the operating system takes the CPU away from that process and gives the CPU to another process. This pattern continues. Every time one process has to wait, another process can take over use of the CPU. On a multicore system, this concept of keeping the CPU busy is extended to all processing cores on the system.

## CPU-I/O Burst Cycle

The success of CPU scheduling depends on an observed property of processes: process execution consists of a `cycle` of CPU execution and I/O wait. Processes alternate between these two states. Process execution begins with a `CPU burst`. That is followed by an `I/O burst`, which is followed by another CPU burst, then another I/O burst, and so on.

The durations of CPU bursts have been measured extensively. Although they vary greatly from process to process and from computer to computer, they tend to have a frequency curve. The curve is generally characterized as exponential or hyperexponential, with a large number of short CPU bursts and a small number of long CPU bursts. An I/O-bound program typically has many short CPU bursts. A CPU-bound program might have a few long CPU bursts. This distribution can be important when implementing a CPU-scheduling algorithm.

## Another COPY of Summary in the Book

## 笔记目录

1. [回到开头](scroll-to-the-very-top)
