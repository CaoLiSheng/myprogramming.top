(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"./node_modules/process/browser.js":function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(t){r=a}}();var u,c=[],f=!1,p=-1;function l(){f&&u&&(f=!1,u.length?c=u.concat(c):p=-1,c.length&&h())}function h(){if(!f){var t=s(l);f=!0;for(var e=c.length;e;){for(u=c,c=[];++p<e;)u&&u[p].run();p=-1,e=c.length}u=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function v(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new d(t,e)),1!==c.length||f||s(h)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},"./node_modules/setimmediate/setImmediate.js":function(t,e,n){(function(t,e){!function(t,n){"use strict";if(!t.setImmediate){var r,o,i,a,s,u=1,c={},f=!1,p=t.document,l=Object.getPrototypeOf&&Object.getPrototypeOf(t);l=l&&l.setTimeout?l:t,"[object process]"==={}.toString.call(t.process)?r=function(t){e.nextTick((function(){d(t)}))}:!function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?t.MessageChannel?((i=new MessageChannel).port1.onmessage=function(t){d(t.data)},r=function(t){i.port2.postMessage(t)}):p&&"onreadystatechange"in p.createElement("script")?(o=p.documentElement,r=function(t){var e=p.createElement("script");e.onreadystatechange=function(){d(t),e.onreadystatechange=null,o.removeChild(e),e=null},o.appendChild(e)}):r=function(t){setTimeout(d,0,t)}:(a="setImmediate$"+Math.random()+"$",s=function(e){e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(a)&&d(+e.data.slice(a.length))},t.addEventListener?t.addEventListener("message",s,!1):t.attachEvent("onmessage",s),r=function(e){t.postMessage(a+e,"*")}),l.setImmediate=function(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return c[u]=o,r(u),u++},l.clearImmediate=h}function h(t){delete c[t]}function d(t){if(f)setTimeout(d,0,t);else{var e=c[t];if(e){f=!0;try{!function(t){var e=t.callback,n=t.args;switch(n.length){case 0:e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1]);break;case 3:e(n[0],n[1],n[2]);break;default:e.apply(void 0,n)}}(e)}finally{h(t),f=!1}}}}}("undefined"==typeof self?void 0===t?this:t:self)}).call(this,n("./node_modules/webpack/buildin/global.js"),n("./node_modules/process/browser.js"))},"./node_modules/timers-browserify/main.js":function(t,e,n){(function(t){var r=void 0!==t&&t||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},e.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout((function(){t._onTimeout&&t._onTimeout()}),e))},n("./node_modules/setimmediate/setImmediate.js"),e.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==t&&t.clearImmediate||this&&this.clearImmediate}).call(this,n("./node_modules/webpack/buildin/global.js"))},"./node_modules/vue-loader/lib/runtime/componentNormalizer.js":function(t,e,n){"use strict";function r(t,e,n,r,o,i,a,s){var u,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),a?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=u):o&&(u=s?function(){o.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:o),u)if(c.functional){c._injectStyles=u;var f=c.render;c.render=function(t,e){return u.call(e),f(t,e)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,u):[u]}return{exports:t,options:c}}n.d(e,"a",(function(){return r}))},"./node_modules/webpack/buildin/global.js":function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},"./src/www/vue/app.ts":function(t,e,n){"use strict";n.r(e);var r=n("./node_modules/vue/dist/vue.runtime.esm.js"),o={data:()=>({data:""})},i=n("./node_modules/vue-loader/lib/runtime/componentNormalizer.js"),a=Object(i.a)(o,(function(){var t=this.$createElement;return(this._self._c||t)("router-view")}),[],!1,null,null,null).exports;function s(t,e){for(var n in e)t[n]=e[n];return t}var u=/[!'()*]/g,c=function(t){return"%"+t.charCodeAt(0).toString(16)},f=/%2C/g,p=function(t){return encodeURIComponent(t).replace(u,c).replace(f,",")};function l(t){try{return decodeURIComponent(t)}catch(t){0}return t}var h=function(t){return null==t||"object"==typeof t?t:String(t)};function d(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach((function(t){var n=t.replace(/\+/g," ").split("="),r=l(n.shift()),o=n.length>0?l(n.join("=")):null;void 0===e[r]?e[r]=o:Array.isArray(e[r])?e[r].push(o):e[r]=[e[r],o]})),e):e}function v(t){var e=t?Object.keys(t).map((function(e){var n=t[e];if(void 0===n)return"";if(null===n)return p(e);if(Array.isArray(n)){var r=[];return n.forEach((function(t){void 0!==t&&(null===t?r.push(p(e)):r.push(p(e)+"="+p(t)))})),r.join("&")}return p(e)+"="+p(n)})).filter((function(t){return t.length>0})).join("&"):null;return e?"?"+e:""}var m=/\/?$/;function y(t,e,n,r){var o=r&&r.options.stringifyQuery,i=e.query||{};try{i=g(i)}catch(t){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:i,params:e.params||{},fullPath:_(e,o),matched:t?b(t):[]};return n&&(a.redirectedFrom=_(n,o)),Object.freeze(a)}function g(t){if(Array.isArray(t))return t.map(g);if(t&&"object"==typeof t){var e={};for(var n in t)e[n]=g(t[n]);return e}return t}var w=y(null,{path:"/"});function b(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function _(t,e){var n=t.path,r=t.query;void 0===r&&(r={});var o=t.hash;return void 0===o&&(o=""),(n||"/")+(e||v)(r)+o}function x(t,e){return e===w?t===e:!!e&&(t.path&&e.path?t.path.replace(m,"")===e.path.replace(m,"")&&t.hash===e.hash&&k(t.query,e.query):!(!t.name||!e.name)&&(t.name===e.name&&t.hash===e.hash&&k(t.query,e.query)&&k(t.params,e.params)))}function k(t,e){if(void 0===t&&(t={}),void 0===e&&(e={}),!t||!e)return t===e;var n=Object.keys(t),r=Object.keys(e);return n.length===r.length&&n.every((function(n){var r=t[n],o=e[n];return null==r||null==o?r===o:"object"==typeof r&&"object"==typeof o?k(r,o):String(r)===String(o)}))}function T(t){for(var e=0;e<t.matched.length;e++){var n=t.matched[e];for(var r in n.instances){var o=n.instances[r],i=n.enteredCbs[r];if(o&&i){delete n.enteredCbs[r];for(var a=0;a<i.length;a++)o._isBeingDestroyed||i[a](o)}}}}var E={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(t,e){var n=e.props,r=e.children,o=e.parent,i=e.data;i.routerView=!0;for(var a=o.$createElement,u=n.name,c=o.$route,f=o._routerViewCache||(o._routerViewCache={}),p=0,l=!1;o&&o._routerRoot!==o;){var h=o.$vnode?o.$vnode.data:{};h.routerView&&p++,h.keepAlive&&o._directInactive&&o._inactive&&(l=!0),o=o.$parent}if(i.routerViewDepth=p,l){var d=f[u],v=d&&d.component;return v?(d.configProps&&R(v,i,d.route,d.configProps),a(v,i,r)):a()}var m=c.matched[p],y=m&&m.components[u];if(!m||!y)return f[u]=null,a();f[u]={component:y},i.registerRouteInstance=function(t,e){var n=m.instances[u];(e&&n!==t||!e&&n===t)&&(m.instances[u]=e)},(i.hook||(i.hook={})).prepatch=function(t,e){m.instances[u]=e.componentInstance},i.hook.init=function(t){t.data.keepAlive&&t.componentInstance&&t.componentInstance!==m.instances[u]&&(m.instances[u]=t.componentInstance),T(c)};var g=m.props&&m.props[u];return g&&(s(f[u],{route:c,configProps:g}),R(y,i,c,g)),a(y,i,r)}};function R(t,e,n,r){var o=e.props=function(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0;default:0}}(n,r);if(o){o=e.props=s({},o);var i=e.attrs=e.attrs||{};for(var a in o)t.props&&a in t.props||(i[a]=o[a],delete o[a])}}function C(t,e,n){var r=t.charAt(0);if("/"===r)return t;if("?"===r||"#"===r)return e+t;var o=e.split("/");n&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var s=i[a];".."===s?o.pop():"."!==s&&o.push(s)}return""!==o[0]&&o.unshift(""),o.join("/")}function j(t){return t.replace(/\/\//g,"/")}var O=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},A=z,S=q,$=function(t,e){return U(q(t,e),e)},L=U,I=H,P=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function q(t,e){for(var n,r=[],o=0,i=0,a="",s=e&&e.delimiter||"/";null!=(n=P.exec(t));){var u=n[0],c=n[1],f=n.index;if(a+=t.slice(i,f),i=f+u.length,c)a+=c[1];else{var p=t[i],l=n[2],h=n[3],d=n[4],v=n[5],m=n[6],y=n[7];a&&(r.push(a),a="");var g=null!=l&&null!=p&&p!==l,w="+"===m||"*"===m,b="?"===m||"*"===m,_=n[2]||s,x=d||v;r.push({name:h||o++,prefix:l||"",delimiter:_,optional:b,repeat:w,partial:g,asterisk:!!y,pattern:x?V(x):y?".*":"[^"+F(_)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&r.push(a),r}function M(t){return encodeURI(t).replace(/[\/?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}))}function U(t,e){for(var n=new Array(t.length),r=0;r<t.length;r++)"object"==typeof t[r]&&(n[r]=new RegExp("^(?:"+t[r].pattern+")$",B(e)));return function(e,r){for(var o="",i=e||{},a=(r||{}).pretty?M:encodeURIComponent,s=0;s<t.length;s++){var u=t[s];if("string"!=typeof u){var c,f=i[u.name];if(null==f){if(u.optional){u.partial&&(o+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(O(f)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(f)+"`");if(0===f.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var p=0;p<f.length;p++){if(c=a(f[p]),!n[s].test(c))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(c)+"`");o+=(0===p?u.prefix:u.delimiter)+c}}else{if(c=u.asterisk?encodeURI(f).replace(/[?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})):a(f),!n[s].test(c))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+c+'"');o+=u.prefix+c}}else o+=u}return o}}function F(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function V(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function N(t,e){return t.keys=e,t}function B(t){return t&&t.sensitive?"":"i"}function H(t,e,n){O(e)||(n=e||n,e=[]);for(var r=(n=n||{}).strict,o=!1!==n.end,i="",a=0;a<t.length;a++){var s=t[a];if("string"==typeof s)i+=F(s);else{var u=F(s.prefix),c="(?:"+s.pattern+")";e.push(s),s.repeat&&(c+="(?:"+u+c+")*"),i+=c=s.optional?s.partial?u+"("+c+")?":"(?:"+u+"("+c+"))?":u+"("+c+")"}}var f=F(n.delimiter||"/"),p=i.slice(-f.length)===f;return r||(i=(p?i.slice(0,-f.length):i)+"(?:"+f+"(?=$))?"),i+=o?"$":r&&p?"":"(?="+f+"|$)",N(new RegExp("^"+i,B(n)),e)}function z(t,e,n){return O(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?function(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return N(t,e)}(t,e):O(t)?function(t,e,n){for(var r=[],o=0;o<t.length;o++)r.push(z(t[o],e,n).source);return N(new RegExp("(?:"+r.join("|")+")",B(n)),e)}(t,e,n):function(t,e,n){return H(q(t,n),e,n)}(t,e,n)}A.parse=S,A.compile=$,A.tokensToFunction=L,A.tokensToRegExp=I;var D=Object.create(null);function J(t,e,n){e=e||{};try{var r=D[t]||(D[t]=A.compile(t));return"string"==typeof e.pathMatch&&(e[0]=e.pathMatch),r(e,{pretty:!0})}catch(t){return""}finally{delete e[0]}}function K(t,e,n,r){var o="string"==typeof t?{path:t}:t;if(o._normalized)return o;if(o.name){var i=(o=s({},t)).params;return i&&"object"==typeof i&&(o.params=s({},i)),o}if(!o.path&&o.params&&e){(o=s({},o))._normalized=!0;var a=s(s({},e.params),o.params);if(e.name)o.name=e.name,o.params=a;else if(e.matched.length){var u=e.matched[e.matched.length-1].path;o.path=J(u,a,e.path)}else 0;return o}var c=function(t){var e="",n="",r=t.indexOf("#");r>=0&&(e=t.slice(r),t=t.slice(0,r));var o=t.indexOf("?");return o>=0&&(n=t.slice(o+1),t=t.slice(0,o)),{path:t,query:n,hash:e}}(o.path||""),f=e&&e.path||"/",p=c.path?C(c.path,f,n||o.append):f,l=function(t,e,n){void 0===e&&(e={});var r,o=n||d;try{r=o(t||"")}catch(t){r={}}for(var i in e){var a=e[i];r[i]=Array.isArray(a)?a.map(h):h(a)}return r}(c.query,o.query,r&&r.options.parseQuery),v=o.hash||c.hash;return v&&"#"!==v.charAt(0)&&(v="#"+v),{_normalized:!0,path:p,query:l,hash:v}}var X,Q=function(){},Y={name:"RouterLink",props:{to:{type:[String,Object],required:!0},tag:{type:String,default:"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:[String,Array],default:"click"}},render:function(t){var e=this,n=this.$router,r=this.$route,o=n.resolve(this.to,r,this.append),i=o.location,a=o.route,u=o.href,c={},f=n.options.linkActiveClass,p=n.options.linkExactActiveClass,l=null==f?"router-link-active":f,h=null==p?"router-link-exact-active":p,d=null==this.activeClass?l:this.activeClass,v=null==this.exactActiveClass?h:this.exactActiveClass,g=a.redirectedFrom?y(null,K(a.redirectedFrom),null,n):a;c[v]=x(r,g),c[d]=this.exact?c[v]:function(t,e){return 0===t.path.replace(m,"/").indexOf(e.path.replace(m,"/"))&&(!e.hash||t.hash===e.hash)&&function(t,e){for(var n in e)if(!(n in t))return!1;return!0}(t.query,e.query)}(r,g);var w=c[v]?this.ariaCurrentValue:null,b=function(t){W(t)&&(e.replace?n.replace(i,Q):n.push(i,Q))},_={click:W};Array.isArray(this.event)?this.event.forEach((function(t){_[t]=b})):_[this.event]=b;var k={class:c},T=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:u,route:a,navigate:b,isActive:c[d],isExactActive:c[v]});if(T){if(1===T.length)return T[0];if(T.length>1||!T.length)return 0===T.length?t():t("span",{},T)}if("a"===this.tag)k.on=_,k.attrs={href:u,"aria-current":w};else{var E=function t(e){var n;if(e)for(var r=0;r<e.length;r++){if("a"===(n=e[r]).tag)return n;if(n.children&&(n=t(n.children)))return n}}(this.$slots.default);if(E){E.isStatic=!1;var R=E.data=s({},E.data);for(var C in R.on=R.on||{},R.on){var j=R.on[C];C in _&&(R.on[C]=Array.isArray(j)?j:[j])}for(var O in _)O in R.on?R.on[O].push(_[O]):R.on[O]=b;var A=E.data.attrs=s({},E.data.attrs);A.href=u,A["aria-current"]=w}else k.on=_}return t(this.tag,k,this.$slots.default)}};function W(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}var G="undefined"!=typeof window;function Z(t,e,n,r){var o=e||[],i=n||Object.create(null),a=r||Object.create(null);t.forEach((function(t){!function t(e,n,r,o,i,a){var s=o.path,u=o.name;0;var c=o.pathToRegexpOptions||{},f=function(t,e,n){n||(t=t.replace(/\/$/,""));if("/"===t[0])return t;if(null==e)return t;return j(e.path+"/"+t)}(s,i,c.strict);"boolean"==typeof o.caseSensitive&&(c.sensitive=o.caseSensitive);var p={path:f,regex:tt(f,c),components:o.components||{default:o.component},instances:{},enteredCbs:{},name:u,parent:i,matchAs:a,redirect:o.redirect,beforeEnter:o.beforeEnter,meta:o.meta||{},props:null==o.props?{}:o.components?o.props:{default:o.props}};o.children&&o.children.forEach((function(o){var i=a?j(a+"/"+o.path):void 0;t(e,n,r,o,p,i)}));n[p.path]||(e.push(p.path),n[p.path]=p);if(void 0!==o.alias)for(var l=Array.isArray(o.alias)?o.alias:[o.alias],h=0;h<l.length;++h){0;var d={path:l[h],children:o.children};t(e,n,r,d,i,p.path||"/")}u&&(r[u]||(r[u]=p))}(o,i,a,t)}));for(var s=0,u=o.length;s<u;s++)"*"===o[s]&&(o.push(o.splice(s,1)[0]),u--,s--);return{pathList:o,pathMap:i,nameMap:a}}function tt(t,e){return A(t,[],e)}function et(t,e){var n=Z(t),r=n.pathList,o=n.pathMap,i=n.nameMap;function a(t,n,a){var s=K(t,n,!1,e),c=s.name;if(c){var f=i[c];if(!f)return u(null,s);var p=f.regex.keys.filter((function(t){return!t.optional})).map((function(t){return t.name}));if("object"!=typeof s.params&&(s.params={}),n&&"object"==typeof n.params)for(var l in n.params)!(l in s.params)&&p.indexOf(l)>-1&&(s.params[l]=n.params[l]);return s.path=J(f.path,s.params),u(f,s,a)}if(s.path){s.params={};for(var h=0;h<r.length;h++){var d=r[h],v=o[d];if(nt(v.regex,s.path,s.params))return u(v,s,a)}}return u(null,s)}function s(t,n){var r=t.redirect,o="function"==typeof r?r(y(t,n,null,e)):r;if("string"==typeof o&&(o={path:o}),!o||"object"!=typeof o)return u(null,n);var s=o,c=s.name,f=s.path,p=n.query,l=n.hash,h=n.params;if(p=s.hasOwnProperty("query")?s.query:p,l=s.hasOwnProperty("hash")?s.hash:l,h=s.hasOwnProperty("params")?s.params:h,c){i[c];return a({_normalized:!0,name:c,query:p,hash:l,params:h},void 0,n)}if(f){var d=function(t,e){return C(t,e.parent?e.parent.path:"/",!0)}(f,t);return a({_normalized:!0,path:J(d,h),query:p,hash:l},void 0,n)}return u(null,n)}function u(t,n,r){return t&&t.redirect?s(t,r||n):t&&t.matchAs?function(t,e,n){var r=a({_normalized:!0,path:J(n,e.params)});if(r){var o=r.matched,i=o[o.length-1];return e.params=r.params,u(i,e)}return u(null,e)}(0,n,t.matchAs):y(t,n,r,e)}return{match:a,addRoutes:function(t){Z(t,r,o,i)}}}function nt(t,e,n){var r;try{r=decodeURI(e).match(t)}catch(t){0}if(!r)return!1;if(!n)return!0;for(var o=1,i=r.length;o<i;++o){var a=t.keys[o-1];a&&(n[a.name||"pathMatch"]=r[o])}return!0}var rt=G&&window.performance&&window.performance.now?window.performance:Date;function ot(){return rt.now().toFixed(3)}var it=ot();function at(){return it}function st(t){return it=t}var ut=Object.create(null);function ct(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),n=s({},window.history.state);return n.key=at(),window.history.replaceState(n,"",e),window.addEventListener("popstate",lt),function(){window.removeEventListener("popstate",lt)}}function ft(t,e,n,r){if(t.app){var o=t.options.scrollBehavior;o&&t.app.$nextTick((function(){var i=function(){var t=at();if(t)return ut[t]}(),a=o.call(t,e,n,r?i:null);a&&("function"==typeof a.then?a.then((function(t){yt(t,i)})).catch((function(t){0})):yt(a,i))}))}}function pt(){var t=at();t&&(ut[t]={x:window.pageXOffset,y:window.pageYOffset})}function lt(t){pt(),t.state&&t.state.key&&st(t.state.key)}function ht(t){return vt(t.x)||vt(t.y)}function dt(t){return{x:vt(t.x)?t.x:window.pageXOffset,y:vt(t.y)?t.y:window.pageYOffset}}function vt(t){return"number"==typeof t}var mt=/^#\d/;function yt(t,e){var n,r="object"==typeof t;if(r&&"string"==typeof t.selector){var o=mt.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(o){var i=t.offset&&"object"==typeof t.offset?t.offset:{};e=function(t,e){var n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{x:r.left-n.left-e.x,y:r.top-n.top-e.y}}(o,i={x:vt((n=i).x)?n.x:0,y:vt(n.y)?n.y:0})}else ht(t)&&(e=dt(t))}else r&&ht(t)&&(e=dt(t));e&&window.scrollTo(e.x,e.y)}var gt,wt=G&&((-1===(gt=window.navigator.userAgent).indexOf("Android 2.")&&-1===gt.indexOf("Android 4.0")||-1===gt.indexOf("Mobile Safari")||-1!==gt.indexOf("Chrome")||-1!==gt.indexOf("Windows Phone"))&&window.history&&"function"==typeof window.history.pushState);function bt(t,e){pt();var n=window.history;try{if(e){var r=s({},n.state);r.key=at(),n.replaceState(r,"",t)}else n.pushState({key:st(ot())},"",t)}catch(n){window.location[e?"replace":"assign"](t)}}function _t(t){bt(t,!0)}function xt(t,e,n){var r=function(o){o>=t.length?n():t[o]?e(t[o],(function(){r(o+1)})):r(o+1)};r(0)}var kt={redirected:2,aborted:4,cancelled:8,duplicated:16};function Tt(t,e){return Rt(t,e,kt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+function(t){if("string"==typeof t)return t;if("path"in t)return t.path;var e={};return Ct.forEach((function(n){n in t&&(e[n]=t[n])})),JSON.stringify(e,null,2)}(e)+'" via a navigation guard.')}function Et(t,e){return Rt(t,e,kt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function Rt(t,e,n,r){var o=new Error(r);return o._isRouter=!0,o.from=t,o.to=e,o.type=n,o}var Ct=["params","query","hash"];function jt(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function Ot(t,e){return jt(t)&&t._isRouter&&(null==e||t.type===e)}function At(t){return function(e,n,r){var o=!1,i=0,a=null;St(t,(function(t,e,n,s){if("function"==typeof t&&void 0===t.cid){o=!0,i++;var u,c=It((function(e){var o;((o=e).__esModule||Lt&&"Module"===o[Symbol.toStringTag])&&(e=e.default),t.resolved="function"==typeof e?e:X.extend(e),n.components[s]=e,--i<=0&&r()})),f=It((function(t){var e="Failed to resolve async component "+s+": "+t;a||(a=jt(t)?t:new Error(e),r(a))}));try{u=t(c,f)}catch(t){f(t)}if(u)if("function"==typeof u.then)u.then(c,f);else{var p=u.component;p&&"function"==typeof p.then&&p.then(c,f)}}})),o||r()}}function St(t,e){return $t(t.map((function(t){return Object.keys(t.components).map((function(n){return e(t.components[n],t.instances[n],t,n)}))})))}function $t(t){return Array.prototype.concat.apply([],t)}var Lt="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;function It(t){var e=!1;return function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];if(!e)return e=!0,t.apply(this,n)}}var Pt=function(t,e){this.router=t,this.base=function(t){if(!t)if(G){var e=document.querySelector("base");t=(t=e&&e.getAttribute("href")||"/").replace(/^https?:\/\/[^\/]+/,"")}else t="/";"/"!==t.charAt(0)&&(t="/"+t);return t.replace(/\/$/,"")}(e),this.current=w,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};function qt(t,e,n,r){var o=St(t,(function(t,r,o,i){var a=function(t,e){"function"!=typeof t&&(t=X.extend(t));return t.options[e]}(t,e);if(a)return Array.isArray(a)?a.map((function(t){return n(t,r,o,i)})):n(a,r,o,i)}));return $t(r?o.reverse():o)}function Mt(t,e){if(e)return function(){return t.apply(e,arguments)}}Pt.prototype.listen=function(t){this.cb=t},Pt.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},Pt.prototype.onError=function(t){this.errorCbs.push(t)},Pt.prototype.transitionTo=function(t,e,n){var r,o=this;try{r=this.router.match(t,this.current)}catch(t){throw this.errorCbs.forEach((function(e){e(t)})),t}var i=this.current;this.confirmTransition(r,(function(){o.updateRoute(r),e&&e(r),o.ensureURL(),o.router.afterHooks.forEach((function(t){t&&t(r,i)})),o.ready||(o.ready=!0,o.readyCbs.forEach((function(t){t(r)})))}),(function(t){n&&n(t),t&&!o.ready&&(Ot(t,kt.redirected)&&i===w||(o.ready=!0,o.readyErrorCbs.forEach((function(e){e(t)}))))}))},Pt.prototype.confirmTransition=function(t,e,n){var r=this,o=this.current;this.pending=t;var i,a,s=function(t){!Ot(t)&&jt(t)&&(r.errorCbs.length?r.errorCbs.forEach((function(e){e(t)})):console.error(t)),n&&n(t)},u=t.matched.length-1,c=o.matched.length-1;if(x(t,o)&&u===c&&t.matched[u]===o.matched[c])return this.ensureURL(),s(((a=Rt(i=o,t,kt.duplicated,'Avoided redundant navigation to current location: "'+i.fullPath+'".')).name="NavigationDuplicated",a));var f=function(t,e){var n,r=Math.max(t.length,e.length);for(n=0;n<r&&t[n]===e[n];n++);return{updated:e.slice(0,n),activated:e.slice(n),deactivated:t.slice(n)}}(this.current.matched,t.matched),p=f.updated,l=f.deactivated,h=f.activated,d=[].concat(function(t){return qt(t,"beforeRouteLeave",Mt,!0)}(l),this.router.beforeHooks,function(t){return qt(t,"beforeRouteUpdate",Mt)}(p),h.map((function(t){return t.beforeEnter})),At(h)),v=function(e,n){if(r.pending!==t)return s(Et(o,t));try{e(t,o,(function(e){!1===e?(r.ensureURL(!0),s(function(t,e){return Rt(t,e,kt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}(o,t))):jt(e)?(r.ensureURL(!0),s(e)):"string"==typeof e||"object"==typeof e&&("string"==typeof e.path||"string"==typeof e.name)?(s(Tt(o,t)),"object"==typeof e&&e.replace?r.replace(e):r.push(e)):n(e)}))}catch(t){s(t)}};xt(d,v,(function(){xt(function(t){return qt(t,"beforeRouteEnter",(function(t,e,n,r){return function(t,e,n){return function(r,o,i){return t(r,o,(function(t){"function"==typeof t&&(e.enteredCbs[n]||(e.enteredCbs[n]=[]),e.enteredCbs[n].push(t)),i(t)}))}}(t,n,r)}))}(h).concat(r.router.resolveHooks),v,(function(){if(r.pending!==t)return s(Et(o,t));r.pending=null,e(t),r.router.app&&r.router.app.$nextTick((function(){T(t)}))}))}))},Pt.prototype.updateRoute=function(t){this.current=t,this.cb&&this.cb(t)},Pt.prototype.setupListeners=function(){},Pt.prototype.teardown=function(){this.listeners.forEach((function(t){t()})),this.listeners=[],this.current=w,this.pending=null};var Ut=function(t){function e(e,n){t.call(this,e,n),this._startLocation=Ft(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router,n=e.options.scrollBehavior,r=wt&&n;r&&this.listeners.push(ct());var o=function(){var n=t.current,o=Ft(t.base);t.current===w&&o===t._startLocation||t.transitionTo(o,(function(t){r&&ft(e,t,n,!0)}))};window.addEventListener("popstate",o),this.listeners.push((function(){window.removeEventListener("popstate",o)}))}},e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,n){var r=this,o=this.current;this.transitionTo(t,(function(t){bt(j(r.base+t.fullPath)),ft(r.router,t,o,!1),e&&e(t)}),n)},e.prototype.replace=function(t,e,n){var r=this,o=this.current;this.transitionTo(t,(function(t){_t(j(r.base+t.fullPath)),ft(r.router,t,o,!1),e&&e(t)}),n)},e.prototype.ensureURL=function(t){if(Ft(this.base)!==this.current.fullPath){var e=j(this.base+this.current.fullPath);t?bt(e):_t(e)}},e.prototype.getCurrentLocation=function(){return Ft(this.base)},e}(Pt);function Ft(t){var e=window.location.pathname;return t&&0===e.toLowerCase().indexOf(t.toLowerCase())&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Vt=function(t){function e(e,n,r){t.call(this,e,n),r&&function(t){var e=Ft(t);if(!/^\/#/.test(e))return window.location.replace(j(t+"/#"+e)),!0}(this.base)||Nt()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router.options.scrollBehavior,n=wt&&e;n&&this.listeners.push(ct());var r=function(){var e=t.current;Nt()&&t.transitionTo(Bt(),(function(r){n&&ft(t.router,r,e,!0),wt||Dt(r.fullPath)}))},o=wt?"popstate":"hashchange";window.addEventListener(o,r),this.listeners.push((function(){window.removeEventListener(o,r)}))}},e.prototype.push=function(t,e,n){var r=this,o=this.current;this.transitionTo(t,(function(t){zt(t.fullPath),ft(r.router,t,o,!1),e&&e(t)}),n)},e.prototype.replace=function(t,e,n){var r=this,o=this.current;this.transitionTo(t,(function(t){Dt(t.fullPath),ft(r.router,t,o,!1),e&&e(t)}),n)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;Bt()!==e&&(t?zt(e):Dt(e))},e.prototype.getCurrentLocation=function(){return Bt()},e}(Pt);function Nt(){var t=Bt();return"/"===t.charAt(0)||(Dt("/"+t),!1)}function Bt(){var t=window.location.href,e=t.indexOf("#");return e<0?"":t=t.slice(e+1)}function Ht(t){var e=window.location.href,n=e.indexOf("#");return(n>=0?e.slice(0,n):e)+"#"+t}function zt(t){wt?bt(Ht(t)):window.location.hash=t}function Dt(t){wt?_t(Ht(t)):window.location.replace(Ht(t))}var Jt=function(t){function e(e,n){t.call(this,e,n),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,n){var r=this;this.transitionTo(t,(function(t){r.stack=r.stack.slice(0,r.index+1).concat(t),r.index++,e&&e(t)}),n)},e.prototype.replace=function(t,e,n){var r=this;this.transitionTo(t,(function(t){r.stack=r.stack.slice(0,r.index).concat(t),e&&e(t)}),n)},e.prototype.go=function(t){var e=this,n=this.index+t;if(!(n<0||n>=this.stack.length)){var r=this.stack[n];this.confirmTransition(r,(function(){var t=e.current;e.index=n,e.updateRoute(r),e.router.afterHooks.forEach((function(e){e&&e(r,t)}))}),(function(t){Ot(t,kt.duplicated)&&(e.index=n)}))}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(Pt),Kt=function(t){void 0===t&&(t={}),this.app=null,this.apps=[],this.options=t,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=et(t.routes||[],this);var e=t.mode||"hash";switch(this.fallback="history"===e&&!wt&&!1!==t.fallback,this.fallback&&(e="hash"),G||(e="abstract"),this.mode=e,e){case"history":this.history=new Ut(this,t.base);break;case"hash":this.history=new Vt(this,t.base,this.fallback);break;case"abstract":this.history=new Jt(this,t.base);break;default:0}},Xt={currentRoute:{configurable:!0}};function Qt(t,e){return t.push(e),function(){var n=t.indexOf(e);n>-1&&t.splice(n,1)}}Kt.prototype.match=function(t,e,n){return this.matcher.match(t,e,n)},Xt.currentRoute.get=function(){return this.history&&this.history.current},Kt.prototype.init=function(t){var e=this;if(this.apps.push(t),t.$once("hook:destroyed",(function(){var n=e.apps.indexOf(t);n>-1&&e.apps.splice(n,1),e.app===t&&(e.app=e.apps[0]||null),e.app||e.history.teardown()})),!this.app){this.app=t;var n=this.history;if(n instanceof Ut||n instanceof Vt){var r=function(t){n.setupListeners(),function(t){var r=n.current,o=e.options.scrollBehavior;wt&&o&&"fullPath"in t&&ft(e,t,r,!1)}(t)};n.transitionTo(n.getCurrentLocation(),r,r)}n.listen((function(t){e.apps.forEach((function(e){e._route=t}))}))}},Kt.prototype.beforeEach=function(t){return Qt(this.beforeHooks,t)},Kt.prototype.beforeResolve=function(t){return Qt(this.resolveHooks,t)},Kt.prototype.afterEach=function(t){return Qt(this.afterHooks,t)},Kt.prototype.onReady=function(t,e){this.history.onReady(t,e)},Kt.prototype.onError=function(t){this.history.onError(t)},Kt.prototype.push=function(t,e,n){var r=this;if(!e&&!n&&"undefined"!=typeof Promise)return new Promise((function(e,n){r.history.push(t,e,n)}));this.history.push(t,e,n)},Kt.prototype.replace=function(t,e,n){var r=this;if(!e&&!n&&"undefined"!=typeof Promise)return new Promise((function(e,n){r.history.replace(t,e,n)}));this.history.replace(t,e,n)},Kt.prototype.go=function(t){this.history.go(t)},Kt.prototype.back=function(){this.go(-1)},Kt.prototype.forward=function(){this.go(1)},Kt.prototype.getMatchedComponents=function(t){var e=t?t.matched?t:this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map((function(t){return Object.keys(t.components).map((function(e){return t.components[e]}))}))):[]},Kt.prototype.resolve=function(t,e,n){var r=K(t,e=e||this.history.current,n,this),o=this.match(r,e),i=o.redirectedFrom||o.fullPath;return{location:r,route:o,href:function(t,e,n){var r="hash"===n?"#"+e:e;return t?j(t+"/"+r):r}(this.history.base,i,this.mode),normalizedTo:r,resolved:o}},Kt.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==w&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(Kt.prototype,Xt),Kt.install=function t(e){if(!t.installed||X!==e){t.installed=!0,X=e;var n=function(t){return void 0!==t},r=function(t,e){var r=t.$options._parentVnode;n(r)&&n(r=r.data)&&n(r=r.registerRouteInstance)&&r(t,e)};e.mixin({beforeCreate:function(){n(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),e.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,r(this,this)},destroyed:function(){r(this)}}),Object.defineProperty(e.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(e.prototype,"$route",{get:function(){return this._routerRoot._route}}),e.component("RouterView",E),e.component("RouterLink",Y);var o=e.config.optionMergeStrategies;o.beforeRouteEnter=o.beforeRouteLeave=o.beforeRouteUpdate=o.created}},Kt.version="3.4.6",Kt.isNavigationFailure=Ot,Kt.NavigationFailureType=kt,G&&window.Vue&&window.Vue.use(Kt);var Yt=Kt,Wt=[{path:"/",component:function(){return n.e(0).then(n.bind(null,"./src/www/vue/hello.vue"))},name:"HelloComponent"}];r.a.use(Yt);var Gt=new Yt({routes:Wt});new r.a({el:"#app",render:function(t){return t(a)},router:Gt})}}]);