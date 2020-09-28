import React, { Component, createRef, RefObject } from 'react';
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
    if (!clickIn(event.target as HTMLElement, this.toggleElem.current)) {
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

  render() {
    return (
      <div className="title-bar">
        <nav>
          <ul className="left">
            <li>
              <Link
                to="/"
                className={classNames({
                  ctx: this.props.match.path === '/',
                })}
              >
                首页
              </Link>
            </li>
            <li>
              <Link
                to="/canlendar/*/*/*"
                className={classNames({
                  ctx:
                    this.props.match.path === '/canlendar/:year/:month/:date',
                })}
              >
                日历
              </Link>
            </li>
            <li>
              <Link
                to="/tags/*"
                className={classNames({
                  ctx: this.props.match.path === '/tags/:tags',
                })}
              >
                标签
              </Link>
            </li>
          </ul>
          <ul className="right mobile-compatible">
            <Switch>
              <Route path="/post/:name" component={Category} />
              <Route
                exact
                path={['/', '/tags/:tags', '/canlendar/:year/:month/:date']}
                component={Pager}
              />
            </Switch>
          </ul>
          <ul className="left mobile-compatible mobile-only">
            <li>
              <a className="icon" ref={this.toggleElem} onClick={this.onExpand}>
                <CategoryIcon closing={this.state.categoryExpanded} />
              </a>
            </li>
            <li
              className={classNames('categories', {
                show: this.state.categoryExpanded,
              })}
            >
              <Link
                to="/"
                className={classNames({
                  ctx: this.props.match.path === '/',
                })}
              >
                首页
              </Link>
            </li>
            <li
              className={classNames('categories', {
                show: this.state.categoryExpanded,
              })}
            >
              <Link
                to="/canlendar/*/*/*"
                className={classNames({
                  ctx:
                    this.props.match.path === '/canlendar/:year/:month/:date',
                })}
              >
                日历
              </Link>
            </li>
            <li
              className={classNames('categories', {
                show: this.state.categoryExpanded,
              })}
            >
              <Link
                to="/tags/*"
                className={classNames({
                  ctx: this.props.match.path === '/tags/:tags',
                })}
              >
                标签
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
