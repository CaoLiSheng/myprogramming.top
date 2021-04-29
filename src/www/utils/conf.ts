declare let __posts_root__: string;

class Conf {
  public __posts_root__: string = __posts_root__;

  public get __posts_db__ (): string {
    return `${ this.__posts_root__ }db.json?var=${ Date.now () }`;
  }
}

export const __conf__ = new Conf ();
