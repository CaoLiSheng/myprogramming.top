<template lang="pug">
  .r
    e-header(:text="header")
    search-field(:onClear="onClear", :onInput="onInput")
    in-site-links(
      height="calc(100% - 0.5rem - 0.8rem)",
      :isMobile="isMobile"
      :refresh="refresh",
      :posts="posts"
    )
</template>

<script lang="ts">

import { switcher } from "commons/src/www/utils/lang";
import Vue from "vue";
import Component from "vue-class-component";
import { isMobileSize } from "commons/src/www/utils/design";
import { db, initOnce } from "../../stores/index";
import header from "./header.vue";
import inSiteLinks from "./insitelinks.vue";
import searchfield from "./searchfield.vue";

@Component ( {
  components: {
    "e-header"     : header,
    "in-site-links": inSiteLinks,
    "search-field" : searchfield,
  },
} )
export default class ListComponent extends Vue.extend ( {
  props: { query: { type: String, default: '' } },
} ) {
  db = db.state;

  refresh = true;

  isMobile = isMobileSize ().result;

  mounted (): void {
    void initOnce ();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const resizeHandler = () => {
      this.isMobile = isMobileSize ().result;
    }
    window.addEventListener ( 'resize', resizeHandler );
    window.addEventListener ( 'beforeunload', () => {
      window.removeEventListener ( 'resize', resizeHandler );
    } );
  }

  get header (): string {
    const { query } = this;

    return query === "*" ? "全部文章都在这里咯……" : `搜索关键词“${ query }”……`;
  }

  get posts (): string[] {
    if ( !this.db.refresh ) return [];
    return db.filterByKW ( this.query );
  }

  get onChangeDelayed (): ( ( ...params: unknown[] ) => void ) {
    return switcher (
      () => {
        this.refresh = false;
      },
      ( query: unknown ) => {
        this.refresh = true;

        const curR = this.$router.currentRoute;
        if ( curR.name === "ListComponent" && curR.params["query"] === query )
          return;
        void this.$router.replace ( { name: "ListComponent", params: { query: query as string } } );
      },
      800
    );
  }

  onInput ( ev: InputEvent ): void {
    const input = ev.target as HTMLInputElement;
    const query = input.value || "*";
    this.onChangeDelayed ( query );
  }

  onClear (): void {
    this.onChangeDelayed ( "*" );
  }
}
</script>