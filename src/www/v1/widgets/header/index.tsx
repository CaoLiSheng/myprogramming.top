import './index.scss';

import { GateIcon, MenuIcon } from '@images/index';
import { clickIn } from '@www/utils/dom';
import classNames from 'classnames';
import React, {
  Component,
  ReactElement,
  RefObject,
  createRef,
} from 'react';
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import Category from './category';
import GoToV2 from './goToV2';
import Pager from './pager';

declare let __portal_to_v2__: string;

interface HeaderStates {
  menuExpanded: boolean;
}

export class Header extends Component<RouteComponentProps<never>, HeaderStates> {

  private toggleElem: RefObject<HTMLButtonElement> = createRef<HTMLButtonElement>();

  constructor ( props: RouteComponentProps<never> ) {
    super( props );

    this.state = { menuExpanded: false };
  }

  componentDidMount () {
    window.top.addEventListener( 'message', this.receiveMessage, false );
    document.body.addEventListener( 'click', this.toClose );
  }

  shouldComponentUpdate (
    nextProps: RouteComponentProps<never>,
    nextStates: HeaderStates,
  ) {
    return (
      nextProps.match.path !== this.props.match.path
      || nextStates.menuExpanded !== this.state.menuExpanded
    );
  }

  componentWillUnmount () {
    window.top.removeEventListener( 'message', this.receiveMessage );
    document.body.removeEventListener( 'click', this.toClose );
  }

  private toClose = ( event: MouseEvent ) => {
    const clickedIn = clickIn(
      event.target as HTMLElement,
      this.toggleElem.current,
    );
    if ( !clickedIn ) {
      this.setState( { menuExpanded: false } );
    }
  };

  private receiveMessage = ( event: MessageEvent ) => {
    if ( event.data === 'iframe.detail clicked' ) {
      this.setState( { menuExpanded: false } );
    }
  };

  private onExpand = () => this.setState( ( { menuExpanded } ) => ( {
    menuExpanded: !menuExpanded,
  } ) );

  renderLink ( ctx: string, name: string, to?: string ) {
    return (
      <Link
        to={ to || ctx }
        className={ classNames( {
          ctx: this.props.match.path.startsWith( ctx ),
        } ) }
      >
        { name }
      </Link>
    );
  }

  renderMobileLink ( link: ReactElement ) {
    return (
      <li
        className={ classNames( 'slot', {
          show: this.state.menuExpanded,
        } ) }
      >
        { link }
      </li>
    );
  }

  render () {
    const homeLink = this.renderLink( '/home', '首页' );
    const canlendarLink = this.renderLink(
      '/canlendar/:year/:month/:date',
      '日历',
      '/canlendar/*/*/*',
    );
    const tagsLink = this.renderLink( '/tags/:tags', '标签', '/tags/*' );

    return (
      <div className="title-bar">
        <nav>
          <Switch>
            <Route path="/post/:name" component={ GoToV2 } />
            <Route
              path="*"
              component={ () => (
                <a
                  className="icon pc"
                  title="去新版网站"
                  href={ __portal_to_v2__ }
                >
                  <GateIcon />
                </a>
              ) }
            />
          </Switch>
          <Switch>
            <Route path="/post/:name" component={ Category } />
            <Route
              exact
              path={ [
                '/home',
                '/home/p/:page',
                '/tags/:tags',
                '/tags/:tags/p/:page',
                '/canlendar/:year/:month/:date',
                '/canlendar/:year/:month/:date/p/:page',
              ] }
              component={ Pager }
            />
          </Switch>
          <div className="main">
            <div className="pc">{ homeLink }</div>
            <div className="pc">{ canlendarLink }</div>
            <div className="pc">{ tagsLink }</div>
            <ul className="mobile">
              <li>
                <button
                  type="button"
                  className="icon"
                  ref={ this.toggleElem }
                  onClick={ this.onExpand }
                >
                  <MenuIcon closing={ this.state.menuExpanded } />
                </button>
              </li>
              { this.renderMobileLink( homeLink ) }
              { this.renderMobileLink( canlendarLink ) }
              { this.renderMobileLink( tagsLink ) }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
