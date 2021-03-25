import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { __dirs__ } from '@www/utils/dir';

import './index.scss';

export const Post = ( props: RouteComponentProps<{ name: string }> ) => (
  <iframe
    className="detail"
    sandbox="allow-same-origin allow-scripts allow-top-navigation allow-downloads"
    src={ `${ __dirs__.__posts_root__ }${ props.match.params.name
      }.html?var=${ Date.now() }` }
  />
);
