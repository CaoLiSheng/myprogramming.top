!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s="./src/template/v1/index.ts")}({"./src/template/v1/index.ts":function(t,e,n){"use strict";n.r(e);var o,r=n.p+"click-dbdc122add0fb2ecfe1f153ec17d8671.wav",i=(o=null,function(t){return null===o&&(o=t),o===t}),d=function(t){if(i(t)){var e=document.getElementById("click-wav");e||((e=document.createElement("audio")).setAttribute("src",r),e.id="click-wav",document.body.appendChild(e)),e.play()}},c=d.bind(null,"mousedown"),u=d.bind(null,"touchstart");document.body.addEventListener("mousedown",c),document.body.addEventListener("touchstart",u),window.addEventListener("beforeunload",(function(){document.body.removeEventListener("mousedown",c),document.body.removeEventListener("touchstart",u)})),window.top===window&&(location.href="https://yx1991.gitee.io/blog"),"#snapshot"!==location.hash&&document.body.classList.remove("snapshot"),document.body.addEventListener("click",(function(){window.top.postMessage("iframe.detail clicked","https://yx1991.gitee.io")}));var a=Date.now();function l(t){t.preventDefault(),window.scrollTo(0,0)}function s(t,e){e.preventDefault(),window.top.postMessage("please-open-in-new-tab ".concat(t),"https://yx1991.gitee.io")}window.addEventListener("message",(function(t){var e;t.data==="show-time ".concat(a)&&(null===(e=document.querySelector("article.markdown-body.hidden"))||void 0===e||e.classList.remove("hidden"))})),window.top.postMessage("is-it-time-to-show ".concat(a),"https://yx1991.gitee.io");var f=[function(t){return!t.getAttribute("download")||(t.setAttribute("target","_top"),!1)},function(t,e){return"scroll-to-the-very-top"!==e||(t.addEventListener("click",l),!1)},function(t,e){return t.addEventListener("click",s.bind(t,e)),!1}];function p(t,e,n){0===n?e.classList.add("main"):t[n]=e.textContent?e.textContent:""}function b(t,e){for(var n=e.children,o=1;o<n.length;o++)n[o].setAttribute("data-th",t[o])}document.querySelectorAll("a").forEach((function(t){for(var e=t.getAttribute("href"),n=0,o=f[n](t,e);o&&n<f.length;n++,o=f[n](t,e));})),document.querySelectorAll(".markdown-body table").forEach((function(t){var e=[];t.querySelectorAll("thead > tr > th").forEach(p.bind(null,e)),t.querySelectorAll("tbody > tr").forEach(b.bind(null,e))}))}});