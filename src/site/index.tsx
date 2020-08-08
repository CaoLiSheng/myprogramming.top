import React, { Component, ErrorInfo } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import { __posts_db__, Schema, EmptySchema } from '@common/index';
import {
  DB_CTX,
  withPageCtxProvider,
  I_PAGE_CTX_OPS,
  injectPageOps,
} from '@ctxs/index';

import { SnapList, Post, Header, Tags, Canlendar } from '@widgets/index';

import './index.scss';
// import CategoryEntrySVG from '@images/category-icon.svg';

interface AppStates {
  db: Schema;
  hasError: boolean;
}

@withPageCtxProvider()
@injectPageOps()
class App extends Component<I_PAGE_CTX_OPS, AppStates> {
  state = { db: EmptySchema, hasError: false };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo.componentStack);
  }

  async componentDidMount() {
    const resp = await fetch(__posts_db__, { method: 'GET', mode: 'cors' });
    const db: Schema = await resp.json();
    this.setState({ db });

    this.props.update?.('homepage', db.sortedPosts);
  }

  render() {
    if (this.state.hasError) return <h1 className="failure">出错了</h1>;

    return (
      <DB_CTX.Provider value={{ db: this.state.db }}>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={SnapList} />
            <Route path="/post/:name" component={Post} />
            <Route path="/tags/:tags" component={Tags} />
            <Route path="/canlendar/:year/:month/:date" component={Canlendar} />
          </Switch>
          <Header />
          {/* <Overlay
              icon={CategoryEntrySVG}
              positionStyleObj={{ right: '0.1rem', bottom: '0.1rem' }}
              contentShrinkPos="100% 100% 0"
            /> */}
        </HashRouter>
      </DB_CTX.Provider>
    );
  }
}

render(<App />, document.getElementById('main'));
