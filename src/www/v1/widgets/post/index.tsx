import './index.scss';

import {
  I_DB_CTX,
  injectDBCtx,
} from '@rCtxs/index';
import { __conf__ } from '@utils/conf';
import React, { Component, ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MdConf } from '@md/index';
import { PublicMeta } from '@common/db';
import { insertStyleSheetLinks } from '@utils/dom';

declare let __resource_dir__: string;

interface PostProps extends RouteComponentProps<{ name: string }> {
  db: I_DB_CTX;
}

@injectDBCtx ()
export class Post extends Component<PostProps, { articleBody: string }> {

  constructor ( props: PostProps ) {
    super ( props );

    this.state = { articleBody: '' };
  }

  async componentDidMount (): Promise<void> {
    const { match: { params: { name } }, db: { db: { conf, metas } } } = this.props;

    await this.fetchPost ( name, conf, metas );
  }

  async componentDidUpdate ( prevProps: PostProps ): Promise<void> {
    const { match: { params: { name } }, db: { db: { conf, metas } } } = this.props;

    if ( name !== prevProps.match.params.name || conf !== prevProps.db.db.conf || metas !== prevProps.db.db.metas ) {
      await this.fetchPost ( name, conf, metas );
    }
  }

  private async fetchPost ( name: string, conf: MdConf, metas: { [key: string]: PublicMeta } ): Promise<void> {
    const baseStyle = metas[name]?.style;
    if ( !baseStyle ) return;
    
    const requiredStyles = [ ...conf[baseStyle] ];
    insertStyleSheetLinks (
      ...requiredStyles.map ( ( common: string ) => `${ __resource_dir__ }.reserved/styles/common/${ common }.css` ),
      `${ __resource_dir__ }.reserved/styles/themes/${ baseStyle }.css`
    );
    
    this.setState ( { articleBody: await ( await fetch ( `${ __conf__.__posts_root__ }${ name }.html?var=${ Date.now () }` ) ).text () } );
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
