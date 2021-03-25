/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import IState from '../../interfaces/markdown-it/IState';
import ColumnAlignments from '../gridtables/ColumnAlignments';
import TableRow from './TableRow';
import ParseTableResult from './ParseTableResult';
import getColumnCount from '../gridtables/GetColumnCount';
import getColumnAlignments from '../gridtables/GetColumnAlignments';
import getLine from './GetLine';

export default function parseTable (
  state: IState,
  startLine: number,
  endLine: number
): ParseTableResult {
  const result = new ParseTableResult();

  let rowLine = getLine( state, startLine );

  if ( rowLine.charAt( 0 ) !== '+' ) {
    // line does not start with a '+'
    return result;
  }

  result.ColumnCount = getColumnCount( rowLine );

  if ( result.ColumnCount === 0 ) {
    // no columns found
    return result;
  }

  // initialize column alignments
  result.ColumnAlignments = Array.from(
    [].fill.call( { length: result.ColumnCount }, ColumnAlignments.None )
  );

  if ( rowLine.includes( ':' ) ) {
    // column alignment specifiers present in first row line
    result.HeaderLess = true;

    // set column alignments
    result.ColumnAlignments = getColumnAlignments( rowLine, result.ColumnCount );

    // remove alignment specifiers for further matching
    rowLine = rowLine.replace( /:/g, '-' );
  }

  // create header line matcher
  const headerLineMatcher = new RegExp(
    `^\\+${ 
      Array.from(
        ( [] as string[] ).fill.call( { length: result.ColumnCount }, '[=:][=]*?[=:]\\+' )
      ).join( '' ) 
      }$`
  );

  // create cell line matcher
  const cellLineMatcher = new RegExp(
    `^\\|${ 
      Array.from(
        ( [] as string[] ).fill.call( { length: result.ColumnCount }, '[^|]+?\\|' )
      ).join( '' ) 
      }$`
  );

  // save first separator line offset
  result.SeparatorLineOffsets.push( startLine );

  // continue to scan until a complete table is found, or an invalid line is encountered
  let currentRow: TableRow = { lines: [], columnOffsets: [] };
  let currentLine = startLine + 1;

  for ( ; currentLine <= endLine; currentLine += 1 ) {
    const line = getLine( state, currentLine );

    if ( line.charCodeAt( 0 ) === 0x2b ) {
      // '+'
      // separator line
      if ( currentRow.lines.length === 0 ) {
        // no row lines since last separator -> invalid table
        return result;
      }

      // save separator line offset
      result.SeparatorLineOffsets.push( currentLine );

      if ( line === rowLine ) {
        // new regular row
        result.TableRows.push( currentRow );

        if ( result.HeaderLines.lines.length === 0 ) {
          result.HeaderLess = true;
        }
      } else if ( !result.HeaderLess && headerLineMatcher.test( line ) ) {
        // found header line
        if (
          result.HeaderLines.lines.length > 0 ||
          result.TableRows.length > 0
        ) {
          // header already found, or not the first row -> invalid table
          return result;
        }

        // header row
        result.HeaderLines = currentRow;

        if ( line.includes( ':' ) ) {
          // set column alignments
          result.ColumnAlignments = getColumnAlignments(
            line,
            result.ColumnCount
          );
        }
      } else {
        // not a header or regular row -> invalid table
        return result;
      }

      // reset current row
      currentRow = { lines: [], columnOffsets: [] };
    } else if ( line.charCodeAt( 0 ) === 0x7c ) {
      // '|'
      // cell line
      if ( !cellLineMatcher.test( line ) ) {
        // cell line does not match -> invalid table
        console.log(
          '>>>>>>>>>>>>>>cell line does not match -> invalid table<<<<<<<<<<<<<',
          line,
          cellLineMatcher.source
        );
        return result;
      }

      // add the line to the current row
      currentRow.lines.push( line );

      // get position of '|'
      const offsets = [ 0 ];
      let offset = 0;
      for ( ;; ) {
        offset = line.indexOf( '|', offset + 1 );
        if ( offset === -1 ) {
          break;
        }
        offsets.push( offset );
      }
      currentRow.columnOffsets.push( offsets );
    } else {
      // not a separator or cell line, check if we have a complete table
      if (
        currentRow.lines.length === 0 &&
        ( result.HeaderLines.lines.length > 0 || result.TableRows.length > 0 )
      ) {
        // found a complete table
        break;
      }

      return result;
    }
  }

  result.CurrentLine = currentLine;

  result.Success = true;

  return result;
}
