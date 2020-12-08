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

export interface Row {
  name: string;
  title: string;
  date: string;
  tags: string[];
}

function nonRecordable(name: string): boolean {
  if ('index' === name) return true;
  if (name.startsWith('hidden-')) return true;
  return false;
}

export class DB {
  private postMetas: { [key: string]: Meta } = {};
  private schema: Schema = EmptySchema;

  public toString(): string {
    return JSON.stringify(this.schema);
  }

  public add(datum: Row): { persist: () => PublicMeta | null } {
    return {
      persist: (): PublicMeta | null => {
        if (nonRecordable(datum.name)) return null;
        return this.addRow(datum);
      },
    };
  }

  private addRow({ name, title, date, tags }: Row): PublicMeta {
    if (this.postMetas[name]) throw new Error(`POST重复了 ${name}`);

    // Parse private Metadata
    this.postMetas[name] = {
      date: Moment(date, 'YYYY-MM-DD'),
    };

    // Write public meta & infos
    this.schema.metas[name] = {
      date: this.postMetas[name].date.format('YYYY-MM-DD'),
      title,
      tags,
    };

    this.pushToSortedPosts(name);
    this.pushToDateCategories(name);
    this.pushToTagCategories(name, tags);

    return this.schema.metas[name];
  }

  private push(name: string, targets: string[]): string[] {
    const insertIndex = targets.findIndex((checking: string) =>
      this.postMetas[checking].date.isSameOrBefore(this.postMetas[name].date)
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
