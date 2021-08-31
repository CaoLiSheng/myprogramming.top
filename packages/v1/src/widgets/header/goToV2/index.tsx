import { FuZhouIcon } from 'commons/src/www/images/index';
import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

declare let __portal_to_v1__: string;

export default ( props: RouteComponentProps<{ name: string }> ): ReactElement => (
  <a
    className="flag icon pc"
    title="去新版网站"
    href={ __portal_to_v1__ + props.match.params.name }
  >
    <FuZhouIcon />
  </a>
);
