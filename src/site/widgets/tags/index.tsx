import React, { Component, Fragment, createRef } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { SnapList } from '@widgets/snapList';

import {
  injectPageOps,
  injectDBCtx,
  I_PAGE_CTX_OPS,
  PATH_PAGER_MAP,
} from '@ctxs/index';
import { Schema } from '@common/index';

import './index.scss';

@injectPageOps()
@injectDBCtx()
export class Tags extends Component<
  RouteComponentProps<{ tags: string }> & I_PAGE_CTX_OPS & Schema,
  { queryedTags: string[] }
> {
  state = { queryedTags: [] };

  private inputRef = createRef<HTMLInputElement>();

  update = () => {
    const pagerKey: string = PATH_PAGER_MAP[this.props.match.path];
    if (!pagerKey) throw new Error('粗错啦，无效的分页关键字！');

    let queryedTags = Object.keys(this.props.tagCategories);
    let selectedTags: string[] = [];
    if (this.props.match.params.tags !== '*') {
      selectedTags = this.props.match.params.tags.split('|');
      queryedTags = Object.keys(
        this.props.tagCategories
      ).filter((tag: string) =>
        selectedTags.some((sTag: string) => tag.includes(sTag))
      );
    }

    this.setState({ queryedTags });

    const selectedPosts = selectedTags
      .map((fTag: string) => this.props.tagCategories[fTag] || [])
      .reduce(
        (p: string[], v: string[]) => [
          ...p,
          ...v.filter((np: string) => p.every((pp: string) => np !== pp)),
        ],
        []
      );

    this.props.update?.(pagerKey, selectedPosts);
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
    prevProps: RouteComponentProps<{ tags: string }> & I_PAGE_CTX_OPS & Schema
  ) {
    if (
      prevProps.match.params.tags === this.props.match.params.tags &&
      prevProps.tagCategories === this.props.tagCategories
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
              type="text"
              placeholder={this.props.match.params.tags}
              ref={this.inputRef}
              onKeyDown={this.onSearchKeyDown}
            />
            <button onClick={this.onSearch}>搜索</button>
          </div>
          <div className="search-results">
            {this.state.queryedTags.map((tag: string) => (
              <Link to={`/tags/${tag}`}>{tag}</Link>
            ))}
          </div>
        </div>
        <SnapList />
      </Fragment>
    );
  }
}
