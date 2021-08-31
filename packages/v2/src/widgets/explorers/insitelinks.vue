<template lang="pug">
.links(v-if="ui.menuOpened && refresh", :style="{ height: height }")
  in-site-link(
    v-for="(name, idx) in postsGranted",
    :key="name",
    :name="name",
    :delay="idx * 100",
    :data="postMeta(name)"
  )
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";
import { db, ui } from "../../stores/index";
import inSiteLink from "./insitelink.vue";

@Component ( { components: { "in-site-link": inSiteLink } } )
export default class InSiteLinks extends Vue.extend ( {
  props: {
    refresh: {
      type   : Boolean,
      default: false,
    },
    posts: {
      type   : Array,
      default: () => [],
    },
    height: {
      type   : String,
      default: '0',
    },
  },
} ) {
  ui = ui.state;

  get postsGranted (): string[] {
    const postNames = this.posts as string[];

    return this.ui.readerLevelGranted
      ? postNames
      : postNames.filter ( ( name: string ) => {
          const meta = this.postMeta ( name );
          return !meta.tags.some (
            ( tag: string ) => tag === "草稿" || tag === "隐私"
          );
        } );
  }

  postMeta ( name: string ): { title: string, date: string, tags: string[] } {
    return db.data.metas[name];
  }
}
</script>

<style lang="stylus" scoped>
.links
  overflow-x: hidden;
  overflow-y: auto;
</style>