import React, { Component, ErrorInfo } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import { __dirs__, Schema } from '@common/index';
import {
  withPageCtxProvider,
  withDBCtxProvider,
  I_DB_CTX,
  I_PAGE_CTX,
} from '@ctxs/index';

import { SnapList, Post, Header, Tags, Canlendar } from '@widgets/index';

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
    );
  }
}

render(<App />, document.getElementById('main'));
