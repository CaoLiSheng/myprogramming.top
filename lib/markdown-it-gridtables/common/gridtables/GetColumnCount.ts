/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 曹力升. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * getColumnWidths parses the provided line and returns the associated column widths.
 *
 * @param line The separator line to parse for the column widths.
 * @returns The column widths for the provided line, or an empty array if the line is invalid.
 */
export default function getColumnCount ( line: string ): number {
  // try to parse as a row separator line
  let columnMatch = line.slice ( 1 ).match ( /[:-]-+[:-]\+/g );

  if ( columnMatch == null ) {
    // try to parse as a header separator line
    columnMatch = line.slice ( 1 ).match ( /[:=]=+[:=]\+/g );
  }

  if ( columnMatch == null ) {
    return 0;
  }

  return columnMatch.length;
}
