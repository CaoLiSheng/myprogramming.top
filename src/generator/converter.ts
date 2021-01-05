declare var __resources_dir__: string;

import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';

const md = MarkdownIt({ html: true });
const defualtName = '又心真人的博客';
const titleRE = /^(~)?(?::(.*?))?(?:=(\d[^-\s]*?)?-(\d[^-\s]*?)?(?:-(\d[^-\s]*?)?-(\d[^-\s]*?)?)?)?$/;

const defaultRender: Renderer.RenderRule = function(
  tokens,
  idx,
  options,
  env,
  self
) {
  const token = tokens[idx];
  const aIndex = token.attrIndex('src');
  const src = token.attrs?.[aIndex]?.[1];
  if (!src) return '';

  const bIndex = token.attrIndex('title');
  const title = token.attrs?.[bIndex]?.[1] || defualtName;
  const caption = token.content || defualtName;
  return `<figure>
  <img alt="${caption}" src="${__resources_dir__}${src}" title="${title}" />
  <figcaption>${caption}</figcaption>
  </figure>`;
};

md.renderer.rules.image = function(tokens, idx, options, env, self) {
  const token = tokens[idx];
  const aIndex = token.attrIndex('src');
  const src = token.attrs?.[aIndex]?.[1];
  if (!src) return '';

  const bIndex = token.attrIndex('title');
  const title = token.attrs?.[bIndex]?.[1];
  let matches;
  if (title && (matches = title.match(titleRE))) {
    const [flag, title, width, height, scorllX, scrollY] = matches.slice(1);
    const paddedSrc = `${__resources_dir__}${src}`;
    const caption = token.content || defualtName;
    const imgTitle = title || defualtName;

    if (flag) {
      return `<img alt="${caption}" src="${paddedSrc}" title="${imgTitle}" />`;
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

  return defaultRender(tokens, idx, options, env, self);
};

export const converter = md;
