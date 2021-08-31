import './index.scss';

import { Popup } from '@rWidgets/index';
import React, { ElementType, ReactElement } from 'react';

interface USearchProps {
  Icon: ElementType;
  positionStyleObj: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
}

export const USearch = ( { Icon, positionStyleObj }: USearchProps ): ReactElement => (
      <Popup
        position="top-right"
        actions={[ "click", { keypress: "double-space", global: true } ]}
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
