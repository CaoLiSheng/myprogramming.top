---
style: antique
title: 读书笔记之《计算机组成原理》6
date: 2020-12-18
tags:
  - 读书
  - 笔记
  - 计算机组成原理
  - 中央处理器
---

> 中央处理器

![知识点梳理（右键在新窗口单独查看）](Computer-Organization-6-CPU/key-knowlages.png '=1100px-500px')

> 表 1

| 指令系统体系结构 | CISC                 | RISC                     |
| :--------------- | :------------------- | :----------------------- |
| 指令系统         | 复杂、庞大           | 简单、精简               |
| 指令数目         | 一般大于 200 条      | 一般小于 100 条          |
| 指令字长         | 不固定               | 等长                     |
| 寻址方式         | 一般大于 4           | 一般小于 4               |
| 可访存指令       | 不加限制             | 只有 Load/Store 指令     |
| 各种指令执行时间 | 相差较大             | 绝大多数在一个周期内完成 |
| 通用寄存器数量   | 较少                 | 多                       |
| 控制方式         | 绝大多数为微程序控制 | 绝大多数为硬布线控制     |

> 表 2

计算机执行一个程序所用的时间 t = I x C x T。I 是高级语言编译后在机器上执行的机器指令总数，C 是执行每条机器指令所需的平均周期数，T 是每个周期的执行时间。下表中 I、T 为比值，C 为实际周期数。

| 指令集 |     I      |     C      |  T  |
| :----: | :--------: | :--------: | :-: |
|  RISC  | 1.2 ～ 1.4 | 1.3 ～ 1.7 | <1  |
|  CISC  |     1      |  4 ～ 10   |  1  |
