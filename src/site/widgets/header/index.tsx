import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, Switch, Route } from 'react-router-dom';

import Category from './category';
import Pager from './pager';

import './index.scss';
import { CategoryIcon } from '@images/index';

export class Header extends Component<{}, { categoryExpanded: boolean }> {
  state = { categoryExpanded: false };

  private onExpand = () => {
    this.setState(
      ({ categoryExpanded }) => ({
        categoryExpanded: !categoryExpanded,
      }),
      () =>
        this.state.categoryExpanded &&
        document.body.addEventListener(
          'click',
          () => {
            setTimeout(() => this.setState({ categoryExpanded: false }), 0);
          },
          { once: true }
        )
    );
  };

  private receiveMessage = (event: MessageEvent) => {
    if (event.data === 'iframe.detail clicked') {
      this.setState({ categoryExpanded: false });
    }
  };

  componentDidMount() {
    window.top.addEventListener('message', this.receiveMessage, false);
  }

  componentWillUnmount() {
    window.top.removeEventListener('message', this.receiveMessage);
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
              <a className="icon" onClick={this.onExpand}>
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
