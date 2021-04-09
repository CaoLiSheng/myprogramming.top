/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import StateBlock from "markdown-it/lib/rules_block/state_block";

export default function getLine (
    state: StateBlock,
    line: number ):
    string
{
    const start = state.bMarks[line] + state.blkIndent;

    const end = state.eMarks[line];

    return state.src.slice ( start, end );
}
