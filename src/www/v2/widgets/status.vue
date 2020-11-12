<template lang="pug">
.status
  a#menu.btn.right(@click="openMenu") 菜单
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { clickIn } from "@www/utils/dom";
import { ui } from "@vStores/index";

@Component
export default class StatusComponent extends Vue {
  sideRoot: HTMLElement | null;
  barRoot: HTMLElement | null;

  handleMenuClose(ev: MouseEvent) {
    if (!(ev.target instanceof HTMLElement)) return;
    if (clickIn(ev.target, this.sideRoot, this.barRoot)) return;
    ui.closeMenu();
    document.body.removeEventListener("click", this.handleMenuClose);
  }

  openMenu() {
    ui.openMenu();
    setTimeout(
      () => document.body.addEventListener("click", this.handleMenuClose),
      0
    );
  }

  mounted() {
    if (window.screen.availWidth > 750) return;

    this.sideRoot = document.getElementById("side");
    this.barRoot = document.getElementById("bar");

    setTimeout(ui.closeMenu.bind(ui), 1000);
  }
}
</script>

<style lang="stylus" scoped>
.status
  height: 100%;
  a
    &.btn
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