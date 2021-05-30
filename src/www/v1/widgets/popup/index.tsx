import './index.scss';

import { __conf__ } from '@utils/conf';
import { Binder } from '@v1/utils/KeyBinder';
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

type ActionKey = 'hover' | 'click';
type ActionCfg = { keypress: string, global?: boolean };

type SupportedAction =
  | ActionKey
  | ActionCfg;

const extractKey = ( action: SupportedAction ) => {
  if ( typeof action === 'string' ) {
    return action;
  }
  const keys = Object.keys ( action );
  return keys.length > 0 ? keys[0] : '';
}

type KeyBinderConf = Map<string, ( ( evt: KeyboardEvent ) => void )>;

interface Actions {
  [key: string]: ( evt: Event ) => void;
}

type ActionsCfg = Actions | ( ( cfg: ActionCfg ) => Actions );
type ActionConf = Map<string, ActionsCfg>;

interface PopupProps {
  position: Pos;
  actions: SupportedAction[];
  Trigger: ReactElement;
  Popper: ReactElement;
}

interface PopupStates {
  open: boolean;
  activeActions: Actions;
  globalActions: Actions;
}

export class Popup extends Component<PopupProps, PopupStates> {

  private el: HTMLDivElement;

  private triggerRef = createRef<HTMLElement> ();

  private actionConf: ActionConf = new Map ();

  private keyBinderConf: KeyBinderConf = new Map ();

  constructor ( props: PopupProps ) {
    super ( props );

    this.state = { open: false, activeActions: {}, globalActions: {} };
    
    this.el = document.createElement ( 'div' );
    this.el.classList.add ( 'popup' );

    this.keyBinderConf.set ( 'double-space',
      Binder.bindDoubleSpaceKey.bind ( Binder,
        () => this.setState ( ( { open } ) => ( { open: !open } ) )
      )
    );

    this.actionConf.set ( 'hover', {
      onMouseEnter: () => this.setState ( { open: true } ),
      onMouseLeave: () => this.setState ( { open: false } ),
    } );
    this.actionConf.set ( 'click', {
      onClick: () => this.setState ( ( { open } ) => ( { open: !open } ) ),
    } );
    this.actionConf.set ( 'keypress', ( cfg: ActionCfg ) => ( {
      keypress: ( evt: Event ) => {
        const binder = this.keyBinderConf.get ( cfg.keypress );
        if ( binder ) {
          binder ( evt as KeyboardEvent );
        }
      },
    } ) );
  }

  componentDidMount (): void {
    __conf__.__popups_container__.append ( this.el );

    const { actions } = this.props;

    const activeActions: Actions = {};
    const globalActions: Actions = {};
    for ( const action of actions ) {
      let evtConf = this.actionConf.get ( extractKey ( action ) );
      if ( typeof evtConf === 'function' ) {
        evtConf = evtConf ( action as ActionCfg );
      }

      if ( evtConf ) {
        const targetActions: Actions = typeof action === 'object' && action.global ? globalActions : activeActions;

        for ( const [ evtName, evtHandler ] of Object.entries ( evtConf ) ) {
          targetActions[evtName] = evtHandler;
        }
      }
    }

    this.setState ( { activeActions, globalActions }, () => {
      for ( const [ evtName, evtHandler ] of Object.entries ( globalActions ) ) {
        window.addEventListener ( evtName,  evtHandler, false );
      }
    } );
  }

  componentWillUnmount (): void {
    this.el.remove ();

    const { globalActions } = this.state;
    for ( const [ evtName, evtHandler ] of Object.entries ( globalActions ) ) {
      window.removeEventListener ( evtName,  evtHandler );
    }
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
    const { Trigger } = this.props;
    const { activeActions } = this.state;

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
