declare var __production__: boolean;

export function minify(content: string): string {
  // console.log(content);
  if (__production__) {
    return content
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n\s*?(\S)/g, ' $1')
      .trim();
  }
  return content;
}

function extractBlocks(content: string, re: RegExp): string[] {
  const blocks: string[] = [];
  let temp: RegExpExecArray | null;
  while ((temp = re.exec(content))) {
    blocks.push(temp[0]);
  }
  return blocks;
}

function mergeBlocks(content: string, re: RegExp, blocks: string[]): string {
  const otherBlocks: string[] = content.split(re);
  const ret: string[] = [];
  for (let i = 0; i < blocks.length; i++) {
    ret.push(otherBlocks[i], blocks[i]);
  }
  ret.push(otherBlocks[blocks.length]);
  return ret.join('');
}

function htmlBlocksChain(content: string, reS: RegExp[]): string {
  const blocksChain: string[][] = [];
  for (let i = 0; i < reS.length; i++) {
    blocksChain.push(extractBlocks(content, reS[i]));
  }

  let tempRet: string = minify(content);

  for (let i = 0; i < reS.length; i++) {
    tempRet = mergeBlocks(tempRet, reS[i], blocksChain[i]);
  }

  return tempRet;
}

export function htmlMinify(content: string): string {
  // console.log(content);
  if (__production__) {
    return htmlBlocksChain(content, [
      /<pre[\s\S]+?<\/pre>/g,
      /<textarea[\s\S]+?<\/textarea>/g,
    ]).replace(/>\s+</g, '><');
  }
  return content;
}
