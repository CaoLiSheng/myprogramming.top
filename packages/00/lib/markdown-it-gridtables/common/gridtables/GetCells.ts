/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import TableRow from '../markdown-it/TableRow';

const __InlineChars = new Set ( [ '`', '_', '*' ] );

/**
 * getCells parses the lines found for a certain row, and transforms these to
 * the separate cell lines.
 *
 * @param columnWidths The column widths for this table.
 * @param columnOffsets The absolute column offsets for this table.
 * @param lines The lines for the row.
 */
export default function getCells (
  columnCount: number,
  row: TableRow
): string[][] {
  const cells: string[][] = [];

  for ( let i = 0; i < columnCount; i += 1 ) {
    const { lines } = row;
    let cell = [];

    for ( const [ j, line ] of lines.entries () ) {
      const columnOffsets = row.columnOffsets[j];

      // const s = trimEnd(
      //   lines[j].substring(columnOffsets[i] + 1, columnOffsets[i + 1] - 1)
      // );
      let s = line
        .slice ( columnOffsets[i] + 1, columnOffsets[i + 1] - 1 )
        .trim ();

      if ( __InlineChars.has ( s.charAt ( 0 ) ) ) {
        s = ` ${  s }`;
      }

      if ( __InlineChars.has ( s.charAt ( s.length - 1 ) ) ) {
        s += ' ';
      }

      if ( s.length === 0 && cell.length === 0 ) {
        // skip leading empty lines
        continue;
      }

      cell.push ( s );
    }

    // remove trailing empty lines
    let j = cell.length - 1;
    for ( ; j >= 0; j -= 1 ) {
      if ( cell[j].length > 0 ) {
        break;
      }
    }

    if ( j < cell.length - 1 ) {
      cell = cell.slice ( 0, j + 1 );
    }

    cells.push ( cell );
  }

  return cells;
}

// function trimEnd(s: string): string {
//   const trimmed = s.trim();

//   if (trimmed.length === 0) {
//     return '';
//   }

//   return s.slice(0, s.indexOf(trimmed) + trimmed.length);
// }
