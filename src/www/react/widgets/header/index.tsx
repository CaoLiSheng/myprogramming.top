import React, { Component, createRef, ReactElement, RefObject } from 'react';
import { Link, Switch, Route, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';

import Category from './category';
import Pager from './pager';

import './index.scss';
import { CategoryIcon } from '@images/index';

const clickIn = (
  target: HTMLElement | null | undefined,
  wrapper: HTMLElement | null
): boolean => {
  if (!wrapper) return false;

  while (!!target) {
    if (target === wrapper) return true;
    target = target?.parentElement;
  }
  return false;
};

interface HeaderStates {
  categoryExpanded: boolean;
}

export class Header extends Component<RouteComponentProps<{}>, HeaderStates> {
  state = { categoryExpanded: false };

  private toggleElem: RefObject<HTMLAnchorElement> = createRef<
    HTMLAnchorElement
  >();

  private toClose = (event: MouseEvent) => {
    const clickedIn = clickIn(
      event.target as HTMLElement,
      this.toggleElem.current
    );
    if (!clickedIn) {
      this.setState({ categoryExpanded: false });
    }
  };

  private receiveMessage = (event: MessageEvent) => {
    if (event.data === 'iframe.detail clicked') {
      this.setState({ categoryExpanded: false });
    }
  };

  private onExpand = () =>
    this.setState(({ categoryExpanded }) => ({
      categoryExpanded: !categoryExpanded,
    }));

  componentDidMount() {
    window.top.addEventListener('message', this.receiveMessage, false);
    document.body.addEventListener('click', this.toClose);
  }

  componentWillUnmount() {
    window.top.removeEventListener('message', this.receiveMessage);
    document.body.removeEventListener('click', this.toClose);
  }

  shouldComponentUpdate(
    nextProps: RouteComponentProps<{}>,
    nextStates: HeaderStates
  ) {
    return (
      nextProps.match.path !== this.props.match.path ||
      nextStates.categoryExpanded !== this.state.categoryExpanded
    );
  }

  renderLink(ctx: string, name: string, to?: string) {
    return (
      <Link
        to={to || ctx}
        className={classNames({
          ctx: this.props.match.path === ctx,
        })}
      >
        {name}
      </Link>
    );
  }

  renderMobileLink(link: ReactElement) {
    return (
      <li
        className={classNames('slot', {
          show: this.state.categoryExpanded,
        })}
      >
        {link}
      </li>
    );
  }

  render() {
    const homeLink = this.renderLink('/', '首页');
    const canlendarLink = this.renderLink(
      '/canlendar/:year/:month/:date',
      '日历',
      '/canlendar/*/*/*'
    );
    const tagsLink = this.renderLink('/tags/:tags', '标签', '/tags/*');

    return (
      <div className="title-bar">
        <nav>
          <Switch>
            <Route path="/post/:name" component={Category} />
            <Route
              exact
              path={[
                '/',
                '/:page',
                '/tags/:tags',
                '/tags/:tags/:page',
                '/canlendar/:year/:month/:date',
                '/canlendar/:year/:month/:date/:page',
              ]}
              component={Pager}
            />
          </Switch>
          <div className="main">
            <div className="pc">{homeLink}</div>
            <div className="pc">{canlendarLink}</div>
            <div className="pc">{tagsLink}</div>
            <ul className="mobile">
              <li>
                <a
                  className="icon"
                  ref={this.toggleElem}
                  onClick={this.onExpand}
                >
                  <CategoryIcon closing={this.state.categoryExpanded} />
                </a>
              </li>
              {this.renderMobileLink(homeLink)}
              {this.renderMobileLink(canlendarLink)}
              {this.renderMobileLink(tagsLink)}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
