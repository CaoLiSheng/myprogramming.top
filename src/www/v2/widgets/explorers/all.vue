<template lang="pug">
.r
  h5 搜索结果
  in-site-link(v-for="post in posts", :key="post", :data="post")
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
    return { db: db.state };
  }

  get posts() {
    return Object.keys(this.$data.db.metas);
  }

  async mounted() {
    const resp = await fetch(`db.json?var=${Date.now()}`);
    const data: Schema = await resp.json();
    db.update(data);
  }
}
</script>

<style lang="stylus" scoped>
h5
  margin-bottom: 0.2rem
</style>