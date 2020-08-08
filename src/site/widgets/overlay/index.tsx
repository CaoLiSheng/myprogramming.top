import React, { Component } from 'react';
import classNames from 'classnames';

import './index.scss';

interface OverlayProps {
  icon: string;
  positionStyleObj: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  contentShrinkPos: string;
}

interface OverlayStates {
  opening: boolean;
}

export class Overlay extends Component<OverlayProps, OverlayStates> {
  state = { opening: false };

  render() {
    const { icon, positionStyleObj, contentShrinkPos } = this.props;
    const { opening } = this.state;

    return (
      <div className="overlay-wrapper">
        <div
          className={classNames('overlay-mask', { opening })}
          onClick={() => this.setState({ opening: false })}
        />
        <div
          style={{ ...positionStyleObj, transformOrigin: contentShrinkPos }}
          className={classNames('overlay-content', { opening })}
        ></div>
        <a
          style={{ ...positionStyleObj, backgroundImage: `url(${icon})` }}
          className={classNames('overlay-icon', { opening })}
          onClick={() => this.setState({ opening: true })}
        ></a>
      </div>
    );
  }
}
