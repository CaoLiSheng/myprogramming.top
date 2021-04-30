import './index.scss';

import { Binder } from '@v1/utils/KeyBinder';
import { Popup } from '@rWidgets/index';
import React, { Component, ElementType, ReactElement } from 'react';

interface USearchProps {
  Icon: ElementType;
  positionStyleObj: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
}

export class USearch extends Component<USearchProps> {

  private bindToggle = this.toggle.bind ( this );

  private bindHotKeys = Binder.bindDoubleSpaceKey.bind ( Binder, this.bindToggle );

  componentDidMount (): void {
    window.addEventListener ( 'keypress', this.bindHotKeys, false );
  }

  componentWillUnmount (): void {
    window.removeEventListener ( 'keypress', this.bindHotKeys );
  }

  private toggle (): void {
    
  }

  render (): ReactElement {
    const { Icon, positionStyleObj } = this.props;

    return (
      <Popup
        position="top-right"
        actions={[ "click" ]}
        Trigger={ (
          <div
            className="usearch-icon"
            style={ { ...positionStyleObj } }
          >
            <Icon />
          </div>
        ) }
        Popper={ (
          <div className="usearch-panel">
            <h1 className="tmp-tips">Coming Soon...</h1>
          </div>
        ) }
      />   
    );
  }
}
