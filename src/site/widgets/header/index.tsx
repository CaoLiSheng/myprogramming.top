import React, { Component, createRef, RefObject } from 'react';
import classNames from 'classnames';
import { Link, Switch, Route } from 'react-router-dom';

import Category from './category';
import Pager from './pager';

import './index.scss';
import { CategoryIcon } from '@images/index';

const clickIn = (
  target: HTMLElement | null,
  wrapper: HTMLElement | null
): boolean => {
  if (!target || !wrapper) return false;
  if (target === wrapper) return true;
  return clickIn(target.parentElement, wrapper);
};

export class Header extends Component<{}, { categoryExpanded: boolean }> {
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

  render() {
    return (
      <div className="title-bar">
        <nav>
          <ul className="left">
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/canlendar/*/*/*">日历</Link>
            </li>
            <li>
              <Link to="/tags/*">标签</Link>
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
              <Link to="/">首页</Link>
            </li>
            <li
              className={classNames('categories', {
                show: this.state.categoryExpanded,
              })}
            >
              <Link to="/canlendar/*/*/*">日历</Link>
            </li>
            <li
              className={classNames('categories', {
                show: this.state.categoryExpanded,
              })}
            >
              <Link to="/tags/*">标签</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
