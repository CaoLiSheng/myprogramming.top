#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import time
from urllib import request
from bs4 import BeautifulSoup

out_dir = "build/v2/dev"
url = "http://dev.myprogramming.top:3322/webpack-dev-server"


def job():
    resp = request.urlopen(url)
    html_doc = resp.read().decode('UTF-8')

    soup = BeautifulSoup(html_doc, "html.parser")
    links = soup.find_all('a')

    exts = ['.js', '.html', '.wav']
    for link in links:
        href = link['href']
        # print(0+href)
        if href.startswith('/webpack-dev-server/'):
            continue

        collect = False
        for ext in exts:
            if href.endswith(ext):
                collect = True
                break

        if collect == False:
            continue

        resp = request.urlretrieve(url+href, out_dir+href)

    return True


print("获取 webpack-dev-server 里的文件（本来是存在于内存中的）")
print("最终以失败告终，因为最关键的index.html不知道跑哪里去了...")
while True:
    time.sleep(3)
    try:
        if job():
            print("网站刷新了")
    finally:
        pass
