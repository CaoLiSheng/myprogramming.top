import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';

import {
  PATH_PAGER_MAP,
  PAGE_INFO,
  injectPageCtx,
  I_PAGE_CTX,
} from '@rCtxs/index';

import './index.scss';
import { LeftIcon } from '@images/index';

@injectPageCtx()
export default class Pager extends Component<
  RouteComponentProps & { page?: I_PAGE_CTX },
  { inputValue: string; curPage: number }
> {
  state = { inputValue: '', curPage: 0 };

  getPager = (): { pager: PAGE_INFO; pagerKey: string } | null => {
    let pager: PAGE_INFO | undefined;

    const pagerKey: string = PATH_PAGER_MAP[this.props.match.path];
    if (!pagerKey || !(pager = this.props.page?.page[pagerKey])) {
      return null;
    }

    return { pager, pagerKey };
  };

  change = (change: (cur: number) => void, cur: number) => {
    this.setState(
      { inputValue: `${cur}`, curPage: cur },
      () => change && change(cur)
    );
  };

  onChange = (
    pager: PAGE_INFO,
    change: (cur: number) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
    let cur = parseInt(event.target.value);
    const normal = !isNaN(cur);
    console.log(normal);
    if (normal) {
      cur = Math.max(pager.min, Math.min(pager.max, cur));
    }

    this.setState(
      ({ curPage }) => ({
        inputValue: normal ? `${cur}` : '',
        curPage: normal ? cur : curPage,
      }),
      () => normal && change && change(cur)
    );
  };

  componentDidUpdate(prevProps: RouteComponentProps & { page?: I_PAGE_CTX }) {
    if (prevProps.match.url !== this.props.match.url) {
      this.setState({ inputValue: '', curPage: 0 });
    }
  }

  renderInput(pager: PAGE_INFO, change: (cur: number) => void) {
    return (
      <input
        type="text"
        placeholder={`${pager.min} - ${pager.max}`}
        onChange={this.onChange.bind(this, pager, change)}
        value={this.state.inputValue}
      />
    );
  }

  render() {
    const res = this.getPager();
    if (!res) return null;
    const { pager, pagerKey } = res;
    const changeFn = this.props.page?.change.bind(this, pagerKey);

    const cur = this.state.curPage;

    return (
      <Fragment>
        <a
          className={classNames('icon', {
            disabled: cur === pager.max,
          })}
          style={{
            transformOrigin: '50% 50% 0',
            transform: 'scaleX(-1)',
          }}
          onClick={this.change.bind(
            this,
            changeFn,
            Math.min(pager.max, cur + 1)
          )}
        >
          <LeftIcon />
        </a>
        {this.renderInput(pager, changeFn)}
        <a
          className={classNames('icon', {
            disabled: cur === pager.min,
          })}
          onClick={this.change.bind(
            this,
            changeFn,
            Math.max(pager.min, cur - 1)
          )}
        >
          <LeftIcon />
        </a>
      </Fragment>
    );
  }
}
