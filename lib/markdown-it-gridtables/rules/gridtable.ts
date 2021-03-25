/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as MarkdownIt from 'markdown-it';
import IState from '../interfaces/markdown-it/IState';
import TRuleFunction from '../interfaces/markdown-it/TRuleFunction';
import emitTable from '../common/markdown-it/EmitTable';
import getCharCodeAtStartOfLine from '../common/markdown-it/GetCharCodeAtStartOfLine';
import parseTable from '../common/markdown-it/ParseTable';

export default function gridTableRule ( md: MarkdownIt ): TRuleFunction {
  return function gridTableRuleImpl (
    state: IState,
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
