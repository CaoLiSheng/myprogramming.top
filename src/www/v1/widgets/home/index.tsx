import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { SnapList } from '@rWidgets/snapList';
import {
  injectDBCtx,
  injectPageCtx,
  PATH_PAGER_MAP,
  I_DB_CTX,
  I_PAGE_CTX,
} from '@rCtxs/index';

import './index.scss';

@injectDBCtx()
@injectPageCtx()
export class Home extends Component<
RouteComponentProps<{ page?: string }> & {
  db: I_DB_CTX;
  page: I_PAGE_CTX;
}
> {
  componentDidMount () {
    this.update();
  }

  componentDidUpdate (
    prevProps: RouteComponentProps & {
      db: I_DB_CTX;
      page: I_PAGE_CTX;
    },
  ) {
    if (
      prevProps.match.url === this.props.match.url
      && prevProps.db.db.sortedPosts === this.props.db.db.sortedPosts
    ) return;

    this.update();
  }

  update = () => {
    const pagerKey: string = PATH_PAGER_MAP[ this.props.match.path ];
    if ( !pagerKey ) throw new Error( '粗错啦，无效的分页关键字！' );

    this.props.page.update(
      pagerKey,
      this.props.db.db.sortedPosts,
      this.props.match.params.page?.toInt(),
    );
  };

  public render () {
    return (
      <>
        <div className="home hidden wrapper" />
        <SnapList />
      </>
    );
  }
}
