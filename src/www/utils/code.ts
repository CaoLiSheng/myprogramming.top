/**
 * 查阅语言支持情况：https://github.com/googlearchive/code-prettify
 */

declare var __resources_dir__: string;
const codePrettyDir = 'pretty-code-resources/';
const cssFileName = 'prettify.css';
const jsFileName = 'prettify.js';

function injectPrettyCSS() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute(
    'href',
    `${__resources_dir__}${codePrettyDir}${cssFileName}`
  );
  document.head.appendChild(link);
}

function injectPrettyScript(): HTMLScriptElement {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute(
    'src',
    `${__resources_dir__}${codePrettyDir}${jsFileName}`
  );
  document.head.appendChild(script);

  return script;
}

export default function() {
  const preElems = document.querySelectorAll('.markdown-body pre');
  if (!preElems.length) return;

  injectPrettyCSS();
  injectPrettyScript().addEventListener(
    'load',
    () => {
      preElems.forEach((preElem: HTMLPreElement) => {
        preElem.classList.add('prettyprint');
      });
      window['PR'].prettyPrint();
    },
    false
  );
}
