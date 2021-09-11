<template lang="pug">
  #main(v-html="articleBody")
</template>

<script lang="ts">

import { switcher } from "commons/src/index";
import { prefetchStyles } from 'commons/src/markdown/index';
import { initCodePlugin } from 'commons/src/www/plugins/code';
import { initDesignPlugin } from 'commons/src/www/plugins/design';
import { initFigurePlugin } from 'commons/src/www/plugins/figure';
import { initHistoryPlugin } from 'commons/src/www/plugins/history';
import { initLinkPlugin } from 'commons/src/www/plugins/link';
import { initTablePlugin } from 'commons/src/www/plugins/table';
import { __conf__ } from 'commons/src/www/utils/conf';
import Vue from "vue";
import Component from "vue-class-component";
import { db, initOnce } from "../stores/index";

declare let __portal_to_v2__: string;

@Component
export default class PostComponent extends Vue.extend ( {
  props   : { post: { type: String, default: '=' } },
  computed: {
    onKeyChanged () {
      return switcher (
        () => {
          this.$data.refresh = false;
        },
        () => {
          this.$data.refresh = true;
        },
        200
      );
    }
  },
  watch: {
    post () {
      this.onKeyChanged ();
      this.fetchPost ();
    },
  },
  methods: {
    restartPlugins ( name: string ) {
      initCodePlugin ();
      initLinkPlugin ( { postLinkEmitter: ( info: string ) => `${ __portal_to_v2__ }#/post/${ info }` } );
      initTablePlugin ();
      initDesignPlugin ();
      initFigurePlugin ();
      void initHistoryPlugin ( { historyKey: name } );
    },
    async fetchPost () {
      if ( !this.$data.db.refresh ) return;

      const name = this.$router.currentRoute.params.post;
      const success = await prefetchStyles ( name, db.data.conf, db.data.metas )

      if ( !success ) return;

      const resp: Response = await fetch ( `${ __conf__.__posts_root__ }${ name.replace ( /<->/g, '/' ) }.html?var=${ Date.now () }` )
      this.$data.articleBody = await resp.text ();
      
      setTimeout ( this.restartPlugins.bind ( this, name ), 0 );
    }
  },
} ) {
  db = db.state;

  refresh = true;

  articleBody = '';

  mounted (): void {
    initOnce ().then ( this.fetchPost );
  }
}

</script>

<style lang="stylus">
#main
  overflow: auto;
  position: relative;
  -webkit-user-select: text;
  user-select: text;
  background: linear-gradient(to bottom, var(--third-theme-color), var(--theme-color) 54vh, var(--theme-color));
  padding: 0.382rem 1rem;
  @media screen and (max-width: 750px)
    padding: 0.382rem 0.2rem;
  .markdown-body
    padding: 0.1rem 0.382rem;
    border: solid 1px gray;
    border-radius: 6px;
    box-shadow: 0 0 5px 0 gray;
    @media screen and (max-width: 750px)
      padding: 0 0.382rem;
</style>