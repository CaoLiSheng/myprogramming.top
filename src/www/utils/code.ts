/**
 * 查阅语言支持情况：https://github.com/googlearchive/code-prettify
 */

declare let __resources_dir__: string;

const codePrettyDir = 'pretty-code-resources/';
const cssFileName = 'prettify.css';
const jsFileName = 'prettify.js';

function injectPrettyCSS () {
  const link = document.createElement( 'link' );
  link.setAttribute( 'rel', 'stylesheet' );
  link.setAttribute( 'type', 'text/css' );
  link.setAttribute(
    'href',
    `${__resources_dir__}${codePrettyDir}${cssFileName}`,
  );
  document.head.append( link );
}

function injectPrettyScript (): HTMLScriptElement {
  const script = document.createElement( 'script' );
  script.setAttribute( 'type', 'text/javascript' );
  script.setAttribute(
    'src',
    `${__resources_dir__}${codePrettyDir}${jsFileName}`,
  );
  document.head.append( script );

  return script;
}

export default function init () {
  const preElems = document.querySelectorAll( '.markdown-body pre' );
  if ( preElems.length === 0 ) return;

  injectPrettyCSS();
  injectPrettyScript().addEventListener(
    'load',
    () => {
      preElems.forEach( ( preElem: Element ) => {
        preElem.classList.add( 'prettyprint' );
      } );
      window['PR'].prettyPrint();
    },
    false,
  );
}
