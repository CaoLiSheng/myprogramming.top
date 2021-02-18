import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { GateIcon } from '@images/index';

declare var __portal_to_v2__: string;

export default class extends Component<RouteComponentProps<{ name: string }>> {
  render() {
    return (
      <a
        className="icon pc"
        title="去新版网站"
        href={__portal_to_v2__ + this.props.match.params.name + '.html'}
      >
        <GateIcon />
      </a>
    );
  }
}
