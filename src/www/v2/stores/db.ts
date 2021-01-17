import {
  Schema,
  EmptySchema,
  distinctReduce,
  dateSortDesc,
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
  data: EmptySchema,
  update(data: Schema) {
    Object.keys(data).forEach((key: string) => {
      this.data[key] = data[key];
    });
    this.state.allTags = Object.keys(data.tagCategories);
    this.state.refresh = true;
  },
  filterByKW(kw: string) {
    if ('*' === kw) {
      return this.data.sortedPosts;
    }

    return (this.data.sortedPosts || []).filter((name: string) => {
      const meta = this.data.metas[name];
      if (name.indexOf(kw) >= 0) return true;
      if (meta.date.indexOf(kw) >= 0) return true;
      if (meta.title.indexOf(kw) >= 0) return true;
      if (
        meta.tags
          .map((t: any) => `${t}`)
          .some((t: string) => t.indexOf(kw) >= 0)
      ) {
        return true;
      }
      return false;
    });
  },
  filterByTags(tags: string[]) {
    const unSorted = tags
      .map((t: string) => this.data.tagCategories[t])
      .reduce(intersectingReduce, []);

    const extendable = [
      ...unSorted.map((p: string) => this.data.metas[p].tags),
      tags,
    ].reduce(distinctReduce, []);

    return {
      extendable,
      posts: dateSortDesc(unSorted, this.data.metas),
    };
  },
};

let __INITIALIZATION_STARTED = false;
export const initOnce = async () => {
  if (__INITIALIZATION_STARTED) return;
  __INITIALIZATION_STARTED = true;

  const resp = await fetch(`db.json?var=${Date.now()}`);
  const data: Schema = await resp.json();
  db.update(data);
};
