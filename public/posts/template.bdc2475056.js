!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s="./src/template/v1/index.ts")}({"./src/template/v1/index.ts":function(t,e,n){"use strict";n.r(e);var o,r=n.p+"click-dbdc122add.wav",i=(o=null,function(t){return null===o&&(o=t),o===t}),a=function(t){if(i(t)){var e=document.getElementById("click-wav");e||((e=document.createElement("audio")).id="click-wav",document.body.appendChild(e)),e instanceof HTMLAudioElement&&(e.setAttribute("src",r),e.play())}},c=a.bind(null,"mousedown"),u=a.bind(null,"touchstart");function d(t,e,n){var o=e-t>0;return(o?Math.min:Math.max)(e,t+(o?1:-1)*n)}document.body.addEventListener("mousedown",c),document.body.addEventListener("touchstart",u),window.addEventListener("beforeunload",(function(){document.body.removeEventListener("mousedown",c),document.body.removeEventListener("touchstart",u)}));var l={top:0,left:0,width:0,height:0};function s(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(t){var o=45,r=performance.now();requestAnimationFrame(i)}function i(){if(t){var a=performance.now(),c=a-r;r=a;var u=[d(t.scrollLeft,n,o*c),d(t.scrollTop,e,o*c)];(Math.abs(u[0]-n)>0||Math.abs(u[1]-e)>0)&&requestAnimationFrame(i);var l=u[0],s=u[1];t.scrollTo(l,s)}}}function f(t,e){t&&e&&s(t,function(t,e){if(!t)return l;for(var n={top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight},o=t.offsetParent;!e||o!==e;){if(!(o instanceof HTMLElement))return n;n.top+=o.offsetTop,n.left+=o.offsetLeft,o=o.offsetParent}return n}(e,t).top)}window.top===window&&(location.href="https://yx1991.gitee.io/blog"),"#snapshot"!==location.hash&&document.body.classList.remove("snapshot"),document.body.addEventListener("click",(function(){window.top.postMessage("iframe.detail clicked","https://yx1991.gitee.io")}));var m=Date.now();function p(t){t.preventDefault(),s(document.getElementById("main"),0)}function v(t,e){e.preventDefault(),f(document.getElementById("main"),t)}function h(t,e){e.preventDefault(),window.top.postMessage("please-open-in-new-tab ".concat(t),"https://yx1991.gitee.io")}window.addEventListener("message",(function(t){var e;t.data==="show-time ".concat(m)&&(null===(e=document.querySelector("article.markdown-body.hidden"))||void 0===e||e.classList.remove("hidden"))})),window.top.postMessage("is-it-time-to-show ".concat(m),"https://yx1991.gitee.io");var b=[function(t){return!t.getAttribute("download")||(t.setAttribute("target","_top"),!1)},function(t,e){return"scroll-to-the-very-top"!==e||(t.addEventListener("click",p),!1)},function(t,e){return!(null==e?void 0:e.startsWith("scroll-to:"))||(t.addEventListener("click",v.bind(t,document.getElementById(null==e?void 0:e.substring("scroll-to:".length)))),!1)},function(t,e){return t.addEventListener("click",h.bind(t,e)),!1}];function y(t,e,n){0===n?e.classList.add("main"):t[n]=e.textContent?e.textContent:""}function w(t,e){for(var n=e.children,o=1;o<n.length;o++)n[o].setAttribute("data-th",t[o])}document.querySelectorAll("a").forEach((function(t){for(var e=t.getAttribute("href"),n=0,o=b[n](t,e);o&&n<b.length;n++,o=b[n](t,e));})),document.querySelectorAll(".markdown-body table").forEach((function(t){var e=[];t.querySelectorAll("thead > tr > th").forEach(y.bind(null,e)),t.querySelectorAll("tbody > tr").forEach(w.bind(null,e))}))}});