/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import ColumnAlignments from '../gridtables/ColumnAlignments';
import TableRow from './TableRow';

export default class ParseTableResult {
  Success = false;

  ColumnCount = 0;

  ColumnAlignments: ColumnAlignments[] = [];

  HeaderLess = false;

  HeaderLines: TableRow = { lines: [], columnOffsets: [] };

  TableRows: TableRow[] = [];

  SeparatorLineOffsets: number[] = [];

  CurrentLine = 0;
}
