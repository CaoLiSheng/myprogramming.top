import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { __posts_root__ } from '@common/index';
import {
  PAGE_SIZE,
  PATH_PAGER_MAP,
  PAGE_INFO,
  injectPageCtx,
  I_PAGE_CTX,
} from '@ctxs/index';

import './index.scss';

@injectPageCtx()
class InnerSnapList extends Component<
  RouteComponentProps & { page?: I_PAGE_CTX }
> {
  private renderPostSnap = (name: string) => {
    return (
      <Link key={name} to={`/post/${name}`}>
        <li>
          <iframe
            src={`${__posts_root__}${name}.html?var=${Date.now()}#snapshot`}
            referrerPolicy="origin"
            scrolling="no"
            style={{ overflow: 'hidden' }}
          />
        </li>
      </Link>
    );
  };

  public render() {
    const pagerKey: string = PATH_PAGER_MAP[this.props.match.path];
    if (!pagerKey) {
      return <h1>粗错啦，无效的分页关键字！</h1>;
    }

    let pager: PAGE_INFO | undefined;
    if (!(pager = this.props.page?.page[pagerKey])) {
      return null;
    }

    return (
      <ul className="snap-list">
        {(pager.data || [])
          .slice(pager.cur * PAGE_SIZE, (pager.cur + 1) * PAGE_SIZE)
          .map((name: string) => this.renderPostSnap(name))}
      </ul>
    );
  }
}

export const SnapList = withRouter(InnerSnapList);
