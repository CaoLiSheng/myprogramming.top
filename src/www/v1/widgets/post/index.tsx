import './index.scss';

import { __dirs__ } from '@www/utils/dir';
import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export const Post = ( props: RouteComponentProps<{ name: string }> ): ReactElement => (
  <iframe
    className="detail"
    sandbox="allow-same-origin allow-scripts allow-top-navigation allow-downloads"
    src={ `${ __dirs__.__posts_root__ }${ props.match.params.name }.html?var=${ Date.now() }` }
  />
);
