---
style: github
title: 泊松融合
date: 2021-08-23
tags:
  - 自研项目
  - 图像处理
  - 泊松融合
  - Python
---

```python
# -*- coding: utf-8 -*-
# coding=utf-8
import numpy as np
import scipy.signal as signal

import matplotlib.pyplot as plt
import matplotlib.image as mpimg


def buildInverseCoefficientMatrix(h, w):
    pixels = h * w
    m = np.eye(pixels, pixels)
    for r in range(1, h-1):
        for c in range(1, w-1):
            p = r * w + c
            m[p, p] = -4
            m[p, p-1] = 1
            m[p, p+1] = 1
            m[p, (r-1)*w+c] = 1
            m[p, (r+1)*w+c] = 1
    return np.linalg.inv(m)


def filter2D(img, kernel):
    r = img[:, :, 0]
    g = img[:, :, 1]
    b = img[:, :, 2]

    r1 = signal.convolve2d(r, kernel, mode="same")
    g1 = signal.convolve2d(g, kernel, mode="same")
    b1 = signal.convolve2d(b, kernel, mode="same")

    return np.dstack((r1, g1, b1))


def computeGradientX(img):
    return filter2D(img, np.array([[1, -1, 0]]))


def computeGradientY(img):
    return filter2D(img, np.array([[1], [-1], [0]]))


def computeLaplacianX(gradient):
    return filter2D(gradient, np.array([[0, 1, -1]]))


def computeLaplacianY(gradient):
    return filter2D(gradient, np.array([[0], [1], [-1]]))


def cloneArea(bg, fg):

    return


def singlePlot(img, title):
    plt.figure()
    plt.imshow(img)
    plt.gcf().canvas.set_window_title(title)


def floatToUint8(f):
    if f > 255:
        return 255
    elif f < 0:
        return 0
    else:
        return np.uint8(f)


def normalClone(bg, fg):
    h, w, c = fg.shape
    dest = bg[:h, :w]
    singlePlot(dest, '测试: 为了简化，我直接放在背景图左上角')

    destGradientX = computeGradientX(dest)
    destGradientY = computeGradientY(dest)
    patchGradientX = computeGradientX(fg)
    patchGradientY = computeGradientY(fg)
    singlePlot(destGradientX, '测试1')
    singlePlot(destGradientY, '测试2')
    singlePlot(patchGradientX, '测试3')
    singlePlot(patchGradientY, '测试4')

    laplacianX = computeLaplacianX(destGradientX + patchGradientX)
    laplacianY = computeLaplacianY(destGradientY + patchGradientY)
    lap = laplacianX + laplacianY

    for i in range(w):
        lap[0, i] = dest[0, i]
        lap[h-1, i] = dest[h-1, i]
    for j in range(h):
        lap[j, 0] = dest[j, 0]
        lap[j, w-1] = dest[j, w-1]

    singlePlot(lap, '测试5')

    lap = np.reshape(lap, (-1, c))
    icm = buildInverseCoefficientMatrix(h, w)
    merged = np.dot(icm, lap)
    merged = np.reshape(merged, (-1))
    merged = np.array([floatToUint8(x) for x in merged])
    merged = np.reshape(merged, (h, w, c))
    singlePlot(merged, '测试6')

    res = bg.copy()
    res[:h, :w] = merged
    return res


def mixedClone(bg, fg):
    return np.zeros(bg.shape, dtype=bg.dtype)


def plot(imgs, titles):
    _, axes = plt.subplots(ncols=2, nrows=2, figsize=(8, 8))
    for idx in range(4):
        axes[idx//2, idx % 2].set_title(titles[idx])
        axes[idx//2, idx % 2].set_xticks(())
        axes[idx//2, idx % 2].set_yticks(())
        axes[idx//2, idx % 2].imshow(imgs[idx], vmin=0, vmax=1)
    plt.gcf().canvas.set_window_title("泊松克隆")


if __name__ == "__main__":
    plt.rcParams['font.family'] = ['SSQingChengTi']  # 用来正常显示中文标签
    plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号

    bg = mpimg.imread('./images/bg.jpg')
    fg = mpimg.imread('./images/fg.jpg')

    nc = normalClone(bg, fg)
    mc = mixedClone(bg, fg)

    plot(imgs=[bg, fg, nc, mc], titles=["背景图", "贴图", "普通模式", "融合模式"])
    plt.show()
```
