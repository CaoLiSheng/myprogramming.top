<template lang="pug">
.r
  e-header(:text="header")
  search-field(:onClear="onClear", :onChange="onChange")
  in-site-links(
    height="calc(100% - 0.5rem - 0.8rem)",
    :refresh="refresh",
    :posts="posts"
  )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import header from "@vWidgets/explorers/header.vue";
import inSiteLinks from "@vWidgets/explorers/insitelinks.vue";
import searchfield from "@vWidgets/explorers/searchfield.vue";

import { db, initOnce, ui } from "@vStores/index";
import { ChangeEvent } from "react";

let _RefreshTimmer: NodeJS.Timeout | null = null;

@Component({
  components: {
    "e-header": header,
    "in-site-links": inSiteLinks,
    "search-field": searchfield,
  },
})
export default class AllComponent extends Vue.extend({
  props: ["query"],
}) {
  data() {
    return {
      db: db.state,
      ui: ui.state,
      refresh: true,
    };
  }

  get header() {
    const query = this.query;

    if ("*" === query) {
      return "全部文章都在这里咯……";
    } else {
      return `搜索关键词“${query}”……`;
    }
  }

  get posts() {
    const query = this.query;

    if ("*" === query) {
      return this.$data.db.sortedPosts;
    }

    return (this.$data.db.sortedPosts || []).filter((p: string) => {
      const meta = this.$data.db.metas[p];
      if (meta.title.indexOf(query) >= 0) return true;
      if (meta.tags.some((t: string) => t.indexOf(query) >= 0)) return true;
      return false;
    });
  }

  _onChangeDelayed(query: string) {
    if (null !== _RefreshTimmer) clearTimeout(_RefreshTimmer);
    this.$data.refresh = false;

    _RefreshTimmer = setTimeout(
      (query: string) => {
        this.$data.refresh = true;

        const curR = this.$router.currentRoute;
        if (curR.name === "AllComponent" && curR.params["query"] === query)
          return;
        this.$router.replace({ name: "AllComponent", params: { query } });
      },
      800,
      query
    );
  }

  onChange(ev: ChangeEvent) {
    const query = (ev.target as HTMLInputElement).value || this.$props.query;
    this._onChangeDelayed(query);
  }

  onClear() {
    this._onChangeDelayed("*");
  }

  mounted() {
    initOnce();
  }
}
</script>