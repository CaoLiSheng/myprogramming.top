import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { __posts_root__ } from '@common/index';

import './index.scss';

export class Post extends Component<RouteComponentProps<{ name: string }>> {
  render() {
    return (
      <iframe
        className="detail"
        src={`${__posts_root__}${this.props.match.params.name}.html`}
      />
    );
  }
}
