import './index.scss';

import { PublicMeta } from '@common/db';
import { MdConf } from '@md/index';
import { initCodePlugin } from '@plugins/code';
import { initDesignPlugin } from '@plugins/design';
import { initFigurePlugin } from '@plugins/figure';
import { initHistoryPlugin } from '@plugins/history';
import { initLinkPlugin } from '@plugins/link';
import { initTablePlugin } from '@plugins/table';
import {
  I_DB_CTX,
  injectDBCtx,
} from '@rCtxs/index';
import { __conf__ } from '@utils/conf';
import { injectStyleSheetLinks } from '@utils/dom';
import React, { Component, ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

declare let __resource_dir__: string;
declare let __portal_to_v1__: string;

interface PostProps extends RouteComponentProps<{ name: string }> {
  db: I_DB_CTX;
}

@injectDBCtx ()
export class Post extends Component<PostProps, { articleBody: string }> {

  constructor ( props: PostProps ) {
    super ( props );

    this.state = { articleBody: '' };
  }

  componentDidMount (): void {
    const { match: { params: { name } }, db: { db: { conf, metas } } } = this.props;

    this.fetchPost ( name, conf, metas );
  }

  componentDidUpdate ( prevProps: PostProps ): void {
    const { match: { params: { name } }, db: { db: { conf, metas } } } = this.props;

    if ( name !== prevProps.match.params.name || conf !== prevProps.db.db.conf || metas !== prevProps.db.db.metas ) {
      this.fetchPost ( name, conf, metas );
    }
  }

  private fetchPost ( name: string, conf: MdConf, metas: { [key: string]: PublicMeta } ): void {
    const baseStyle = metas[name]?.style;
    if ( !baseStyle ) return;

    const requiredStyles = [ ...conf[baseStyle] ];
    void injectStyleSheetLinks (
      ...requiredStyles.map (
         ( common: string ) => `${ __resource_dir__ }.reserved/styles/common/${ common }.css`
      ),
      `${ __resource_dir__ }.reserved/styles/themes/${ baseStyle }.css`
    ).then ( async () => {
      this.setState ( {
        articleBody: await ( await fetch (
          `${ __conf__.__posts_root__ }${ name }.html?var=${ Date.now () }`
        ) ).text () },
        () => {
          initCodePlugin ();
          initLinkPlugin ( { postLinkEmitter: ( info: string ) => `${ __portal_to_v1__ }#/post/${ info }` } );
          initTablePlugin ();
          initDesignPlugin ();
          initFigurePlugin ();
          void initHistoryPlugin ( { historyKey: name } );
        }
      );
      return [];
    } );
  }

  render (): ReactElement {
    const { articleBody } = this.state;

    return (
      <div className="detail" dangerouslySetInnerHTML={{
        __html: articleBody
      }} />
    );
  }

}
