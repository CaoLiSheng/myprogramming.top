import Moment from 'moment';

export interface RNK {
  [key: number]: RNK | string[];
}

export interface PublicMeta {
  title: string;
  date: string;
  tags: string[];
}

export interface Schema {
  metas: { [key: string]: PublicMeta };
  sortedPosts: string[];
  dateCategories: RNK;
  tagCategories: { [key: string]: string[] };
}

export const EmptySchema: Schema = {
  metas: {},
  sortedPosts: [],
  dateCategories: {},
  tagCategories: {},
};

export interface Meta {
  date: Moment.Moment;
}

export class DB {
  private postMetas: { [key: string]: Meta } = {};
  private schema: Schema = EmptySchema;

  public toString(): string {
    return JSON.stringify(this.schema);
  }

  public add({
    name,
    title,
    date,
    tags,
  }: {
    name: string;
    title: string;
    date: string;
    tags: string[];
  }): Meta {
    if (this.postMetas[name]) throw new Error(`POST重复了 ${name}`);

    // Parse private Metadata
    const meta: Meta = {
      date: Moment(date, 'YYYY-MM-DD'),
    };
    this.postMetas[name] = meta;

    // Write public meta & infos
    this.schema.metas[name] = { title, date, tags };

    this.pushToSortedPosts(name);
    this.pushToDateCategories(name);
    this.pushToTagCategories(name, tags);

    return meta;
  }

  private push(name: string, targets: string[]): string[] {
    const insertIndex = targets.findIndex((checking: string) =>
      this.postMetas[checking].date.isBefore(this.postMetas[name].date)
    );

    if (insertIndex === -1) {
      return [...targets, name];
    }

    return [
      ...targets.slice(0, insertIndex),
      name,
      ...targets.slice(insertIndex),
    ];
  }

  private pushToSortedPosts(name: string) {
    this.schema.sortedPosts = this.push(name, this.schema.sortedPosts);
  }

  private pushToDateCategories(name: string) {
    const d = this.postMetas[name].date;

    const year = d.year();
    if (!this.schema.dateCategories[year]) {
      this.schema.dateCategories[year] = {};
    }

    const month = d.month() + 1;
    if (!this.schema.dateCategories[year][month]) {
      this.schema.dateCategories[year][month] = {};
    }

    const day = d.date();

    this.schema.dateCategories[year][month][day] = this.push(
      name,
      (this.schema.dateCategories[year][month][day] as string[]) || []
    );
  }

  private pushToTagCategories(name: string, tags: string[]) {
    tags.forEach((tag: string) => {
      this.schema.tagCategories[tag] = this.push(
        name,
        this.schema.tagCategories[tag] || []
      );
    });
  }
}
