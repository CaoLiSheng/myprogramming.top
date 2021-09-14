import './index.scss';

import {
  I_PAGE_CTX,
  PAGE_INFO,
  PAGE_SIZE,
  PATH_PAGER_MAP,
  injectPageCtx,
} from '@rCtxs/index';
import { __conf__ } from 'commons/src/www/utils/conf';
import React, { Component, RefObject, createRef } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';


@injectPageCtx ()
class InnerSnapList extends Component<
RouteComponentProps & { page?: I_PAGE_CTX },
{ page: number }
> {
  private guardRef: RefObject<HTMLLIElement> = createRef<HTMLLIElement> ();

  constructor ( props: RouteComponentProps & { page?: I_PAGE_CTX } ) {
    super ( props );

    this.state = { page: 0 };
    this.detectGuard = this.detectGuard.bind ( this );
  }

  componentDidMount () {
    window.addEventListener ( 'scroll', this.detectGuard, true );
  }

  componentWillUnmount () {
    window.removeEventListener ( 'scroll', this.detectGuard );
  }

  private detectGuard () {
    if ( ( this.guardRef.current?.offsetTop || document.documentElement.offsetHeight ) < window.scrollY + document.documentElement.clientHeight ) {
      this.setState ( ( { page } ) => ( { page: page + 1 } ) );
    }
  }

  private renderPostSnap = ( name?: string ) => {
    if ( !name ) return null;

    return (
      <li key={ name }>
        <Link to={ `/post/${ name }` }>
          <iframe
            src={ `${ __conf__.__posts_root__
              }${ name.replace ( /<->/g, '/' ) }.html?var=${ Date.now () }#snapshot` }
            sandbox="allow-same-origin allow-scripts allow-top-navigation allow-downloads"
            seamless
            scrolling="no"
            style={ { overflow: 'hidden' } }
          />
        </Link>
      </li>
    );
  };

  public render () {
    const pagerKey: string = PATH_PAGER_MAP[ this.props.match.path ];
    if ( !pagerKey ) {
      return <h1>粗错啦，无效的分页关键字！</h1>;
    }

    const pager: PAGE_INFO | undefined = this.props.page?.page[ pagerKey ];
    if ( !pager ) {
      return null;
    }

    const { page } = this.state;
    const hasNext = page < pager.max;

    return (
      <ul className="snap-list">
        {
          ( pager.data || [] )
            .slice ( 0, ( page + 1 ) * PAGE_SIZE - ( hasNext?1:0 ) )
            .map ( ( name: string ) => this.renderPostSnap ( name ) )
        }
        { hasNext && <li className="guard" ref={this.guardRef} /> }
        { hasNext && this.renderPostSnap ( ( pager.data || [] )[( page + 1 ) * PAGE_SIZE - 1] ) }
      </ul>
    );
  }
}

export const SnapList = withRouter ( InnerSnapList );
