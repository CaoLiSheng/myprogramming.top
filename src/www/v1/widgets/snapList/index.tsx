import './index.scss';

import {
  I_PAGE_CTX,
  PAGE_INFO,
  PAGE_SIZE,
  PATH_PAGER_MAP,
  injectPageCtx,
} from '@rCtxs/index';
import { __dirs__ } from '@www/utils/conf';
import React, { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

@injectPageCtx ()
class InnerSnapList extends Component<
RouteComponentProps & { page?: I_PAGE_CTX }
> {
  private renderPostSnap = ( name: string ) => (
    <li key={ name }>
      <Link to={ `/post/${ name }` }>
        <iframe
          src={ `${ __dirs__.__posts_root__
            }${ name }.html?var=${ Date.now () }#snapshot` }
          sandbox="allow-same-origin allow-scripts allow-top-navigation allow-downloads"
          seamless
          scrolling="no"
          style={ { overflow: 'hidden' } }
        />
      </Link>
    </li>
  );

  public render () {
    const pagerKey: string = PATH_PAGER_MAP[ this.props.match.path ];
    if ( !pagerKey ) {
      return <h1>粗错啦，无效的分页关键字！</h1>;
    }

    const pager: PAGE_INFO | undefined = this.props.page?.page[ pagerKey ];
    if ( !pager ) {
      return null;
    }

    return (
      <ul className="snap-list">
        {( pager.data || [] )
          .slice ( pager.cur * PAGE_SIZE, ( pager.cur + 1 ) * PAGE_SIZE )
          .map ( ( name: string ) => this.renderPostSnap ( name ) ) }
      </ul>
    );
  }
}

export const SnapList = withRouter ( InnerSnapList );
