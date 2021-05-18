import { GateIcon } from '@images/index';
import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

declare let __portal_to_v2__: string;

export default ( props: RouteComponentProps<{ name: string }> ): ReactElement => (
  <a
    className="icon pc"
    title="去新版网站"
    href={ __portal_to_v2__ + props.match.params.name }
  >
    <GateIcon />
  </a>
);
