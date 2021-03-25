/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as MarkdownIt from 'markdown-it';
import { RuleBlock } from 'markdown-it/lib/parser_block';
import StateBlock from 'markdown-it/lib/rules_block/state_block';

import emitTable from '../common/markdown-it/EmitTable';
import getCharCodeAtStartOfLine from '../common/markdown-it/GetCharCodeAtStartOfLine';
import parseTable from '../common/markdown-it/ParseTable';

export default function gridTableRule ( md: MarkdownIt ): RuleBlock {
  return function gridTableRuleImpl (
    state: StateBlock,
    startLine: number,
    endLine: number,
    silent: boolean
  ): boolean {
    if ( getCharCodeAtStartOfLine( state, startLine ) !== 0x2b ) {
      // line does not start with a '+'
      return false;
    }

    const parseResult = parseTable( state, startLine, endLine );

    if ( !parseResult.Success ) {
      console.log( '>>>>>>>>>>>>>>mdit-gridtables-parse-failed<<<<<<<<<<<<<' );
      return false;
    }

    if ( silent ) {
      return true;
    }

    emitTable( md, state, parseResult );

    state.line = parseResult.CurrentLine;

    return true;
  };
}
