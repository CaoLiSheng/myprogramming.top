import React, { createContext, ComponentType, Component } from 'react';

import { HOCDecrator } from '@common/index';

export const PAGE_SIZE = 6;

export const PATH_PAGER_MAP = {
  '/': 'homepage',
  '/tags/:tags': 'tagspage',
  '/canlendar/:year/:month/:date': 'datepage',
};

export interface PAGE_INFO {
  cur: number;
  min: number;
  max: number;
  data: string[];
}

export interface PAGE_SCHEMA {
  [key: string]: PAGE_INFO;
}

export interface I_PAGE_CTX {
  page: PAGE_SCHEMA;
  change: (_: string, __: number) => void;
  update: (_: string, __: string[]) => void;
}

export const { Provider: SetPage, Consumer: GetPage } = createContext({
  page: {},
  change: (_: string, __: number) => {},
  update: (_: string, __: string[]) => {},
});

export function injectPageCtx(): HOCDecrator<{ page?: I_PAGE_CTX }> {
  return <P extends { page?: I_PAGE_CTX }>(
    WrappedComponent: ComponentType<P>
  ) =>
    class extends React.Component<P> {
      public render() {
        return (
          <GetPage>
            {(page: I_PAGE_CTX) => (
              <WrappedComponent {...this.props} page={page} />
            )}
          </GetPage>
        );
      }
    };
}

export function withPageCtxProvider(): HOCDecrator<{ page?: I_PAGE_CTX }> {
  return <P extends { page?: I_PAGE_CTX }>(
    WrappedComponent: ComponentType<P>
  ) =>
    class extends Component<P, I_PAGE_CTX> {
      changePage = (key: string, cur: number) =>
        this.setState(({ page }) => {
          const info = page?.[key] || { min: 0, max: 0, data: [] };
          return { page: { ...(page || {}), [key]: { ...info, cur } } };
        });

      updatePage = (key: string, data: string[]) =>
        this.setState(({ page }) => ({
          page: {
            ...page,
            [key]: {
              cur: 0,
              min: 0,
              max: Math.max(0, Math.ceil(data.length / PAGE_SIZE) - 1),
              data,
            },
          },
        }));

      state = { page: {}, change: this.changePage, update: this.updatePage };

      public render() {
        return (
          <SetPage value={this.state}>
            <WrappedComponent {...this.props} page={this.state} />
          </SetPage>
        );
      }
    };
}
