<template lang="pug">
.r
  .header
    h5 搜索结果
  .links
    in-site-link(
      v-for="post in posts",
      :key="post",
      :name="post",
      :data="postData(post)"
    )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import inSiteLink from "@vWidgets/insitelink.vue";

import { Schema } from "@common/index";
import { db } from "@vStores/index";

@Component({ components: { "in-site-link": inSiteLink } })
export default class AllComponent extends Vue.extend({
  props: ["query", "page"],
}) {
  data() {
    return { db: db.state, width: 0, display: "none" };
  }

  get posts() {
    return this.$data.db.sortedPosts;
  }

  postData(name: string) {
    return this.$data.db.metas[name];
  }

  updateheaderStyle() {
    const side = document.getElementById("side");

    if (side && side instanceof HTMLDivElement) {
      this.$data.width = side.offsetWidth - 4;
      this.$data.display = "block";
    }
  }

  async mounted() {
    this.updateheaderStyle();

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
    h5
      font-size: 24px;
      line-height: 50px;
      padding: 0 0.5rem;
      color: var(--header-theme-color);
  .links
    overflow-x: hidden;
    overflow-y: visible;
    max-height: calc(100% - 50px);
</style>  