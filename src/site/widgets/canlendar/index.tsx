import React, { Component, Fragment } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { SnapList } from '@widgets/index';

import {
  injectDBCtx,
  PATH_PAGER_MAP,
  injectPageCtx,
  I_DB_CTX,
  I_PAGE_CTX,
} from '@ctxs/index';
import { RNK, distinctReduce, dateSortDesc } from '@common/index';

import './index.scss';

@injectDBCtx()
@injectPageCtx()
export class Canlendar extends Component<
  RouteComponentProps<{ year: string; month: string; date: string }> & {
    db: I_DB_CTX;
    page: I_PAGE_CTX;
  }
> {
  reduceRNK = (rnk: RNK | string[]): string[] => {
    if (Array.isArray(rnk)) return rnk;

    return Object.keys(rnk)
      .map((key: string) => this.reduceRNK(rnk[key]))
      .reduce(distinctReduce, []);
  };

  update = () => {
    const pagerKey: string = PATH_PAGER_MAP[this.props.match.path];
    if (!pagerKey) throw new Error('粗错啦，无效的分页关键字！');

    let rnk: RNK = this.props.db.db.dateCategories || {};
    if (this.props.match.params.year !== '*') {
      rnk = rnk[this.props.match.params.year] || {};
    }
    if (this.props.match.params.month !== '*') {
      rnk = rnk[this.props.match.params.month] || {};
    }
    if (this.props.match.params.date !== '*') {
      rnk = rnk[this.props.match.params.date] || {};
    }

    this.props.page.update(
      pagerKey,
      dateSortDesc(this.reduceRNK(rnk), this.props.db.db.metas)
    );
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(
    prevProps: RouteComponentProps<{
      year: string;
      month: string;
      date: string;
    }> & {
      db: I_DB_CTX;
      page: I_PAGE_CTX;
    }
  ) {
    if (
      prevProps.match.params.year === this.props.match.params.year &&
      prevProps.match.params.month === this.props.match.params.month &&
      prevProps.match.params.date === this.props.match.params.date &&
      prevProps.db.db.dateCategories === this.props.db.db.dateCategories
    )
      return;

    this.update();
  }

  renderLinks() {
    if (!this.props.db.db.dateCategories) return null;

    if (this.props.match.params.year === '*') {
      return (
        <div className="links">
          {Object.keys(this.props.db.db.dateCategories || {}).map(
            (year: string) => (
              <Link key={year} to={`/canlendar/${year}/*/*`}>
                {year}年
              </Link>
            )
          )}
        </div>
      );
    }
    const year = this.props.match.params.year;
    const monthObj = this.props.db.db.dateCategories[year] || {};

    if (this.props.match.params.month === '*') {
      return (
        <div className="links">
          {Object.keys(monthObj).map((month: string) => (
            <Link key={month} to={`/canlendar/${year}/${month}/*`}>
              {month}月
            </Link>
          ))}
        </div>
      );
    }
    const month = this.props.match.params.month;
    const dateObj = monthObj[month] || {};

    if (this.props.match.params.date === '*') {
      return (
        <div className="links">
          {Object.keys(dateObj).map((date: string) => (
            <Link key={date} to={`/canlendar/${year}/${month}/${date}`}>
              {date}日
            </Link>
          ))}
        </div>
      );
    }

    return null;
  }

  renderTitle() {
    const { year, month, date } = this.props.match.params;

    if (year === '*') {
      return null;
    }

    if (month === '*') {
      return <h1>{year}年</h1>;
    }

    if (date === '*') {
      return (
        <h1>
          <Link to={`/canlendar/${year}/*/*`}>{year}</Link>
          <span>年{month}月</span>
        </h1>
      );
    }

    return (
      <h1>
        <Link to={`/canlendar/${year}/*/*`}>{year}</Link>
        <span>年</span>
        <Link to={`/canlendar/${year}/${month}/*`}>{month}</Link>
        <span>月{date}日</span>
      </h1>
    );
  }

  render() {
    return (
      <Fragment>
        <div className="canlendar wrapper">
          {this.renderTitle()}
          {this.renderLinks()}
        </div>
        <SnapList />
      </Fragment>
    );
  }
}
