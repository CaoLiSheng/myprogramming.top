import React, {
  Component,
  ReactElement,
  cloneElement,
  Fragment,
  createRef,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import './index.scss';

const popupsContainer: HTMLDivElement = document.getElementById(
  'popups-container'
) as HTMLDivElement;

interface HTMLElementOffset {
  top: number;
  left: number;
  width: number;
  height: number;
}

const getOffset = (ele?: HTMLElement | null): HTMLElementOffset => {
  if (!ele) return { top: 0, left: 0, width: 0, height: 0 };

  const offset = {
    top: 0,
    left: 0,
    width: ele.offsetWidth,
    height: ele.offsetHeight,
  };

  while (ele.offsetParent) {
    offset.top += ele.offsetTop;

    offset.left += ele.offsetLeft;

    if (ele.offsetParent instanceof HTMLElement) {
      ele = ele.offsetParent;
    } else {
      return offset;
    }
  }

  return offset;
};

const posVertical = (vMode: string, offset: HTMLElementOffset, style = {}) => {
  switch (vMode) {
    case 'bottom':
      style['top'] = offset.top + offset.height;
      break;
  }
  return style;
};

const posHorizontal = (
  hMode: string,
  offset: HTMLElementOffset,
  style = {}
) => {
  switch (hMode) {
    case 'right':
      style['right'] = window.innerWidth - offset.left - offset.width;
      break;
  }
  return style;
};

type pos = 'bottom' | 'right' | 'top' | 'left';

const position = (modes: pos[], offset: HTMLElementOffset) => {
  const style = posVertical(modes[0], offset);
  return posHorizontal(modes[1], offset, style);
};

interface PopupProps {
  position: pos[];
  Trigger: ReactElement;
  Popper: ReactElement;
}

interface PopupStates {
  open: boolean;
}

export class Popup extends Component<PopupProps, PopupStates> {
  state = { open: false };

  constructor(props: PopupProps) {
    super(props);
    this.el = document.createElement('div');
  }

  private el: HTMLDivElement;
  private triggerRef = createRef<HTMLElement>();

  componentDidMount() {
    popupsContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    popupsContainer.removeChild(this.el);
  }

  private renderPopper() {
    const { Popper } = this.props;
    const { open } = this.state;

    return createPortal(
      <div
        className={classNames('popup', { open })}
        style={position(
          this.props.position,
          getOffset(this.triggerRef.current)
        )}
      >
        {Popper}
      </div>,
      this.el
    );
  }

  render() {
    const { Trigger } = this.props;

    return (
      <Fragment>
        {cloneElement(Trigger, {
          ref: this.triggerRef,
          onMouseEnter: () => this.setState({ open: true }),
          onMouseLeave: () => this.setState({ open: false }),
        })}
        {this.renderPopper()}
      </Fragment>
    );
  }
}
