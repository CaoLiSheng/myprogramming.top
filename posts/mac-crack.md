---
style: erye
title: 记一次DNS服务崩溃事件
date: 2020-09-03 16:19:00
tags:
  - 网络崩溃
  - DNS
---

大概是在昨天（2020 年 9 月 2 日）晚上发现必应搜索打不开，提示浏览器收到的数字证书不对；紧接着打开百度和搜狗都跳转到一个叫传奇的游戏的落地页。我最初怀疑局域网里有设备中招了，ARP 攻击。但是后来发现，连局域网状态下，百度域名解析到的 IP 地址，在手机的 4G 网络下同样跳转到传奇。我尝试用 curl 访问这个 IP 地址，果然 302 了。似乎公共的 DNS 一起中招了，阿里的好一点，必应中国还能用。最终我换上了本省本服务商的 DNS；写这篇文章之前，我又查看了下 114DNS 的解析结果，已经恢复正常了。

```shell

host hostname [server]

nslookup name [server]

```

![已恢复](mac-crack/recovered.png)

---

以下照片中正确的解析都是连手机热点时的返回数据：

![错误中1](mac-crack/aterror1.jpeg)
![错误中2](mac-crack/aterror2.jpeg)
![错误中3](mac-crack/aterror3.jpeg)
![错误中4](mac-crack/aterror4.jpeg)