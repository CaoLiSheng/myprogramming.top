import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { __dirs__ } from '@common/index';

import './index.scss';

export class Post extends Component<RouteComponentProps<{ name: string }>> {
  render() {
    return (
      <iframe
        className="detail"
        sandbox="allow-scripts allow-popups"
        src={`${__dirs__.__posts_root__}${
          this.props.match.params.name
        }.html?var=${Date.now()}`}
      />
    );
  }
}
