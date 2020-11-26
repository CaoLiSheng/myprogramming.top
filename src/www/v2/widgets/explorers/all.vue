<template lang="pug">
.r
  e-header(:text="header")
  search-field(:onClear="onClear", :onInput="onInput")
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

import { db, initOnce } from "@vStores/index";
import { switcher } from "@common/index";

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
  db = db.state;
  refresh = true;

  mounted() {
    initOnce();
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
    if (!this.$data.db.refresh) return [];
    return db.filterByKW(this.query);
  }

  get onChangeDelayed() {
    return switcher(
      () => {
        this.$data.refresh = false;
      },
      (query: string) => {
        this.$data.refresh = true;

        const curR = this.$router.currentRoute;
        if (curR.name === "AllComponent" && curR.params["query"] === query)
          return;
        this.$router.replace({ name: "AllComponent", params: { query } });
      },
      800
    );
  }

  onInput(ev: InputEvent) {
    const input = ev.target as HTMLInputElement;
    const query = input.value || "*";
    this.onChangeDelayed(query);
  }

  onClear() {
    this.onChangeDelayed("*");
  }
}
</script>