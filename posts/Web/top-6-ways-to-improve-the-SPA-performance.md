---
style: github
title: Top 6 ways to improve the SPA performance
date: 2020-09-23
tags:
  - Web
  - Javascript
  - SPA 性能优化
---

1. Lazily render below-the-fold content
2. Use lazy data fetching
3. Cache the static content
4. Use WebSockets where appropriate (i.e. for highly interactive apps)
5. Employ JSONP/CORS to bypass the same-origin policy

![saync vs. defer](top-6-ways-to-improve-the-SPA-performance/asynch-in-script-tag.png)
As preflight checks add a second roundtrip, they can effectively double your latency.

![a cross-domain XHR call](top-6-ways-to-improve-the-SPA-performance/preflight-double-latency.png)

    1. Write your APIs and serve your content using only HEAD, GET, POST, Accept, Accept-Language, Content-Language, and Content-Type as they don’t initiate preflight request
    2. Cache the preflight responses to decrease the subsequent checks

6. Use a content delivery network (CDN)
