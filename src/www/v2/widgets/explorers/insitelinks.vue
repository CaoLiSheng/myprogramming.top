<template lang="pug">
.links(v-if="ui.menuOpened && refresh", :style="{ maxHeight: height }")
  in-site-link(
    v-for="(name, idx) in posts",
    :key="name",
    :name="name",
    :delay="idx * 100",
    :data="postMeta(name)"
  )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import inSiteLink from "@vWidgets/explorers/insitelink.vue";

import { db, ui } from "@vStores/index";

@Component({ components: { "in-site-link": inSiteLink } })
export default class InSiteLinks extends Vue.extend({
  props: ["refresh", "posts", "height"],
}) {
  data() {
    return { db: db.state, ui: ui.state };
  }

  postMeta(name: string) {
    return this.$data.db.metas[name];
  }
}
</script>

<style lang="stylus" scoped>
.links
  overflow-x: hidden;
  overflow-y: auto;
</style>