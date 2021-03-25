import gridTableRulePlugin from '@mditgridtables/index';
import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';

declare let __resources_dir__: string;

const md = MarkdownIt( { html: true } )
  .use( require( 'markdown-it-named-headings' ) )
  .use( gridTableRulePlugin );

const defualtName = '又心真人的博客';
const titleRE = /^(~)?(?::(.*?))?(?:=(\d[^\s-]*?)?-(\d[^\s-]*?)?(?:-(\d[^\s-]*?)?-(\d[^\s-]*?)?)?)?$/;

const defaultRender: Renderer.RenderRule = function defaultRender (
  tokens,
  idx,
  options,
  env,
  self,
) {
  const token = tokens[idx];
  const aIndex = token.attrIndex( 'src' );
  const src = token.attrs?.[aIndex]?.[1];
  if ( !src ) return '';

  const bIndex = token.attrIndex( 'title' );
  const title = token.attrs?.[bIndex]?.[1] || defualtName;
  const caption = token.content || defualtName;
  return `<figure>
  <img alt="${caption}" src="${__resources_dir__}${src}" title="${title}" />
  <figcaption>${caption}</figcaption>
  </figure>`;
};

md.renderer.rules.image = function imageRule ( tokens, idx, options, env, self ) {
  const token = tokens[idx];
  const aIndex = token.attrIndex( 'src' );
  const src = token.attrs?.[aIndex]?.[1];
  if ( !src ) return '';

  const bIndex = token.attrIndex( 'title' );
  const title = token.attrs?.[bIndex]?.[1];
  const matches = title?.match( titleRE );
  if ( title && matches ) {
    const [ flag, imageTitle, width, height, scorllX, scrollY ] = matches.slice( 1 );
    const paddedSrc = `${__resources_dir__}${src}`;
    const caption = token.content || defualtName;
    const imgTitle = imageTitle || defualtName;

    if ( flag ) {
      return `<img alt="${caption}" src="${paddedSrc}" title="${imgTitle}"
              width="${width || 'auto'}" height="${height || 'auto'}" />`;
    }

    return `<figure>
      <div class="image" style="height: ${height || 'auto'};"
        data-scroll-x="${scorllX || 0}" data-scroll-y="${scrollY || 0}">
          <img alt="${caption}" src="${paddedSrc}" title="${imgTitle}"
            width="${width || 'auto'}" height="auto" />
        </div>
      <figcaption>${caption}</figcaption>
    </figure>`;
  }

  return defaultRender( tokens, idx, options, env, self );
};

md.renderer.rules.table_open = function tableOpen ( tokens, idx, options, env, self ) {
  return `<div class="table">${self.renderToken( tokens, idx, options )}`;
};

md.renderer.rules.table_close = function tableClose ( tokens, idx, options, env, self ) {
  return `${self.renderToken( tokens, idx, options )}</div>`;
};

export const converter = md;
