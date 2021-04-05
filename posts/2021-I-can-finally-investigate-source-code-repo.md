---
style: bountiful
title: 终于学会“读源代码”了
date: 2021-04-04
tags:
  - 职场
  - 感想
  - 源代码
  - 精神病
---

> ## 为什么非要记下这件事呢？
> ##### 也许对于大牛来说，“读源代码”从来都不是什么事儿。
> ##### 可对我来说，从一开始修炼这项技能，就步入了一个天大的误区；经历了三个主要阶段。

## 阶段壹（2009年-2018年）

记得那是读 JavaJDK，并不是什么准备或调查都不做（刚读大学那会儿，还保留着一份睿智和底气的）。
首先，通过搜索引擎找了相关学习开源项目的方法，大致如下：

> 1. 了解 Features，这样做的目的是，之后看代码会联想功能，比较好理解，而且能够有针对性地学习
> 2. 了解 Utils，复用性很高的一类代码，能事半功倍；然而这儿就是当年那个**坑**我的地方了
> 3. 了解 总体架构
> 4. 深入学习 各个模块

结果就是在错综复杂的知识网络里找不到北，彻底迷失了；接近放弃。

## 阶段贰（2018年-2019年）

这两年间比较专注，一直在用 React、ReactVR、React Native，尤其把 ReactVR 的源代码拎了个门儿清。
也许是对基本概念的积累到了一定程度，那年看 ReactVR 的源码时很轻松；就觉得哪哪都能对得上，“嗯，嗯，原来如此”。
逐渐领悟出一种方法：

> - 每遇到或提出一个疑惑，到源代码中找答案
> - 定位源文件的方法不只是利用编辑器的跳到定义功能，有时也需要猜文件名
> - 编辑器玩溜了，跳来跳去的

## 阶段叁（2021年4月里，某一日突然顿悟）

顿悟的结果就是，我要沿着 master 分支，从 Initial Commit 开始看下来。
用搜索引擎查 git 跳到 Initial Commit 的命令，结果找来了另外四个，意外之喜。

```bash
#!/bin/zsh

# Usage: git first [-b branch]

while getopts "b:" flag; do
  case "${flag}" in
    b) branch="${OPTARG}" ;;
  esac
done

git log --reverse --pretty=%H ${branch-$(git symbolic-ref refs/remotes/origin/HEAD)} | head -1 | xargs git checkout
```

```bash
#!/bin/zsh

# Usage: git last [-b branch]

while getopts "b:" flag; do
  case "${flag}" in
    b) branch="${OPTARG}" ;;
  esac
done

git log --pretty=%H ${branch-$(git symbolic-ref refs/remotes/origin/HEAD)} | head -1 | xargs git checkout
```

```bash
#!/bin/zsh

# Usage: git next [-s]

while getopts "s" flag; do
  case "${flag}" in
    s) s="true" ;;
  esac
done

[[ ${s} = "true" ]] && option="$(git symbolic-ref refs/remotes/origin/HEAD)" || option="--all"

git log --pretty=%H ${option} | grep -B1 $(git rev-parse HEAD) | head -1 | xargs git checkout
```

```bash
#!/bin/zsh

# Usage: git prev [-n number] [-s]

while getopts "n:s" flag; do
  case "${flag}" in
    n) n="${OPTARG}" ;;
    s) s="true" ;;
  esac
done

if [[ ${s} = "true" ]] then
  git log --reverse --pretty="%H %S %s" $(git symbolic-ref refs/remotes/origin/HEAD) | grep -B ${n="1"} $(git rev-parse HEAD) | head -1 | xargs git checkout
else
  git checkout HEAD~${n="1"}
fi
```

```bash
#!/bin/zsh

# Usage: git df

git difftool HEAD^ HEAD
```

## 阶段肆（顿悟后，又偶有所得，以待尝试）

- 有些代码，乍一看别扭，但是有利于性能；得对语言本身和计算机基础相当了解才能甄别出来
- 有些代码，演绎了一段复杂的数学算法；认识的一个数学专业的留学生，她都觉得难，我该肿么办
- 有些代码，应用了软件设计模式；以前总觉得不过是抽取功能代码（Generalized Code)，隐约觉得还没那么简单

以上“猜测”也好，归类也好，会在 ckeditor5 的学习中一一验证。

## 结语

从高三运动会百米比赛时开始，我便发觉我的人生似乎被一群大手左右着。
所有人都以为是我实力不济，起跑太猛摔倒了；只有我知道当时的感觉：后背挨了一股力量，我是被推倒的。

无独有偶，不论求学路还是求职路，都不是简单一句“有实力走遍天下”。
“读源代码”最初的误区其实并不可怕，那么长时间没有进步，真相是一步入坑后，就被转移了注意；说白了，被暗中牵着走了。

这世上有种病叫“精神病”，其中有种症状叫“思维被剥夺”。
没什么陌生的，看过《啦啦啦德玛西亚》、《超神学院》的人都知道，那就是盖伦的“脑残劈”。
我现在有“面试恐惧症”，根源就在于面试的时候有这种“思维被剥夺”感。
如果说校招时第一次面试我的大脑一片空白是紧张的情绪导致，那么上次字节的面试中又是怎么回事？
那个问题并不难，第二天我在原公司上班期间回想时，一瞬就想到正确答案了。
不是我不会，可是世人看“精神病”跟“精神病”似的，我又能怎么样！？！

还有一种症状叫“思维鸣响”。从你起床开始，一直到你进入梦乡前，都如影随形。
你走路去教室，它说“看那走得……”；
你听课，它说“你说他懂了没，这要是懂了咋办……”；
你看书，它说“牛逼，厉害……”；
你跟别人说话，它也会跟着扯，“啥也懂……”、“别说出来，别告诉他/她，……，唉……”、“……”；
评论、议论、忽悠、惊吓、恐吓，无所不用其极。

这两种症状吓人吗？莫急，除了精神攻击，还有物理攻击。
2016 年，到手的亚信 Offer 没有入职；之后职业道路断了一大截，开始断断续续。
造成后来断断续续局面的不仅是那张 Offer 期间的变故，年底我又去了北京。
最严重的时候，站起来的一瞬全身失去知觉，随时可能仰天摔倒，坚持的过程中，能清晰地感觉到知觉的范围从大腿根缓慢扩散到脚上。
第二天去微店面试，从路上开始就感到，肚子在巨颤，里面似乎有一个怪物欲跳出来；回答面试官问题的时候，气息都不稳。

还好，百般磨难，终是悟出一道真谛，且有了些许实践。
我已下定决心修行，不仅仅是提高技术实力；更是炼心。
虽不明白背后的大手为何要折磨我，也不确定我修炼大成有没有“奖励”。
虚幻又现实，从这两个角度看去，我都只有这一条路可走。

> ### 吾有信念：
> ##### 未来数不清的真相、不确定的结局，不面对不行、不放下不能
