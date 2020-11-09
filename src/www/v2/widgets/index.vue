<template lang="pug">
.r
  .row-wrapper
    #side
      router-view
    #main(v-once, v-html="article")
  .row-wrapper
    Bar 
    #status
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

declare var ARTICLE: string;

const BarComponent = () =>
  import(/* webpackChunkName: 'BarComponent' */ "@vWidgets/bar.vue");

@Component({ components: { Bar: BarComponent } })
export default class IndexComponent extends Vue {
  data() {
    return {
      article: ARTICLE,
    };
  }
}
</script>

<style lang="stylus" scoped>
.row-wrapper
  width: 100vw;
  display: flex;
  flex-direction: row;
  &:first-child
    height: calc(100vh - 0.5rem);
    border-bottom: solid 0.01rem var(--third-theme-color);
  &:last-child
    height: 0.5rem;
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