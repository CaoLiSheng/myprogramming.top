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
  data() {
    return {
      db: db.state,
      tagClouds: { extendable: [], selected: [] },
      refresh: true,
    };
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

  mounted() {
    initOnce();
  }
}
</script>

<style lang="stylus" scoped></style>