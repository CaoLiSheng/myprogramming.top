<template lang="pug">
.r
  .header
    h6 {{ header }}
  search-field(
    height="0.8rem",
    fontSize="0.2rem",
    :onClear="onClear",
    :onChange="onChange"
  )
  .links(v-if="ui.menuOpened && refresh")
    in-site-link(
      v-for="(post, idx) in posts",
      :key="post",
      :name="post",
      :data="postData(post)",
      :delay="idx * 100"
    )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import inSiteLink from "@vWidgets/insitelink.vue";
import searchfield from "@vWidgets/searchfield.vue";

import { Schema } from "@common/index";
import { db, ui } from "@vStores/index";
import { ChangeEvent } from "react";

let _RefreshTimmer: NodeJS.Timeout | null = null;

@Component({
  components: { "in-site-link": inSiteLink, "search-field": searchfield },
})
export default class AllComponent extends Vue.extend({
  props: ["query", "page"],
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
      return `搜索标题“${query}”……`;
    }
  }

  get posts() {
    const query = this.query;

    if ("*" === query) {
      return this.$data.db.sortedPosts;
    }

    return (this.$data.db.sortedPosts || []).filter((p: string) => {
      return this.postData(p).title.indexOf(query) >= 0;
    });
  }

  postData(name: string) {
    return this.$data.db.metas[name];
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

  async mounted() {
    const resp = await fetch(`db.json?var=${Date.now()}`);
    const data: Schema = await resp.json();
    db.update(data);
  }
}
</script>

<style lang="stylus" scoped>
.r
  height: 100%;
  .header
    border-bottom: solid 0.01rem gray;
    background: var(--secondary-theme-color);
    h6
      font-size: 0.18rem;
      line-height: 0.3rem;
      color: var(--btn-foreground-theme-color);
  .links
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100% - 0.3rem - 0.8rem);
</style>  