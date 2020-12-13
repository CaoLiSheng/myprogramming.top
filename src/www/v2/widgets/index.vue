<template lang="pug">
.r
  .row-wrapper
    #main(v-once, v-html="article")
    #side(:class="{ hidden: !ui.menuOpened, visible: ui.menuVisible }")
      router-view
  .row-wrapper
    #status
      Status
    #bar(:class="{ hidden: !ui.menuOpened, visible: ui.menuVisible }")
      Bar(:sizeCfg="barIconSizeCfg")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import extendCodes from "@www/utils/code";
import extendTables from "@www/utils/table";
import { ui } from "@vStores/index";

declare var ARTICLE: string;

const BarComponent = () =>
  import(/* webpackChunkName: 'BarComponent' */ "@vWidgets/bar.vue");
const StatusComponent = () =>
  import(/* webpackChunkName: 'BarComponent' */ "@vWidgets/status.vue");

@Component({ components: { Bar: BarComponent, Status: StatusComponent } })
export default class IndexComponent extends Vue {
  barIconSizeCfg = ["0.5rem", "1rem", "0.25rem", "0.5rem"];
  article = ARTICLE;
  ui = ui.state;

  mounted() {
    extendCodes();
    extendTables();
  }
}
</script>

<style lang="stylus" scoped>
.row-wrapper
  width = 100vw;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  &:first-child
    height: calc(100vh - 0.5rem);
    border-bottom: solid 0.01rem var(--third-theme-color);
  &:last-child
    height: 0.5rem;
  @media screen and (max-width: 750px)
    &:first-child
      height: calc(100vh - 1rem);
      height: calc(var(--vh, 1vh) * 100 - 1rem);
    &:last-child
      height: 1rem;
  #side, #bar
    flex-basis: 4.5rem;
    flex-shrink: 0;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    background: var(--secondary-theme-color);
    border-right: solid 0.01rem var(--third-theme-color);
    @media screen and (min-width: 1100px)
      max-width: 30%;
    @media screen and (max-width: 1100px)
      max-width: 4.5rem;
    @media screen and (max-width: 750px)
      max-width: 80%;
      visibility: hidden;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      box-shadow: 0.1rem 0.5rem 0.5rem var(--contrast-theme-color);
      transform: translateX(0);
      transition: transform ease-in-out 500ms, box-shadow linear 500ms;
      &.visible
        visibility: visible;
      &.hidden
        transform: translateX(-125%);
  #main, #status
    flex: 1;
    height: 100%;
    background: var(--theme-color);
  #main
    overflow: auto;
    position: relative;
    -webkit-user-select: text;
    user-select: text;
    background: linear-gradient(to bottom, var(--third-theme-color), var(--theme-color) 54vh, var(--theme-color));
</style>