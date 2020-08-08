import React, { createContext, ComponentType, Component } from 'react';

import { EmptySchema, Schema, HOCDecrator } from '@common/index';

export const DB_CTX = createContext({ db: EmptySchema });

export function injectDBCtx(): HOCDecrator<Schema> {
  return <P extends Schema>(WrappedComponent: ComponentType<P>) =>
    class extends Component<P> {
      public render() {
        return (
          <DB_CTX.Consumer>
            {({ db }) => <WrappedComponent {...this.props} {...db} />}
          </DB_CTX.Consumer>
        );
      }
    };
}
