import React, { Component, ErrorInfo } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import {
  withPageCtxProvider,
  withDBCtxProvider,
  I_DB_CTX,
  I_PAGE_CTX,
} from '@rCtxs/index';
import { Home, Post, Header, Tags, Canlendar } from '@rWidgets/index';
import { Schema } from '@common/index';
import { __dirs__ } from '@www/utils/dir';

import './index.scss';
// import CategoryEntrySVG from '@images/category-icon.svg';

interface AppStates {
  hasError: boolean;
}

@withDBCtxProvider()
@withPageCtxProvider()
class App extends Component<{ db?: I_DB_CTX; page?: I_PAGE_CTX }, AppStates> {
  state = { hasError: false };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo.componentStack);
  }

  async componentDidMount() {
    const resp = await fetch(__dirs__.__posts_db__, {
      method: 'GET',
      mode: 'cors',
    });
    const db: Schema = await resp.json();

    this.props.db?.load(db);
    this.props.page?.update('homepage', db.sortedPosts);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    if (this.state.hasError) return <h1 className="failure">出错了</h1>;

    return (
      <div id="main">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:page" component={Home} />
            <Route exact path="/post/:name" component={Post} />
            <Route exact path="/tags/:tags" component={Tags} />
            <Route exact path="/tags/:tags/:page" component={Tags} />
            <Route
              exact
              path="/canlendar/:year/:month/:date"
              component={Canlendar}
            />
            <Route
              exact
              path="/canlendar/:year/:month/:date/:page"
              component={Canlendar}
            />
          </Switch>
          <Route
            path={[
              '/canlendar/:year/:month/:date/:page',
              '/canlendar/:year/:month/:date',
              '/tags/:tags/:page',
              '/tags/:tags/',
              '/post/:name',
              '/:page',
              '/',
            ]}
            component={Header}
          />
          {/* <Overlay
              icon={CategoryEntrySVG}
              positionStyleObj={{ right: '0.1rem', bottom: '0.1rem' }}
              contentShrinkPos="100% 100% 0"
            /> */}
        </HashRouter>
      </div>
    );
  }
}

import('react-dom').then(({ render }) =>
  render(<App />, document.getElementById('app'))
);

// (async () => {
//   const { render } = await import('react-dom');
//   render(<App />, document.getElementById('main'));
// })();

// import { render } from 'react-dom';
// render(<App />, document.getElementById('main'));
