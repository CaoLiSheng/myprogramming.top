<template lang="pug">
.links(v-if="ui.menuOpened && refresh", :style="{ height: height }")
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
    return { ui: ui.state };
  }

  postMeta(name: string) {
    return db.data.metas[name];
  }
}
</script>

<style lang="stylus" scoped>
.links
  overflow-x: hidden;
  overflow-y: auto;
</style>