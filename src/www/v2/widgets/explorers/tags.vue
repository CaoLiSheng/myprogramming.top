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
import Vue from "vue";
import Component from "vue-class-component";

import header from "@vWidgets/explorers/header.vue";
import inSiteLinks from "@vWidgets/explorers/insitelinks.vue";
import tagClouds from "@vWidgets/explorers/tagclouds.vue";

import { db, initOnce } from "@vStores/index";
import { switcher } from "@common/index";

@Component({
  components: {
    "e-header": header,
    "tag-clouds": tagClouds,
    "in-site-links": inSiteLinks,
  },
})
export default class TagsComponent extends Vue.extend({
  props: ["query"],
}) {
  db = db.state;
  refresh = true;
  tagClouds = { extendable: [], selected: [] };

  mounted() {
    initOnce();
  }

  watch() {
    return {
      query: this.onQueryChanged,
    };
  }

  get onQueryChanged() {
    return switcher(
      () => {
        this.$data.refresh = false;
      },
      () => {
        this.$data.refresh = true;
      },
      200
    );
  }

  get posts() {
    if (!this.$data.db.refresh) return [];
    if ("*" === this.query) {
      this.$data.tagClouds.extendable = [];
      this.$data.tagClouds.selected = [];
      return db.data.sortedPosts;
    }

    const tags = this.query.split(",").map((t: string) => t.trim());
    this.$data.tagClouds.selected = tags;
    const result = db.filterByTags(tags);
    this.$data.tagClouds.extendable = result.extendable;
    return result.posts;
  }
}
</script>