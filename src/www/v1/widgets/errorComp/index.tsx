import React, { ReactElement } from 'react';

export const ErrorComp = (): ReactElement => {
  throw new Error ( 'WhBt' );
  return <div />;
}
