import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';

import {
  PATH_PAGER_MAP,
  PAGE_INFO,
  injectPageCtx,
  I_PAGE_CTX,
  buildPagerPath,
} from '@rCtxs/index';

import './index.scss';
import { LeftIcon } from '@images/index';

@injectPageCtx()
export default class Pager extends Component<
  RouteComponentProps<{ page?: string }> & { page?: I_PAGE_CTX },
  { inputValue: string; curPage: number }
> {
  state = { inputValue: '', curPage: 0 };

  goToPage = (page?: number) => {
    if (undefined === page) return;
    this.props.history.push(buildPagerPath(this.props.match, page));
  };

  getPager = (): { pager: PAGE_INFO; pagerKey: string } | null => {
    let pager: PAGE_INFO | undefined;

    const pagerKey: string = PATH_PAGER_MAP[this.props.match.path];
    if (!pagerKey || !(pager = this.props.page?.page[pagerKey])) {
      return null;
    }

    return { pager, pagerKey };
  };

  change = (ignored: boolean, target: number) => {
    if (ignored) return;

    this.setState({ inputValue: `${target}`, curPage: target }, () =>
      this.goToPage(target)
    );
  };

  buildState = (
    pager: { min: number; max: number },
    parsed?: number,
    curPage: number = 0
  ) => {
    let target = 0;
    if (parsed) {
      target = Math.max(pager.min, Math.min(pager.max, parsed));
    }

    return {
      inputValue: parsed ? `${target}` : '',
      curPage: parsed ? target : curPage,
    };
  };

  onChange = (pager: PAGE_INFO, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      ({ curPage }) =>
        this.buildState(pager, event.target.value.toInt(), curPage),
      () => this.goToPage(this.state.curPage)
    );
  };

  update = () => {
    const res = this.getPager();
    if (!res) return;
    const { pager } = res;
    const states = this.buildState(
      pager,
      this.props.match.params.page?.toInt()
    );
    this.setState(states);
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps: RouteComponentProps & { page?: I_PAGE_CTX }) {
    if (
      prevProps.match.url !== this.props.match.url ||
      prevProps.page?.page !== this.props.page?.page
    ) {
      this.update();
    }
  }

  renderInput(pager: PAGE_INFO) {
    return (
      <input
        type="text"
        placeholder={`${pager.min} - ${pager.max}`}
        onChange={this.onChange.bind(this, pager)}
        value={this.state.inputValue}
      />
    );
  }

  render() {
    const res = this.getPager();
    if (!res) return null;
    const { pager } = res;

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
            cur === pager.max,
            Math.min(pager.max, cur + 1)
          )}
        >
          <LeftIcon />
        </a>
        {this.renderInput(pager)}
        <a
          className={classNames('icon', {
            disabled: cur === pager.min,
          })}
          onClick={this.change.bind(
            this,
            cur === pager.min,
            Math.max(pager.min, cur - 1)
          )}
        >
          <LeftIcon />
        </a>
      </Fragment>
    );
  }
}
