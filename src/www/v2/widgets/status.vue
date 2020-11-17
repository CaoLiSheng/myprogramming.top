<template lang="pug">
.status
  a#menu.btn.right(@click="openMenu") 菜单
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { isMobileSize } from "@www/utils/rem";
import { ui } from "@vStores/index";

@Component
export default class StatusComponent extends Vue {
  sideRoot: HTMLElement | null;
  barRoot: HTMLElement | null;

  openMenu() {
    if (!ui.state.menuOpened) {
      ui.openMenu(this.sideRoot, this.barRoot);
    }
  }

  mounted() {
    if (!isMobileSize().result) return;

    this.sideRoot = document.getElementById("side");
    this.barRoot = document.getElementById("bar");

    setTimeout(() => {
      ui.setVisible(true);
      setTimeout(ui.closeMenu.bind(ui), 1000);
    }, 500);
  }
}
</script>

<style lang="stylus" scoped>
.status
  height: 100%;
  a
    &.btn
      cursor: pointer;
      user-select: none;
      display: inline-block;
      height: 100%;
      padding: 0 1em;
      line-height: 2em;
      font-size: 0.25rem;
      color: var(--btn-foreground-theme-color);
      @media screen and (max-width: 750px)
        font-size: 0.5rem;
    &.right
      float: right;
    &:active
      background-color: var(--btn-background-theme-color);
    @media screen and (min-width: 750px)
      &#menu
        display: none;
</style>