import React, { createContext, ComponentType, Component } from 'react';

import { EmptySchema, Schema, HOCDecrator } from '@common/index';

export interface I_DB_CTX {
  db: Schema;
  load: (db: Schema) => void;
}

export const { Provider: SetDB, Consumer: GetDB } = createContext({});

export function injectDBCtx(): HOCDecrator<{ db?: I_DB_CTX }> {
  return <P extends { db?: I_DB_CTX }>(WrappedComponent: ComponentType<P>) =>
    class extends Component<P> {
      public render() {
        return (
          <GetDB>
            {(ctx: I_DB_CTX) => <WrappedComponent {...this.props} db={ctx} />}
          </GetDB>
        );
      }
    };
}

export function withDBCtxProvider(): HOCDecrator<{ db?: I_DB_CTX }> {
  return <P extends { db?: I_DB_CTX }>(WrappedComponent: ComponentType<P>) =>
    class extends Component<P, I_DB_CTX> {
      load = (db: Schema) => this.setState({ db });

      state = { db: EmptySchema, load: this.load };

      public render() {
        return (
          <SetDB value={this.state}>
            <WrappedComponent {...this.props} db={this.state} />
          </SetDB>
        );
      }
    };
}
