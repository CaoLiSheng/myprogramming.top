import {
  EmptySchema,
  Schema,
  dateSortDesc,
  distinctReduce,
  intersectingReduce,
} from '@common/index';

interface dbState {
  refresh: boolean;
  allTags: string[];
}

const EmptyDbState: dbState = {
  refresh: false,
  allTags: [],
};

export const db = {
  state: EmptyDbState,
  data : EmptySchema,
  update ( data: Schema ): void {
    Object.keys ( data ).forEach ( ( key: string ) => {
      this.data[key] = data[key];
    } );
    this.state.allTags = Object.keys ( data.tagCategories );
    this.state.refresh = true;
  },
  filterByKW ( kw: string ): string[] {
    if ( kw === '*' ) {
      return this.data.sortedPosts;
    }

    return ( this.data.sortedPosts || [] ).filter ( ( name: string ) => {
      const meta = this.data.metas[name];
      if ( name.includes ( kw ) ) return true;
      if ( meta.date.includes ( kw ) ) return true;
      if ( meta.title.includes ( kw ) ) return true;
      if (
        meta.tags.some ( ( t: string ) => `${ t }`.trim ().includes ( kw ) )
      ) {
        return true;
      }
      return false;
    } );
  },
  filterByTags ( tags: string[] ): { extendable: string[], posts: string[] } {
    const unSorted = tags
      .map ( ( t: string ) => this.data.tagCategories[t] )
      .reduce ( intersectingReduce, [] );

    const extendable = [
      ...unSorted.map ( ( p: string ) => this.data.metas[p].tags ),
      tags,
    ].reduce ( distinctReduce, [] );

    return {
      extendable,
      posts: dateSortDesc ( unSorted, this.data.metas ),
    };
  },
};

let __INITIALIZATION_STARTED = false;
export const initOnce = async (): Promise<void> => {
  if ( __INITIALIZATION_STARTED ) return;
  __INITIALIZATION_STARTED = true;

  const resp = await fetch ( `db.json?var=${ Date.now () }` );
  const data: Schema = await resp.json ();
  db.update ( data );
};
