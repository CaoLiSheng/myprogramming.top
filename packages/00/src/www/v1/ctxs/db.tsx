import { EmptySchema, HOCDecrator, Schema } from '@common/index';
import React, { Component, ComponentType, createContext } from 'react';

export interface I_DB_CTX {
  db: Schema;
  load: ( db: Schema ) => void;
}

export const { Provider: SetDB, Consumer: GetDB } = createContext ( {} );

export function injectDBCtx (): HOCDecrator<{ db?: I_DB_CTX }> {
  return <P extends { db?: I_DB_CTX }> ( WrappedComponent: ComponentType<P> ) => ( props: P ) => (
    <GetDB>
      {( ctx: unknown ) => <WrappedComponent { ...props } db={ ctx as I_DB_CTX } /> }
    </GetDB>
  );
}

export function withDBCtxProvider (): HOCDecrator<{ db?: I_DB_CTX }> {
  return <P extends { db?: I_DB_CTX }> ( WrappedComponent: ComponentType<P> ) => class extends Component<P, I_DB_CTX> {

    constructor ( props: P ) {
      super ( props );

      this.state = { db: EmptySchema, load: this.load };
    }

    load = ( db: Schema ) => this.setState ( { db } );

    public render () {
      return (
        <SetDB value={ this.state }>
          <WrappedComponent { ...this.props } db={ this.state } />
        </SetDB>
      );
    }
  };
}
