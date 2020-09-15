import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { SnapList } from '@widgets/snapList';
import {
  injectDBCtx,
  injectPageCtx,
  PATH_PAGER_MAP,
  I_DB_CTX,
  I_PAGE_CTX,
} from '@ctxs/index';

import './index.scss';

@injectDBCtx()
@injectPageCtx()
export class Home extends Component<
  RouteComponentProps & {
    db: I_DB_CTX;
    page: I_PAGE_CTX;
  }
> {
  componentDidMount() {
    const pagerKey: string = PATH_PAGER_MAP[this.props.match.path];
    if (!pagerKey) throw new Error('粗错啦，无效的分页关键字！');

    this.props.page.update(pagerKey, this.props.db.db.sortedPosts);
  }

  public render() {
    return (
      <Fragment>
        <div className="home wrapper" />
        <SnapList />
      </Fragment>
    );
  }
}
