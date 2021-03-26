import '@common/shims-string';

import './index.scss';

import { dateSortDesc, distinctReduce } from '@common/index';
import {
  I_DB_CTX,
  I_PAGE_CTX,
  PATH_PAGER_MAP,
  injectDBCtx,
  injectPageCtx,
} from '@rCtxs/index';
import { SnapList } from '@rWidgets/snapList';
import React, { Component, ReactElement, createRef } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

type TagsProps = RouteComponentProps<{ tags: string; page?: string }> & {
  db: I_DB_CTX;
  page: I_PAGE_CTX;
}

@injectDBCtx()
@injectPageCtx()
export class Tags extends Component<
TagsProps,
{ queryedTags: string[] }
> {

  private inputRef = createRef<HTMLInputElement>();

  constructor ( props: TagsProps ) {
    super( props );

    this.state = { queryedTags: [] };
  }

  componentDidMount (): void {
    this.update();
  }

  componentDidUpdate (
    prevProps: RouteComponentProps<{ tags: string }> & {
      db: I_DB_CTX;
      page: I_PAGE_CTX;
    },
  ): void {
    if (
      prevProps.match.url === this.props.match.url
      && prevProps.db.db.tagCategories === this.props.db.db.tagCategories
    ) return;

    this.update();
  }

  update = (): void => {
    const pagerKey: string = PATH_PAGER_MAP[ this.props.match.path ];
    if ( !pagerKey ) throw new Error( '粗错啦，无效的分页关键字！' );

    if ( this.props.match.params.tags === '*' ) {
      this.setState( {
        queryedTags: Object.keys( this.props.db.db.tagCategories ),
      } );

      this.props.page.update(
        pagerKey,
        this.props.db.db.sortedPosts,
        this.props.match.params.page?.toInt(),
      );

      return;
    }

    const selectedTags = this.props.match.params.tags
      .split( ',' )
      .map( ( t: string ) => t.split( '，' ) )
      .reduce( distinctReduce, [] );
    const queryedTags = Object.keys(
      this.props.db.db.tagCategories,
    ).filter( ( tag: string ) => selectedTags.some( ( sTag: string ) => tag.includes( sTag ) ) );

    this.setState( { queryedTags } );

    const selectedPosts = selectedTags
      .map( ( fTag: string ) => this.props.db.db.tagCategories[ fTag ] || [] )
      .reduce( distinctReduce, [] );

    this.props.page.update(
      pagerKey,
      dateSortDesc( selectedPosts, this.props.db.db.metas ),
      this.props.match.params.page?.toInt(),
    );
  };

  onSearch = (): void => this.props.history.push(
    `/tags/${ this.inputRef.current?.value
    || this.inputRef.current?.placeholder
    || '*' }`,
  );

  onSearchKeyDown = ( event: React.KeyboardEvent<HTMLInputElement> ): void => {
    if ( event.key === 'Enter' ) this.onSearch();
  };

  render (): ReactElement {
    return (
      <>
        <div className="tags wrapper">
          <div className="search-bar">
            <input
              type="search"
              placeholder={ this.props.match.params.tags }
              ref={ this.inputRef }
              onKeyDown={ this.onSearchKeyDown }
            />
            <button type="button" onClick={ this.onSearch }>搜索</button>
          </div>
          <div className="search-results">
            { this.state.queryedTags.map( ( tag: string ) => (
              <Link key={ tag } to={ `/tags/${ tag }` }>
                {tag }
              </Link>
            ) ) }
          </div>
        </div>
        <SnapList />
      </>
    );
  }
}
