!function(e){function t(t){for(var n,o,u=t[0],i=t[1],M=0,c=[];M<u.length;M++)o=u[M],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&c.push(r[o][0]),r[o]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(a&&a(t);c.length;)c.shift()()}var n={},r={0:0};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var u=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=u);var i,M=document.createElement("script");M.charset="utf-8",M.timeout=120,o.nc&&M.setAttribute("nonce",o.nc),M.src=function(e){return o.p+""+({}[e]||e)+".a6c5a85527afe4ecfc6e.js"}(e);var a=new Error;i=function(t){M.onerror=M.onload=null,clearTimeout(c);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;a.message="Loading chunk "+e+" failed.\n("+o+": "+u+")",a.name="ChunkLoadError",a.type=o,a.request=u,n[1](a)}r[e]=void 0}};var c=setTimeout((function(){i({type:"timeout",target:M})}),12e4);M.onerror=M.onload=i,document.head.appendChild(M)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="./",o.oe=function(e){throw console.error(e),e};var u=window.webpackJsonp=window.webpackJsonp||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var M=0;M<u.length;M++)t(u[M]);var a=i;o(o.s="./src/www/v1/app.ts")}({"./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},"./node_modules/@babel/runtime/helpers/arrayWithHoles.js":function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},"./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,u=void 0;try{for(var i,M=e[Symbol.iterator]();!(r=(i=M.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,u=e}finally{try{r||null==M.return||M.return()}finally{if(o)throw u}}return n}}},"./node_modules/@babel/runtime/helpers/nonIterableRest.js":function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},"./node_modules/@babel/runtime/helpers/slicedToArray.js":function(e,t,n){var r=n("./node_modules/@babel/runtime/helpers/arrayWithHoles.js"),o=n("./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js"),u=n("./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js"),i=n("./node_modules/@babel/runtime/helpers/nonIterableRest.js");e.exports=function(e,t){return r(e)||o(e,t)||u(e,t)||i()}},"./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":function(e,t,n){var r=n("./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},"./src/www/utils/rem.ts":function(e,t){var n,r=document.documentElement;function o(){var e=r.offsetWidth;r.style.fontSize=e<=750?e/7.5+"px":"100px"}function u(){return clearTimeout(n),n=setTimeout(o,150)}window.addEventListener("pageshow",(function(e){return e.persisted&&u()})),window.addEventListener("resize",u),o()},"./src/www/v1/app.ts":function(e,t,n){"use strict";n.r(t);var r,o=n.p+"click-dbdc122add.wav",u=(r=null,function(e){return null===r&&(r=e),r===e}),i=function(e){if(u(e)){var t=document.getElementById("click-wav");t||((t=document.createElement("audio")).setAttribute("src",o),t.id="click-wav",document.body.appendChild(t)),t.play()}},M=i.bind(null,"mousedown"),a=i.bind(null,"touchstart");document.body.addEventListener("mousedown",M),document.body.addEventListener("touchstart",a),window.addEventListener("beforeunload",(function(){document.body.removeEventListener("mousedown",M),document.body.removeEventListener("touchstart",a)}));var c=n("./node_modules/@babel/runtime/helpers/slicedToArray.js"),s=n.n(c);var l={"is-it-time-to-show":function(e){var t,n;null===(t=(n=e.source)instanceof MessagePort?null:n)||void 0===t||t.postMessage("show-time ".concat(e.data.split(" ")[1]),"*")},"please-open-in-new-tab":function(e){var t=e.data.split(" "),n=s()(t,2)[1],r=n.split(":"),o=s()(r,2),u=o[0],i=o[1];switch(u){case"post":window.open("".concat(location.pathname,"#/post/").concat(i),"_blank");break;default:window.open(n,"_blank")}}},N=function(e){if("string"==typeof e.data){var t=e.data.split(" "),n=s()(t,1)[0];l[n]&&l[n](e)}};window.addEventListener("message",N,!1),window.addEventListener("beforeunload",(function(){window.removeEventListener("message",N)}));var j=document.createElement("link");j.rel="shortcut icon",j.type="image/x-icon",j.href="data:image/svg+xml;base64,PHN2ZyB0PSIxNTk2MTc2NzMyMzY4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwODIgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwMjciPjxwYXRoIGQ9Ik04NzcuNzE0Mjg2IDEwMjRIMjA0LjhBMjA0LjggMjA0LjggMCAwIDEgMCA4MTkuMlY0MjQuMjI4NTcxYTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEgMjkuMjU3MTQzLTI5LjI1NzE0MmgxMDI0YTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEgMjkuMjU3MTQzIDI5LjI1NzE0MnYzOTQuOTcxNDI5YTIwNC44IDIwNC44IDAgMCAxLTIwNC44IDIwNC44ek01OC41MTQyODYgNDUzLjQ4NTcxNHYzNjUuNzE0Mjg2YTE0Ni4yODU3MTQgMTQ2LjI4NTcxNCAwIDAgMCAxNDYuMjg1NzE0IDE0Ni4yODU3MTRoNjcyLjkxNDI4NmExNDYuMjg1NzE0IDE0Ni4yODU3MTQgMCAwIDAgMTQ2LjI4NTcxNC0xNDYuMjg1NzE0VjQ1My40ODU3MTR6IiBmaWxsPSIjMTI5NmRiIiBwLWlkPSIyMDI4Ij48L3BhdGg+PHBhdGggZD0iTTMyMS44Mjg1NzEgNDUzLjQ4NTcxNEgxNDYuMjg1NzE0YTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEtMjkuMjU3MTQzLTI5LjI1NzE0M1YyOS4yNTcxNDNhMjkuMjU3MTQzIDI5LjI1NzE0MyAwIDAgMSAyOS4yNTcxNDMtMjkuMjU3MTQzaDE3NS41NDI4NTdhMjkuMjU3MTQzIDI5LjI1NzE0MyAwIDAgMSAyOS4yNTcxNDMgMjkuMjU3MTQzdjM5NC45NzE0MjhhMjkuMjU3MTQzIDI5LjI1NzE0MyAwIDAgMS0yOS4yNTcxNDMgMjkuMjU3MTQzeiBtLTE0Ni4yODU3MTQtNTguNTE0Mjg1aDExNy4wMjg1NzJWNTguNTE0Mjg2aC0xMTcuMDI4NTcyek05NTAuODU3MTQzIDQ1My40ODU3MTRINzc1LjMxNDI4NmEyOS4yNTcxNDMgMjkuMjU3MTQzIDAgMCAxLTI5LjI1NzE0My0yOS4yNTcxNDNWMjkuMjU3MTQzYTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEgMjkuMjU3MTQzLTI5LjI1NzE0M2gxNzUuNTQyODU3YTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEgMjkuMjU3MTQzIDI5LjI1NzE0M3YzOTQuOTcxNDI4YTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEtMjkuMjU3MTQzIDI5LjI1NzE0M3ogbS0xNDYuMjg1NzE0LTU4LjUxNDI4NWgxMTcuMDI4NTcxVjU4LjUxNDI4NmgtMTE3LjAyODU3MXpNNDcxLjA0IDQzOC44NTcxNDNhMjkuMjU3MTQzIDI5LjI1NzE0MyAwIDAgMS0yOC4yMzMxNDMtMjEuNjUwMjg2TDM1Ni43OTA4NTcgOTYuMjU2YTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEgMjAuNjI2Mjg2LTM1Ljg0TDU0Ny4xMDg1NzEgMTQuNjI4NTcxYTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEgMzUuNjkzNzE1IDIwLjYyNjI4Nmw5NC4zNTQyODUgMzUxLjA4NTcxNGEyOS4yNTcxNDMgMjkuMjU3MTQzIDAgMCAxLTU2LjYxMjU3MSAxNC42Mjg1NzJsLTg2LjYwMTE0My0zMjEuODI4NTcyLTExMy4wNzg4NTcgMzAuMjgxMTQzIDc4LjQwOTE0MyAyOTIuNTcxNDI5YTI5LjI1NzE0MyAyOS4yNTcxNDMgMCAwIDEtMjAuNjI2Mjg2IDM1Ljg0IDI3Ljk0MDU3MSAyNy45NDA1NzEgMCAwIDEtNy42MDY4NTcgMS4wMjR6IiBmaWxsPSIjMTI5NmRiIiBwLWlkPSIyMDI5Ij48L3BhdGg+PC9zdmc+",document.head.appendChild(j);n("./src/www/utils/rem.ts");Promise.all([n.e(1),n.e(5),n.e(3),n.e(4),n.e(2)]).then(n.bind(null,"./src/www/v1/index.tsx"))}});