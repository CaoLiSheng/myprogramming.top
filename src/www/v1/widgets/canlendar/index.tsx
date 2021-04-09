import './index.scss';

import { RNK, dateSortDesc, distinctReduce } from '@common/index';
import {
  I_DB_CTX,
  I_PAGE_CTX,
  PATH_PAGER_MAP,
  injectDBCtx,
  injectPageCtx,
} from '@rCtxs/index';
import { SnapList } from '@rWidgets/index';
import React, { Component, ReactElement } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

@injectDBCtx ()
@injectPageCtx ()
export class Canlendar extends Component<
RouteComponentProps<{
  year: string;
  month: string;
  date: string;
  page?: string;
}> & {
  db: I_DB_CTX;
  page: I_PAGE_CTX;
}
> {

  componentDidMount (): void {
    this.update ();
  }

  componentDidUpdate (
    prevProps: RouteComponentProps<{
      year: string;
      month: string;
      date: string;
    }> & {
      db: I_DB_CTX;
      page: I_PAGE_CTX;
    },
  ): void {
    if (
      prevProps.match.url === this.props.match.url
      && prevProps.db.db.dateCategories === this.props.db.db.dateCategories
    ) return;

    this.update ();
  }


  reduceRNK = ( rnk: RNK | string[] ): string[] => {
    if ( Array.isArray ( rnk ) ) return rnk;

    return Object.keys ( rnk )
      .map ( ( key: string ) => this.reduceRNK ( rnk[ key ] ) )
      .reduce ( distinctReduce, [] );
  };

  update = (): void => {
    const pagerKey: string = PATH_PAGER_MAP[ this.props.match.path ];
    if ( !pagerKey ) throw new Error ( '粗错啦，无效的分页关键字！' );

    let rnk: RNK = this.props.db.db.dateCategories || {};
    if ( this.props.match.params.year !== '*' ) {
      rnk = rnk[ this.props.match.params.year ] || {};
    }
    if ( this.props.match.params.month !== '*' ) {
      rnk = rnk[ this.props.match.params.month ] || {};
    }
    if ( this.props.match.params.date !== '*' ) {
      rnk = rnk[ this.props.match.params.date ] || {};
    }

    this.props.page.update (
      pagerKey,
      dateSortDesc ( this.reduceRNK ( rnk ), this.props.db.db.metas ),
      this.props.match.params.page?.toInt (),
    );
  };

  renderLinks (): ReactElement | null {
    if ( !this.props.db.db.dateCategories ) return null;

    if ( this.props.match.params.year === '*' ) {
      return (
        <div className="links">
          {Object.keys ( this.props.db.db.dateCategories || {} ).map (
            ( year: string ) => (
              <Link key={ year } to={ `/canlendar/${ year }/*/*` }>
                {year }
                年
              </Link>
            ),
          ) }
        </div>
      );
    }
    const { year } = this.props.match.params;
    const monthObj = this.props.db.db.dateCategories[ year ] || {};

    if ( this.props.match.params.month === '*' ) {
      return (
        <div className="links">
          {Object.keys ( monthObj ).map ( ( month: string ) => (
            <Link key={ month } to={ `/canlendar/${ year }/${ month }/*` }>
              {month }
              月
            </Link>
          ) ) }
        </div>
      );
    }
    const { month, date } = this.props.match.params;
    const dateObj = monthObj[ month ] || {};

    if ( date === '*' ) {
      return (
        <div className="links">
          {Object.keys ( dateObj ).map ( ( day: string ) => (
            <Link key={ day } to={ `/canlendar/${ year }/${ month }/${ day }` }>
              {day }
              日
            </Link>
          ) ) }
        </div>
      );
    }

    return null;
  }

  renderTitle (): ReactElement | null {
    const { year, month, date } = this.props.match.params;

    if ( year === '*' ) {
      return null;
    }

    if ( month === '*' ) {
      return (
        <h1>
          <Link to="/canlendar/*/*/*">起源</Link>
          <span>
            { ' ' }
            :
            { year }
            年
          </span>
        </h1>
      );
    }

    if ( date === '*' ) {
      return (
        <h1>
          <Link to="/canlendar/*/*/*">起源</Link>
          <span> : </span>
          <Link to={ `/canlendar/${ year }/*/*` }>{ year }</Link>
          <span>
            年
            { month }
            月
          </span>
        </h1>
      );
    }

    return (
      <h1>
        <Link to="/canlendar/*/*/*">起源</Link>
        <span> : </span>
        <Link to={ `/canlendar/${ year }/*/*` }>{ year }</Link>
        <span>年</span>
        <Link to={ `/canlendar/${ year }/${ month }/*` }>{ month }</Link>
        <span>
          月
          { date }
          日
        </span>
      </h1>
    );
  }

  render (): ReactElement {
    return (
      <>
        <div className="canlendar wrapper">
          { this.renderTitle () }
          { this.renderLinks () }
        </div>
        <SnapList />
      </>
    );
  }
}
