import './index.scss';

import { Binder } from '@v1/utils/KeyBinder';
import classNames from 'classnames';
import React, { Component, ElementType, ReactElement } from 'react';

interface OverlayProps {
  Icon: ElementType;
  Content: ElementType;
  contentShrinkPos: string;
  positionStyleObj: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
}

interface OverlayStates {
  opening: boolean;
}

export class Overlay extends Component<OverlayProps, OverlayStates> {

  private bindReceiveMessage = this.receiveMessage.bind ( this );

  private bindToggleOverlay = this.toggleOverlay.bind ( this );

  private bindHotKeys = Binder.bindDoubleSpaceKey.bind ( Binder, this.bindToggleOverlay );

  constructor ( props: OverlayProps ) {
    super ( props );

    this.state = { opening: false };
  }

  componentDidMount (): void {
    window.addEventListener ( 'message', this.bindReceiveMessage, false );
    window.addEventListener ( 'keypress', this.bindHotKeys, false );
  }

  componentWillUnmount (): void {
    window.removeEventListener ( 'message', this.bindReceiveMessage );
    window.removeEventListener ( 'keypress', this.bindHotKeys );
  }

  private toggleOverlay () {
    this.setState ( ( { opening } ) => ( { opening: !opening } ) );
  }

  private receiveMessage ( ev: MessageEvent ) {
    if ( ev.data === 'iframe.detail double.space' ) {
      this.toggleOverlay ();
    }
  }

  render (): ReactElement {
    const { Icon, Content, positionStyleObj, contentShrinkPos } = this.props;
    const { opening } = this.state;

    return (
      <div className="overlay-wrapper">
        <div
          className={ classNames ( 'overlay-mask', { opening } ) }
          onClick={ this.bindToggleOverlay }
        />
        <div
          style={ { ...positionStyleObj, transformOrigin: contentShrinkPos } }
          className={ classNames ( 'overlay-content', { opening } ) }
        >
          <Content />
        </div>
        <div
          style={ { ...positionStyleObj } }
          className={ classNames ( 'overlay-icon', { opening } ) }
          onClick={ this.bindToggleOverlay }
        >
          <Icon />
        </div>
      </div>
    );
  }
}
