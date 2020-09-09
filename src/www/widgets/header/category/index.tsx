import React, { Component, Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Moment from 'moment';

import { Popup } from '@widgets/popup';

import { Schema, EmptySchema } from '@common/index';
import { injectDBCtx, I_DB_CTX } from '@ctxs/index';

import './index.scss';
import { TagsIcon } from '@images/index';

@injectDBCtx()
export default class extends Component<
  RouteComponentProps<{ name: string }> & { db?: I_DB_CTX }
> {
  private renderCurCategory = (
    { db }: { db: Schema } = { db: EmptySchema }
  ) => {
    const postName = this.props.match.params.name;
    if (!postName || !db.metas[postName]) return null;

    const date = Moment(db.metas[postName].date, 'YYYY-MM-DD HH:mm:ss');
    const tags = db.metas[postName].tags;
    return (
      <Fragment>
        {!!tags.length && (
          <Popup
            position={['bottom', 'right']}
            Trigger={
              <li>
                <Link className="icon" to={`/tags/${tags.join(',')}`}>
                  <TagsIcon />
                </Link>
              </li>
            }
            Popper={
              <ol className="tags">
                {tags.map((tag: string) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ol>
            }
          />
        )}
        <li className="inline">
          <span>最后更新于：</span>
          <Link to={`/canlendar/${date.year()}/*/*`}>{date.year()}</Link>
          <span>年</span>
          <Link to={`/canlendar/${date.year()}/${date.month() + 1}/*`}>
            {date.month() + 1}
          </Link>
          <span>月</span>
          <Link
            to={`/canlendar/${date.year()}/${date.month() + 1}/${date.date()}`}
          >
            {date.date()}
          </Link>
          <span>日</span>
        </li>
      </Fragment>
    );
  };

  render() {
    return this.renderCurCategory(this.props.db);
  }
}
