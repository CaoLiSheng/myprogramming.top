declare var __posts_root__: string;

class Dirs {
  public __posts_root__: string = __posts_root__;
  public get __posts_db__(): string {
    return `${this.__posts_root__}db.json?var=${Date.now()}`;
  }
}

export const __dirs__ = new Dirs();
