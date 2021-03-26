/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as MarkdownIt from 'markdown-it';

import gridTableRule from "./rules/gridtable";

export default function gridTableRulePlugin (
    md: MarkdownIt,
    options: unknown ): void
{
    md.block.ruler.before(
        "table",
        "gridtable",
        gridTableRule( md ) );
}