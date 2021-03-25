declare let __production__: boolean;

export function minify ( content: string ): string {
  // console.log(content);
  if ( __production__ ) {
    return content
      .replace( /\/\*[\S\s]*?\*\//g, '' )
      .replace( /\n\s*?(\S)/g, ' $1' )
      .trim();
  }
  return content;
}

function extractBlocks ( content: string, re: RegExp ): string[] {
  const blocks: string[] = [];
  let temp: RegExpExecArray | null = re.exec( content );
  while ( temp ) {
    blocks.push( temp[0] );
    temp = re.exec( content );
  }
  return blocks;
}

function mergeBlocks ( content: string, re: RegExp, blocks: string[] ): string {
  const otherBlocks: string[] = content.split( re );
  const ret: string[] = [];
  for ( const [ i, block ] of blocks.entries() ) {
    ret.push( otherBlocks[i], block );
  }
  ret.push( otherBlocks[blocks.length] );
  return ret.join( '' );
}

function htmlBlocksChain ( content: string, reS: RegExp[] ): string {
  const blocksChain: string[][] = [];
  for ( const re of reS ) {
    blocksChain.push( extractBlocks( content, re ) );
  }

  let tempRet: string = minify( content );

  for ( const [ i, re ] of reS.entries() ) {
    tempRet = mergeBlocks( tempRet, re, blocksChain[i] );
  }

  return tempRet;
}

export function htmlMinify ( content: string ): string {
  // console.log(content);
  if ( __production__ ) {
    return htmlBlocksChain( content, [
      /<pre[\S\s]+?<\/pre>/g,
      /<textarea[\S\s]+?<\/textarea>/g,
    ] ).replace( />\s+</g, '><' );
  }
  return content;
}
