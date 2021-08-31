declare let __posts_root__: string;

class Conf {

  private __popups_container_query__ = '#popups-container';

  public __posts_root__: string = __posts_root__;

  public get __posts_db__ (): string {
    return `${ this.__posts_root__ }db.json?var=${ Date.now () }`;
  }

  public get __popups_container__ (): HTMLDivElement { 
    return document.querySelector (
      this.__popups_container_query__,
    ) as HTMLDivElement;
  }

}

export const __conf__ = new Conf ();
