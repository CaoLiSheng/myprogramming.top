/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 曹力升. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import ColumnAlignments from './ColumnAlignments';

export default function(line: string, columnCount: number): ColumnAlignments[] {
  let alignments: ColumnAlignments[] = [];

  let left = 1;
  let right = -1;

  for (let i = 0; i < columnCount; i++) {
    right = line.indexOf('+', left) - 1;
    if (-1 === right) {
      throw new Error('grid表格格式不正确');
    }

    let alignment = ColumnAlignments.None;

    if (line.charAt(right) == ':') {
      if (line.charAt(left) == ':') {
        alignment = ColumnAlignments.Center;
      } else {
        alignment = ColumnAlignments.Right;
      }
    } else if (line.charAt(left) == ':') {
      alignment = ColumnAlignments.Left;
    }

    alignments.push(alignment);

    left = right + 2;
  }

  return alignments;
}
