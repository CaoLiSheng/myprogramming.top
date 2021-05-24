import './index.scss';

import { initCodePlugin } from '@plugins/code';
import { initDesignPlugin } from '@plugins/design';
import { initFigurePlugin } from '@plugins/figure';
import { initHistoryPlugin } from '@plugins/history';
import { initLinkPlugin } from '@plugins/link';
import { initTablePlugin } from '@plugins/table';
import { I_DB_CTX, injectDBCtx } from '@rCtxs/index';
import { __conf__ } from '@utils/conf';
import React, { Component, ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { prefetchStyles } from '@md/index';

declare let __portal_to_v1__: string;

interface PostProps extends RouteComponentProps<{ name: string }> {
  db: I_DB_CTX;
}

@injectDBCtx ()
export class Post extends Component<PostProps, { articleBody: string }> {

  static restartPlugins ( name: string ): void {
    initCodePlugin ();
    initLinkPlugin ( { postLinkEmitter: ( info: string ) => `${ __portal_to_v1__ }#/post/${ info }` } );
    initTablePlugin ();
    initDesignPlugin ();
    initFigurePlugin ();
    void initHistoryPlugin ( { historyKey: name } );
  }

  constructor ( props: PostProps ) {
    super ( props );

    this.state = { articleBody: '' };
  }

  componentDidMount (): void {
    const { match: { params: { name } }, db: { db: { conf, metas } } } = this.props;

    void prefetchStyles ( name, conf, metas ).then ( this.fetchPost.bind ( this, name ) );
  }

  componentDidUpdate ( prevProps: PostProps ): void {
    const { match: { params: { name } }, db: { db: { conf, metas } } } = this.props;

    if ( name !== prevProps.match.params.name || conf !== prevProps.db.db.conf || metas !== prevProps.db.db.metas ) {
      void prefetchStyles ( name, conf, metas ).then ( this.fetchPost.bind ( this, name ) );
    }
  }

  private async fetchPost ( name: string, success: boolean ) {
    if ( !success ) return;

    this.setState ( {
      articleBody: await ( await fetch (
        `${ __conf__.__posts_root__ }${ name }.html?var=${ Date.now () }`
      ) ).text () },
      Post.restartPlugins.bind ( null, name )
    );
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
