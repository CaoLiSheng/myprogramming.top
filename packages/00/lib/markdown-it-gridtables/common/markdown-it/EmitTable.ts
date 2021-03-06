/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as MarkdownIt from 'markdown-it';
import StateBlock from 'markdown-it/lib/rules_block/state_block';

import ColumnAlignments from '../gridtables/ColumnAlignments';
import getCells from '../gridtables/GetCells';
import ParseTableResult from './ParseTableResult';

export default function emitTable (
  md: MarkdownIt,
  state: StateBlock,
  result: ParseTableResult
): void {
  let offsets = result.SeparatorLineOffsets;
  
  let token = state.push ( 'table_open', 'table', 1 );
  token.map = [ offsets[0], offsets[offsets.length - 1] ];

  if ( result.HeaderLines.lines.length > 0 ) {
    // emit table header
    token = state.push ( 'thead_open', 'thead', 1 );
    token.map = [ offsets[0], offsets[1] ];

    const cells = getCells ( result.ColumnCount, result.HeaderLines );

    processRow (
      md,
      state,
      'th',
      result.ColumnAlignments,
      offsets[0],
      offsets[1],
      cells
    );

    state.push ( 'thead_close', 'thead', -1 );

    offsets = offsets.slice ( 1 );
  }

  // emit table body
  token = state.push ( 'tbody_open', 'tbody', 1 );
  token.map = [ offsets[0], offsets[offsets.length - 1] ];

  for ( let i = 0; i < result.TableRows.length; i += 1 ) {
    const cells = getCells ( result.ColumnCount, result.TableRows[i] );
    console.log ( 'tua', cells );
    processRow (
      md,
      state,
      'td',
      result.ColumnAlignments,
      offsets[i],
      offsets[i + 1],
      cells
    );
  }

  state.push ( 'tbody_close', 'tbody', -1 );

  state.push ( 'table_close', 'table', -1 );
}

function processRow (
  md: MarkdownIt,
  state: StateBlock,
  tag: string,
  columnAlignments: ColumnAlignments[],
  lineBegin: number,
  lineEnd: number,
  cells: string[][]
) {
  let token = state.push ( 'tr_open', 'tr', 1 );
  token.map = [ lineBegin, lineEnd ];

  for ( const [ i, cell_ ] of cells.entries () ) {
    token = state.push ( `${ tag }_open`, tag, 1 );
    token.map = [ lineBegin + 1, lineEnd - 1 ];

    if ( columnAlignments[i] !== ColumnAlignments.None ) {
      token.attrSet ( 'style', `text-align: ${ columnAlignments[i] };` );
    }

    if ( cell_.length === 0 ) {
      // empty cell
    } else if ( cell_.length === 1 ) {
      // single line cell -> emit as inline markdown
      token = state.push ( 'inline', '', 0 );
      token.content = cell_[0].trim ();
      token.children = [];
    } else {
      // multi line cell -> render and emit as html
      // let cell = md.render(cells[i].join('\r\n')).trim();
      let cell = md.render ( cell_.join ( '' ) ).trim ();

      // remove single p tag because we're in a table cell
      if (
        cell.slice ( 0, 3 ) === '<p>' &&
        cell.slice ( -4, 0 ) === '</p>' &&
        !cell.includes ( '<p>', 3 )
      ) {
        cell = cell.slice ( 3, -7 );
      }

      token = state.push ( 'html_block', '', 0 );
      token.content = cell;
      token.children = [];
    }

    state.push ( `${ tag }_close`, tag, -1 );
  }

  state.push ( 'tr_close', 'tr', -1 );
}
