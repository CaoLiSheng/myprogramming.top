---
style: github
title: IPV4 组播通信
date: 2021-02-06
tags:
  - Web
  - IPV4
  - 组播通信
  - 读书时的困惑
---

D类IPv4地址是组播地址，用于IPv4组播通信中。通过组播IPv4地 址，组播时源主机(组播源)只需发送一份数据，就可以使对应组播 组(组播组使用D类IPv4地址标识)中的一个或多个主机收到这份数 据的副本的通信方式，但只有组播组内的主机可以接收该数据。

IP组播技术有效地解决了单点发送多点接收的问题，实现了IP网 络中点到多点的高效数据传送，能够大量节约网络带宽、降低网络负 载。还可以利用网络的组播特性方便地提供一些新的增值业务，包括 在线直播、网络电视、远程教育、远程医疗、网络电台、实时视频会 议等互联网的信息服务领域。

D类IPv4的地址结构如图8-7所示，规定在最高字节中前4位分别固 定为1、1、1、0，整个组播地址范围为224.0.0.0~239.255.255.255。

![D类IPv4地址结构](net-multicasting/D-IPv4.png '=333px-')

整个组播IPv4地址根据不同的应用环境和用途又可划分为预留组 播地址、公用组播地址、临时组播地址、本地管理组播地址四大类。

### (1)预留组播地址

预留组播地址(又称永久组播地址)就是由IANA保留不分配给特 定用户使用，仅为公用的组播路由协议分配使用的组播地址，地址范 围为224.0.0.0~224.0.0.255。使用这些预留组播地址的组播协议包括 IGMP(Internet组管理协议)、CGMP(Cisco组管理协议)、IGMP Snooping(IGMP侦听)和PIM(协议无关组播)等。使用这段组播地 址的IP包不被路由器转发。

在这个地址组段中，224.0.0.0不分配;224.0.0.1分配给本地组播网 络所有支持组播的主机;224.0.0.2分配给本地组播网络中的所有组播 路由器;224.0.0.4分配给本地组播网络中的所有DVMRP路由器; 224.0.0.5分配给本地组播网络中的所有OSPF路由器;224.0.0.6分配给 本地组播网络中的所有OSPF指定路由器(DR);224.0.0.9分配给本地 组播网络中的所有RIPv2路由器;224.0.0.10分配给本地组播网络中的 所有IGRP路由器;224.0.0.13分配给本地组播网络中的所有PIMv2路由 器;224.0.0.22分配给本地组播网络中的所有IGMPv3路由器。

### (2)公用组播地址

公用组播地址就是在全球范围内可以直接在互联网上使用的组播 地址，就像前面介绍的公网单播IPv4地址一样。公用组播地址范围为 224.0.1.0~224.0.1.255，也是由IANA为提出申请并付费的用户分配 的。

### (3)临时组播地址

临时组播地址就是由企业用户在本企业局域网内部使用的组播地 址，地址范围为224.0.2.0~238.255.255.255，仅在本地局域网内有限， 就像前面介绍的局域网IPv4地址一样。

### (4)本地管理组播地址

本地管理组播地址也是保留使用的，专用于局域网内部组播测 试，地址范围为239.0.0.0~239.255.255.255，仅在特定的本地网络范围 内有效。

当网络层收到组播数据报文时，根据组播目的地址查找组播转发 表，对报文进行转发。在私网中，组播是不需要在工作站上配置的， 只需要在网络中的路由器或者支持组播协议的三层交换机上进行配 置。私网工作站中被分配的组播地址都是224.0.0.1，就像环路地址 127.0.0.1一样，无须另外配置。只要在路由器中启用了组播协议后就 可以对应加入到组播组中。公网中，工作站组播地址选择224.0.1.0~ 238.255.255.255范围中的一个即可。

另外，要注意的是，在进行组播通信时，在数据链路层目的MAC 地址字段封装的也是组播MAC地址。IANA把01:00:5E开头的以太 网MAC块作为组播地址对应的二层组播MAC地址。组播MAC地址的 范围是01:00:5E:00:00:00~01:00:5E:7F:FF:FF(前24位 为MAC头，固定不变，第25位为0)，并要求将IPv4组播地址的后28 位(因为最高的4位是固定不变的)映射到48位的MAC地址空间中。

具体的映射方法是将组播IPv4地址中的低23位放入MAC地址的低 23位，如图8-8所示。至于为什么要映射后面的23位，原因就在于根据 IANA给出组播MAC地址段是前3字节(也就是24位)来标识单位或者 厂商，只有后面24位来和IP地址映射;而给定的地址空间后3字节的最 高位相同，都为0，那么给定的MAC地址段内只有23位了，所以最终 只能丢弃28位IPv4地址中的前5位，剩下的23位和MAC的23位相映 射。注意，这个映射无须手动进行，在路由器启动组播协议，站点加 入到组播组后就会自动生成。

由于IPv4多播地址的后28位中只有23位被映射到MAC地址，这样 会有32个(25，IPv4多播地址中有5位可变)IP多播地址映射到同一 MAC地址上。

![多播IP地址到MAC地址的映射](net-multicasting/IP-MAC.png '=333px-')