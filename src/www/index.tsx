import React, { Component, ErrorInfo } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { __dirs__, Schema } from '@common/index';
import {
  withPageCtxProvider,
  withDBCtxProvider,
  I_DB_CTX,
  I_PAGE_CTX,
} from '@ctxs/index';

import { Home, Post, Header, Tags, Canlendar } from '@widgets/index';

import './index.scss';
// import CategoryEntrySVG from '@images/category-icon.svg';

interface AppStates {
  hasError: boolean;
}

const flyWindow = (
  source: Window | MessagePort | ServiceWorker | null
): Window | ServiceWorker | null => {
  if (source instanceof MessagePort) return null;
  return source;
};

@withDBCtxProvider()
@withPageCtxProvider()
class App extends Component<{ db?: I_DB_CTX; page?: I_PAGE_CTX }, AppStates> {
  state = { hasError: false };

  private handlers: { [key: string]: (event: MessageEvent) => void } = {
    'is-it-time-to-show': this.showTime,
    'please-open-in-new-tab': this.openInNewTab,
  };

  private showTime(event: MessageEvent) {
    flyWindow(event.source)?.postMessage(
      `show-time ${event.data.split(' ')[1]}`,
      '*'
    );
  }

  private openInNewTab(event: MessageEvent) {
    window.open(event.data.split(' ')[1], '_blank');
  }

  private receiveMessage = (event: MessageEvent) => {
    if (typeof event.data === 'string') {
      const [key] = event.data.split(' ');
      this.handlers[key] && this.handlers[key](event);
    }
  };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo.componentStack);
  }

  async componentDidMount() {
    window.top.addEventListener('message', this.receiveMessage, false);

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

  componentWillUnmount() {
    window.top.removeEventListener('message', this.receiveMessage);
  }

  render() {
    if (this.state.hasError) return <h1 className="failure">出错了</h1>;

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:name" component={Post} />
          <Route path="/tags/:tags" component={Tags} />
          <Route path="/canlendar/:year/:month/:date" component={Canlendar} />
        </Switch>
        <Route
          path={[
            '/canlendar/:year/:month/:date',
            '/tags/:tags',
            '/post/:name',
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
    );
  }
}

import('react-dom').then(({ render }) =>
  render(<App />, document.getElementById('main'))
);
