<template lang="pug">
.r
  e-header(text="标签☁️")
  tag-clouds(
    height="20vh",
    :allTags="db.allTags",
    :extendable="tagClouds.extendable",
    :selected="tagClouds.selected"
  )
  in-site-links(
    height="calc(100% - 20vh - 0.5rem)",
    :refresh="refresh",
    :posts="posts"
  )
</template>

<script lang="ts">

import { switcher } from "@common/index";
import { db, initOnce } from "@vStores/index";
import header from "@vWidgets/explorers/header.vue";
import inSiteLinks from "@vWidgets/explorers/insitelinks.vue";
import tagClouds from "@vWidgets/explorers/tagclouds.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component ( {
  components: {
    "e-header"     : header,
    "tag-clouds"   : tagClouds,
    "in-site-links": inSiteLinks,
  },
} )
export default class TagsComponent extends Vue.extend ( {
  props   : { query: { type: String, default: '' } },
  computed: {
    onQueryChanged () {
      return switcher (
        () => {
          this.$data.refresh = false;
        },
        () => {
          this.$data.refresh = true;
        },
        200
      );
    },
  },
  watch: {
    query () {
      this.onQueryChanged ();
    },
  },
} ) {
  db = db.state;
  refresh = true;

  tagClouds: { extendable: string[]; selected: string[] } = {
    extendable: [],
    selected  : [],
  };

  mounted (): void {
    void initOnce ();
  }

  get posts (): string[] {
    if ( !this.db.refresh ) return [];
    if ( this.query === "*" ) {
      this.tagClouds.extendable = [];
      this.tagClouds.selected = [];
      return db.data.sortedPosts;
    }

    const tags = this.query.split ( "," ).map ( ( t: string ) => t.trim () );
    this.tagClouds.selected = tags;
    const result = db.filterByTags ( tags );
    this.tagClouds.extendable = result.extendable;
    return result.posts;
  }
}
</script>