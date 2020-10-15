import React, { createContext, ComponentType, Component } from 'react';

import { HOCDecrator } from '@common/index';

export const PAGE_SIZE = 6;

export const PATH_PAGER_MAP = {
  '/': 'homepage',
  '/:page': 'homepage',
  '/tags/:tags': 'tagspage',
  '/tags/:tags/:page': 'tagspage',
  '/canlendar/:year/:month/:date': 'datepage',
  '/canlendar/:year/:month/:date/:page': 'datepage',
};

export const APPENDING_PATH_PAGER_MAP = [
  '/tags/:tags',
  '/canlendar/:year/:month/:date',
];

export const REPLACING_PATH_PAGER_MAP = [
  '/',
  '/:page',
  '/tags/:tags/:page',
  '/canlendar/:year/:month/:date/:page',
];

export function buildPagerPath(
  info: { path: string; url: string },
  page: number
): string {
  const paths = info.url.split('/');
  if (APPENDING_PATH_PAGER_MAP.includes(info.path)) {
    paths.push(`${page}`);
  } else if (REPLACING_PATH_PAGER_MAP.includes(info.path)) {
    paths[paths.length - 1] = `${page}`;
  }
  return paths.join('/');
}

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
  update: (key: string, value: string[], cur?: number) => void;
}

export const { Provider: SetPage, Consumer: GetPage } = createContext({});

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
      updatePage = (key: string, data: string[], cur?: number) =>
        this.setState(
          ({ page }) => ({
            page: {
              ...page,
              [key]: {
                cur: cur || 0,
                min: 0,
                max: Math.max(0, Math.ceil(data.length / PAGE_SIZE) - 1),
                data,
              },
            },
          }),
          () => window.scrollTo(0, 0)
        );

      state = { page: {}, update: this.updatePage };

      public render() {
        return (
          <SetPage value={this.state}>
            <WrappedComponent {...this.props} page={this.state} />
          </SetPage>
        );
      }
    };
}
