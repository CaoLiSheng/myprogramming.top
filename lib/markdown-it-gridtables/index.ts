/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as MarkdownIt from 'markdown-it';
import TRuleFunction from "./interfaces/markdown-it/TRuleFunction";
import gridTableRule from "./rules/gridtable";

export default function gridTableRulePlugin (
    md: { block: { ruler: { before: ( name1: string, name2: string, fn: TRuleFunction ) => void } } },
    options: unknown )
{
    md.block.ruler.before(
        "table",
        "gridtable",
        gridTableRule( md as MarkdownIt ) );
}