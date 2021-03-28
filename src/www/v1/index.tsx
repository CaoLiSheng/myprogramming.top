import './index.scss';

import { Schema } from '@common/index';
import { CmdAndSpaceIcon } from '@images/index';
import {
  I_DB_CTX,
  I_PAGE_CTX,
  withDBCtxProvider,
  withPageCtxProvider,
} from '@rCtxs/index';
import {
  Canlendar,
  Header,
  Home,
  Overlay,
  Post,
  Tags,
  Search,
} from '@rWidgets/index';
import { __dirs__ } from '@www/utils/dir';
import React, { Component, ErrorInfo } from 'react';
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

interface AppProps {
  db?: I_DB_CTX;
  page?: I_PAGE_CTX
}

interface AppStates {
  hasError: boolean;
}

@withDBCtxProvider()
@withPageCtxProvider()
class App extends Component<AppProps, AppStates> {
  constructor ( props: AppProps ) {
    super( props );

    this.state = { hasError: false };
  }

  static getDerivedStateFromError ( _: Error ) {
    return { hasError: true };
  }

  async componentDidMount () {
    const resp = await fetch( __dirs__.__posts_db__, {
      method: 'GET',
      mode: 'cors',
    } );
    const db: Schema = await resp.json();

    this.props.db?.load( db );
    // this.props.page?.update('homepage', db.sortedPosts);
  }

  shouldComponentUpdate () {
    return false;
  }

  componentDidCatch ( error: Error, errorInfo: ErrorInfo ) {
    console.log( error, errorInfo.componentStack );
  }

  render () {
    if ( this.state.hasError ) return <h1 className="failure">出错了</h1>;

    return (
      <div id="main">
        <HashRouter>
          <Switch>
            <Redirect exact path="/" to="/home" />
            <Route exact path="/post/:name" component={ Post } />
            <Route exact path="/home" component={ Home } />
            <Route exact path="/home/p/:page" component={ Home } />
            <Route exact path="/tags/:tags" component={ Tags } />
            <Route exact path="/tags/:tags/p/:page" component={ Tags } />
            <Route
              exact
              path="/canlendar/:year/:month/:date"
              component={ Canlendar }
            />
            <Route
              exact
              path="/canlendar/:year/:month/:date/p/:page"
              component={ Canlendar }
            />
          </Switch>
          <Route
            path={ [
              '/canlendar/:year/:month/:date/p/:page',
              '/canlendar/:year/:month/:date',
              '/tags/:tags/p/:page',
              '/tags/:tags/',
              '/home/p/:page',
              '/home',
              '/post/:name',
            ] }
            component={ Header }
          />
          <Overlay
            Icon={ CmdAndSpaceIcon }
            Content={ Search }
            contentShrinkPos="100% 100% 0"
            positionStyleObj={ { right: '0.1rem', bottom: '0.1rem' } }
          />
        </HashRouter>
      </div>
    );
  }
}

void import( 'react-dom' ).then( ( { render } ) => render( <App />, document.querySelector( '#app' ) ) );

// (async () => {
//   const { render } = await import('react-dom');
//   render(<App />, document.getElementById('main'));
// })();

// import { render } from 'react-dom';
// render(<App />, document.getElementById('main'));
