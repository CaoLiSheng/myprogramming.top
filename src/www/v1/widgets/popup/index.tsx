import React, {
  Component,
  ReactElement,
  cloneElement,
  createRef,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { HTMLElementOffset, getOffset } from '@www/utils/offset';

import './index.scss';

interface PositionStyle {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  transform?: string;
}

const popupsContainer: HTMLDivElement = document.querySelector(
  '#popups-container',
) as HTMLDivElement;

const posMain = ( main: string, offset: HTMLElementOffset, style: PositionStyle = {} ) => {
  switch ( main ) {
    case 'top':
      style.bottom = offset.top;
      break;
    case 'right':
      style.left = offset.left + offset.width;
      break;
    case 'bottom':
      style.top = offset.top + offset.height;
      break;
    case 'left':
      style.right = window.innerWidth - offset.left;
      break;
    default:
      break;
  }
  return style;
};

const posCross = ( cross: string, offset: HTMLElementOffset, style: PositionStyle = {} ) => {
  if ( cross === 'center' ) return style;

  switch ( cross ) {
    case 'top':
      style.top = offset.top;
      break;
    case 'right':
      style.right = window.innerWidth - offset.left - offset.width;
      break;
    case 'bottom':
      style.bottom = window.innerHeight - offset.top - offset.height;
      break;
    case 'left':
      style.left = offset.left;
      break;
    default:
      break;
  }
  return style;
};

const posCenter = ( modes: string[], offset: HTMLElementOffset, style: PositionStyle = {} ) => {
  const [ mainAxis, crossAxis ] = modes;
  if ( crossAxis !== 'center' ) return style;

  switch ( mainAxis ) {
    case 'left':
    case 'right':
      style.top = offset.top + offset.height / 2;
      style.transform = 'translateY(-50%)';
      break;
    case 'top':
    case 'bottom':
      style.left = offset.left + offset.width / 2;
      style.transform = 'translateX(-50%)';
      break;
    default:
      break;
  }
  return style;
};

const posImpl = ( modes: string[], offset: HTMLElementOffset ) => {
  let style = {};
  style = posMain( modes[ 0 ], offset, style );
  style = posCross( modes[ 1 ], offset, style );
  style = posCenter( modes, offset, style );
  return style;
};

type pos =
  | 'bottom'
  | 'right'
  | 'top'
  | 'left'
  | 'bottom-left'
  | 'bottom-right'
  | 'right-top'
  | 'right-bottom'
  | 'top-left'
  | 'top-right'
  | 'left-top'
  | 'left-bottom';

const position = ( pos: pos, offset: HTMLElementOffset ) => {
  const modes = pos.split( '-' );
  modes[ 1 ] = modes[ 1 ] || 'center';
  return posImpl( modes, offset );
};

interface PopupProps {
  position: pos;
  Trigger: ReactElement;
  Popper: ReactElement;
}

interface PopupStates {
  open: boolean;
}

export class Popup extends Component<PopupProps, PopupStates> {

  private el: HTMLDivElement;

  private triggerRef = createRef<HTMLElement>();

  constructor ( props: PopupProps ) {
    super( props );

    this.state = { open: false };
    this.el = document.createElement( 'div' );
  }

  componentDidMount () {
    popupsContainer.append( this.el );
  }

  componentWillUnmount () {
    this.el.remove();
  }

  private renderPopper () {
    const { Popper } = this.props;
    const { open } = this.state;

    return createPortal(
      <div
        className={ classNames( 'popup', { open } ) }
        style={ position(
          this.props.position,
          getOffset( this.triggerRef.current ),
        ) }
      >
        { Popper }
      </div>,
      this.el,
    );
  }

  render () {
    const { Trigger } = this.props;

    return (
      <>
        {cloneElement( Trigger, {
          ref: this.triggerRef,
          onMouseEnter: () => this.setState( { open: true } ),
          onMouseLeave: () => this.setState( { open: false } ),
        } ) }
        {this.renderPopper() }
      </>
    );
  }
}
