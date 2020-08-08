import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Category from './category';
import Pager from './pager';

import './index.scss';

export class Header extends Component {
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
          <ul className="right">
            <Switch>
              <Route path="/post/:name" component={Category} />
              <Route
                exact
                path={['/', '/tags/:tags', '/canlendar/:year/:month/:date']}
                component={Pager}
              />
            </Switch>
          </ul>
        </nav>
      </div>
    );
  }
}
