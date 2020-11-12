<template lang="pug">
.r
  .row-wrapper
    #side(:class="{ opened: ui.menuOpened }")
      router-view
    #main(v-once, v-html="article")
  .row-wrapper
    #bar(:class="{ opened: ui.menuOpened }")
      Bar
    #status
      Status
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { ui } from "@vStores/index";

declare var ARTICLE: string;

const BarComponent = () =>
  import(/* webpackChunkName: 'BarComponent' */ "@vWidgets/bar.vue");
const StatusComponent = () =>
  import(/* webpackChunkName: 'BarComponent' */ "@vWidgets/status.vue");

@Component({ components: { Bar: BarComponent, Status: StatusComponent } })
export default class IndexComponent extends Vue {
  data() {
    return {
      article: ARTICLE,
      ui: ui.state,
    };
  }
}
</script>

<style lang="stylus" scoped>
.row-wrapper
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: relative;
  &:first-child
    height: calc(100vh - 0.5rem);
    border-bottom: solid 0.01rem var(--third-theme-color);
    @media screen and (max-width: 750px)
      height: calc(100vh - 1rem);
  &:last-child
    height: 0.5rem;
    @media screen and (max-width: 750px)
      height: 1rem;
  #side, #bar
    flex-basis: 3.3rem;
    flex-shrink: 0;
    flex-grow: 1;
    height: 100%;
    background: var(--secondary-theme-color);
    border-right: solid 0.01rem var(--third-theme-color);
    @media screen and (min-width: 1100px)
      max-width: 30%;
    @media screen and (max-width: 1100px)
      max-width: 3.3rem;
    @media screen and (max-width: 750px)
      max-width: 80%;
      width: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      transition: transform ease-in-out 200ms;
      &.opened
        transform: translateX(0);
  #main, #status
    flex: 1;
    height: 100%;
    background: var(--theme-color);
  #side
    overflow: hidden;
  #main
    overflow: auto;
    user-select: text;
    background: linear-gradient(to bottom, var(--third-theme-color), var(--theme-color) 54vh, var(--theme-color));
</style>