/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 曹力升. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import ColumnAlignments from './ColumnAlignments';

export default function getAlignments ( line: string, columnCount: number ): ColumnAlignments[] {
  const alignments: ColumnAlignments[] = [];

  let left = 1, right = -1;

  for ( let i = 0; i < columnCount; i += 1 ) {
    right = line.indexOf ( '+', left ) - 1;
    if ( right === -1 ) {
      throw new Error ( 'grid表格格式不正确' );
    }

    let alignment = ColumnAlignments.None;

    if ( line.charAt ( right ) === ':' ) {
      alignment = line.charAt ( left ) === ':' ? ColumnAlignments.Center : ColumnAlignments.Right;
    } else if ( line.charAt ( left ) === ':' ) {
      alignment = ColumnAlignments.Left;
    }

    alignments.push ( alignment );

    left = right + 2;
  }

  return alignments;
}
