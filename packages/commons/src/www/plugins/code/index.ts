/**
 * 查阅语言支持情况：https://github.com/googlearchive/code-prettify
 */

import { injectJavaScripts, injectStyleSheetLinks } from "../../utils/dom";

declare let __resource_dir__: string;

const codePrettyDir = `${ __resource_dir__ }reserved/pretty-code/`;
const cssFileName = 'prettify.css';
const jsFileName = 'prettify.js';

export function initCodePlugin (): void {
  const preElems = document.querySelectorAll ( '.markdown-body pre' );
  if ( preElems.length === 0 ) return;

  void injectStyleSheetLinks ( `${ codePrettyDir }${ cssFileName }` );
  void injectJavaScripts ( `${ codePrettyDir }${ jsFileName }` )
    .then ( () => {
        preElems.forEach ( ( preElem: Element ) => {
          preElem.classList.add ( 'prettyprint' );
        } );
        window['PR'].prettyPrint ();
        return [];
    } );
}
