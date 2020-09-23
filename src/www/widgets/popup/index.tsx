import React, {
  Component,
  ReactElement,
  cloneElement,
  Fragment,
  createRef,
} from 'react';

import './index.scss';

interface PopupProps {
  position: ('bottom' | 'right' | 'top' | 'left')[];
  Trigger: ReactElement;
  Popper: ReactElement;
}

interface PopupStates {
  open: boolean;
}

export class Popup extends Component<PopupProps, PopupStates> {
  state = { open: false };

  private triggerRef = createRef<HTMLElement>();

  private posStep1(style = {}) {
    switch (this.props.position[0]) {
      case 'bottom':
        style['top'] =
          (this.triggerRef.current?.offsetTop || 0) +
          (this.triggerRef.current?.offsetHeight || 0);
        break;
    }
    return style;
  }

  private posStep2(style = {}) {
    switch (this.props.position[1]) {
      case 'right':
        style['right'] =
          window.innerWidth -
          (this.triggerRef.current?.offsetLeft || 0) -
          (this.triggerRef.current?.offsetWidth || 0);
        break;
    }
    return style;
  }

  private renderPopper() {
    const { Popper } = this.props;

    return cloneElement(Popper, {
      className: `popper ${Popper.props.className}`,
      style: this.posStep2(this.posStep1()),
    });
  }

  render() {
    const { Trigger } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {cloneElement(Trigger, {
          ref: this.triggerRef,
          onMouseEnter: () => this.setState({ open: true }),
          onMouseLeave: () => this.setState({ open: false }),
        })}
        {open && this.renderPopper()}
      </Fragment>
    );
  }
}
