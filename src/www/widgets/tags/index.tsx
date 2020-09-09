import React, { Component, Fragment, createRef } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { SnapList } from '@widgets/snapList';

import {
  injectDBCtx,
  PATH_PAGER_MAP,
  injectPageCtx,
  I_DB_CTX,
  I_PAGE_CTX,
} from '@ctxs/index';

import './index.scss';
import { distinctReduce, dateSortDesc } from '@common/index';

@injectDBCtx()
@injectPageCtx()
export class Tags extends Component<
  RouteComponentProps<{ tags: string }> & {
    db: I_DB_CTX;
    page: I_PAGE_CTX;
  },
  { queryedTags: string[] }
> {
  state = { queryedTags: [] };

  private inputRef = createRef<HTMLInputElement>();

  update = () => {
    const pagerKey: string = PATH_PAGER_MAP[this.props.match.path];
    if (!pagerKey) throw new Error('粗错啦，无效的分页关键字！');

    if (this.props.match.params.tags === '*') {
      this.setState({
        queryedTags: Object.keys(this.props.db.db.tagCategories),
      });

      this.props.page.update(pagerKey, this.props.db.db.sortedPosts);

      return;
    }

    const selectedTags = this.props.match.params.tags.split('|');
    const queryedTags = Object.keys(
      this.props.db.db.tagCategories
    ).filter((tag: string) =>
      selectedTags.some((sTag: string) => tag.includes(sTag))
    );

    this.setState({ queryedTags });

    const selectedPosts = selectedTags
      .map((fTag: string) => this.props.db.db.tagCategories[fTag] || [])
      .reduce(distinctReduce, []);

    this.props.page.update(
      pagerKey,
      dateSortDesc(selectedPosts, this.props.db.db.metas)
    );
  };

  onSearch = () =>
    this.props.history.push(
      `/tags/${
        this.inputRef.current?.value ||
        this.inputRef.current?.placeholder ||
        '*'
      }`
    );

  onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') this.onSearch();
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(
    prevProps: RouteComponentProps<{ tags: string }> & {
      db: I_DB_CTX;
      page: I_PAGE_CTX;
    }
  ) {
    if (
      prevProps.match.params.tags === this.props.match.params.tags &&
      prevProps.db.db.tagCategories === this.props.db.db.tagCategories
    )
      return;

    this.update();
  }

  render() {
    return (
      <Fragment>
        <div className="tags wrapper">
          <div className="search-bar">
            <input
              type="search"
              placeholder={this.props.match.params.tags}
              ref={this.inputRef}
              onKeyDown={this.onSearchKeyDown}
            />
            <button onClick={this.onSearch}>搜索</button>
          </div>
          <div className="search-results">
            {this.state.queryedTags.map((tag: string) => (
              <Link key={tag} to={`/tags/${tag}`}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
        <SnapList />
      </Fragment>
    );
  }
}
