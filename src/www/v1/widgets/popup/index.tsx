import './index.scss';

import { __conf__ } from '@utils/conf';
import { HTMLElementOffset, getOffset } from '@utils/dom';
import React, {
  Component,
  ReactElement,
  cloneElement,
  createRef,
} from 'react';
import { createPortal } from 'react-dom';

interface PositionStyle {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  transform?: string;
}

const posMain = ( main: string, offset: HTMLElementOffset, style: PositionStyle = {} ) => {
  switch ( main ) {
    case 'top':
      style.bottom = window.innerHeight - offset.top;
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

const posImpl = ( modes: string[], offset: HTMLElementOffset ): PositionStyle => {
  let style = {};
  style = posMain ( modes[ 0 ], offset, style );
  style = posCross ( modes[ 1 ], offset, style );
  style = posCenter ( modes, offset, style );
  return style;
};

type Pos =
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

const position = ( pos: Pos, offset: HTMLElementOffset ) => {
  const modes = pos.split ( '-' );
  modes[ 1 ] = modes[ 1 ] || 'center';
  return posImpl ( modes, offset );
};

type SupportedAction =
  | 'hover'
  | 'click';

interface Actions {
  [key: string]: () => void;
}

type ActionConf = Map<SupportedAction, Actions>;

interface PopupProps {
  position: Pos;
  actions: SupportedAction[];
  Trigger: ReactElement;
  Popper: ReactElement;
}

interface PopupStates {
  open: boolean;
}

export class Popup extends Component<PopupProps, PopupStates> {

  private el: HTMLDivElement;

  private triggerRef = createRef<HTMLElement> ();

  private actionConf: ActionConf = new Map ();

  constructor ( props: PopupProps ) {
    super ( props );

    this.state = { open: false };
    
    this.el = document.createElement ( 'div' );
    this.el.classList.add ( 'popup' );

    this.actionConf.set ( 'hover', {
      onMouseEnter: () => this.setState ( { open: true } ),
      onMouseLeave: () => this.setState ( { open: false } ),
    } );
    this.actionConf.set ( 'click', {
      onClick: () => this.setState ( ( { open } ) => ( { open: !open } ) ),
    } );
  }

  componentDidMount (): void {
    __conf__.__popups_container__.append ( this.el );
  }

  componentWillUnmount (): void {
    this.el.remove ();
  }

  private renderPopper ( activeActions: Actions ) {
    const { Popper, actions } = this.props;

    if ( actions.includes ( 'click' ) ) {
      return (
        <>
          <div
            {...activeActions}
            className="popup-mask"
          />
          {Popper}
        </>
      );
    } 
    
    return Popper;
  }

  private renderPortal ( activeActions: Actions ) {
    const { open } = this.state;

    if ( open ) {
      this.el.classList.add ( 'open' );

      const posStyles = position (
        this.props.position,
        getOffset ( this.triggerRef.current ),
      );
  
      for ( const [ prop, value ] of Object.entries ( posStyles ) ) {
        this.el.style.setProperty (
          prop,
          typeof value === 'number' ? `${ value }px` : value
        );
      }
    } else {
      this.el.classList.remove ( 'open' );
    }

    return createPortal ( this.renderPopper ( activeActions ), this.el );
  }

  render (): ReactElement {
    const { Trigger, actions } = this.props;

    const activeActions: Actions = {};
    for ( const action of actions ) {
      const evtConf = this.actionConf.get ( action );
      if ( evtConf ) {
        for ( const [ evtName, evtHandler ] of Object.entries ( evtConf ) ) {
          activeActions[evtName] = evtHandler;
        }
      }
    }

    return (
      <>
        {cloneElement ( Trigger, {
          ...activeActions,
          ref: this.triggerRef,
        } ) }
        {this.renderPortal ( activeActions ) }
      </>
    );
  }
}
