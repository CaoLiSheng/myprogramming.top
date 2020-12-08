<template lang="pug">
.r.status
  a#gate.btn(title="去旧版网站", v-if="!isMobile", @click="goToV1")
    GateIcon
  a#menu.btn(v-if="isMobile", @click="openMenu") 菜单
  a.tag(
    v-for="tag in tags",
    :key="tag",
    @click="$event.preventDefault(), click(tag)"
  ) {{ tag }}
    TagIcon
  a.no-tag(v-if="isMobile") ...没有标签咯
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import TagIcon from "@images/tag-small.vue";
import GateIcon from "@images/gate.vue";

import { isMobileSize } from "@www/utils/rem";
import { db, initOnce, ui } from "@vStores/index";
import { clickOnTag } from "../router";

declare var __portal_to_v1__: string;

@Component({ components: { TagIcon, GateIcon } })
export default class StatusComponent extends Vue {
  sideRoot: HTMLElement | null;
  barRoot: HTMLElement | null;

  db = db.state;
  isMobile = isMobileSize().result;

  mounted() {
    initOnce();

    if (!this.isMobile) return;

    this.sideRoot = document.getElementById("side");
    this.barRoot = document.getElementById("bar");

    setTimeout(() => {
      ui.setVisible(true);
      setTimeout(ui.closeMenu.bind(ui), 1000);
    }, 500);
  }

  get tags() {
    if (!this.db.refresh) return [];

    const parsed = location.pathname.split("/");
    const post = parsed[parsed.length - 1];
    if (!post) return [];

    return db.data.metas[post]?.tags;
  }

  click(tag: string) {
    if (this.isMobile) {
      this.openMenu();
    }
    clickOnTag(tag, this.$router);
  }

  openMenu() {
    if (!ui.state.menuOpened) {
      ui.openMenu(this.sideRoot, this.barRoot);
    }
  }

  goToV1() {
    location.href = __portal_to_v1__;
  }
}
</script>

<style lang="stylus" scoped>
.status
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  transform: scaleX(-1);
  a
    transform: scaleX(-1);
    cursor: pointer;
    color: var(--btn-foreground-theme-color);
    &.btn
      height: 100%;
      padding: 0 1em;
      line-height: 2em;
      font-size: 0.25rem;
      @media screen and (max-width: 750px)
        font-size: 0.5rem;
      svg.icon
        width: 0.2rem;
        height: 0.2rem;
        @media screen and (max-width: 750px)
          width: 0.32rem;
          height: 0.32rem;
    &.tag
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;
      background: var(--btn-background-theme-color);
      padding: 0 0.5em;
      border-radius: 0.8em;
      line-height: 1.6em;
      font-size: 0.2rem;
      @media screen and (max-width: 750px)
        font-size: 0.36rem;
      svg.icon
        margin-right: 0.25em;
        width: 0.2rem;
        height: 0.2rem;
        @media screen and (max-width: 750px)
          width: 0.32rem;
          height: 0.32rem;
    &.no-tag
      pointer-events: none;
      height: 100%;
      line-height: 1rem;
      font-size: 0.2rem;
    @media (hover: hover)
      &:hover
        background: var(--btn-hover-theme-color);
    &:active
      background: var(--btn-active-theme-color);
    &:not(:first-child)
      margin-left: 1em;
</style>