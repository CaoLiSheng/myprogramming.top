import React, { createContext, ComponentType, Component } from 'react';

import { HOCDecrator } from '@common/index';

export const PAGE_SIZE = 6;

export interface PAGE_INFO {
  cur: number;
  min: number;
  max: number;
  data: string[];
}

export interface PAGE_SCHEMA {
  [key: string]: PAGE_INFO;
}

export interface I_PAGE_CTX_DATA {
  page?: PAGE_SCHEMA;
}

export const { Provider: SetPageData, Consumer: GetPageData } = createContext({
  page: {},
});

export function injectPageData(): HOCDecrator<I_PAGE_CTX_DATA> {
  return <P extends I_PAGE_CTX_DATA>(WrappedComponent: ComponentType<P>) =>
    class extends React.Component<P> {
      public render() {
        return (
          <GetPageData>
            {({ page }) => <WrappedComponent {...this.props} page={page} />}
          </GetPageData>
        );
      }
    };
}

export interface I_PAGE_CTX_OPS {
  change?: (_: string, __: number) => void;
  update?: (_: string, __: string[]) => void;
}

export const {
  Provider: SetupPageDataOps,
  Consumer: UsePageDataOps,
} = createContext({
  change: (_: string, __: number) => {},
  update: (_: string, __: string[]) => {},
});

export function injectPageOps(): HOCDecrator<I_PAGE_CTX_OPS> {
  return <P extends I_PAGE_CTX_OPS>(WrappedComponent: ComponentType<P>) =>
    class extends Component<P> {
      public render() {
        return (
          <UsePageDataOps>
            {({ change, update }) => (
              <WrappedComponent
                {...this.props}
                change={change}
                update={update}
              />
            )}
          </UsePageDataOps>
        );
      }
    };
}

export const PATH_PAGER_MAP = {
  '/': 'homepage',
  '/tags/:tags': 'tagspage',
  '/canlendar/:year/:month/:date': 'datepage',
};

export function withPageCtxProvider(): HOCDecrator<object> {
  return <P extends object>(WrappedComponent: ComponentType<P>) =>
    class extends Component<P, { page: PAGE_SCHEMA }> {
      state = { page: {} };

      changePage = (key: string, cur: number) =>
        this.setState(({ page }) => {
          const info = page[key] || {};
          return { page: { ...page, [key]: { ...info, cur } } };
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

      public render() {
        return (
          <SetPageData value={this.state}>
            <SetupPageDataOps
              value={{
                change: this.changePage,
                update: this.updatePage,
              }}
            >
              <WrappedComponent {...this.props} />
            </SetupPageDataOps>
          </SetPageData>
        );
      }
    };
}
