<template lang="pug">
.r
  .title(:style="{ width: width + 'px' }")
    h5 搜索结果
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
    return { db: db.state, width: 0 };
  }

  get posts() {
    return this.$data.db.sortedPosts;
  }

  postData(name: string) {
    return this.$data.db.metas[name];
  }

  calcWidth() {
    const r = document.querySelector("#side>.r");
    if (r && r instanceof HTMLElement) {
      return r.offsetWidth;
    }
    return 0;
  }

  async mounted() {
    const resp = await fetch(`db.json?var=${Date.now()}`);
    const data: Schema = await resp.json();
    db.update(data);
    this.$data.width = this.calcWidth();
  }
}
</script>

<style lang="stylus" scoped>
.r
  position: relative
  padding-top: 50px
  .title
    margin-bottom: 0.2rem
    border-botton: solid 0.01rem gray
    background: var(--secondary-theme-color)
    background: linear-gradient(
      to right,
      var(--secondary-theme-color),
      var(--secondary-theme-color) 90%,
      transparent
    )
    position: fixed
    left: 0
    top: 0
    &:after
      content: ''
      display: block
      width: 100%
      height: 0.01rem
      box-shadow: 0 0.03rem 0.05rem 0 gray
    h5
      font-size: 24px
      line-height: 2em
      padding: 0 0.5rem
      color: var(--title-theme-color)
</style>