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
  width: 100vw
  display: flex
  flex-direction: row
  &:first-child
    height: calc(100vh - 0.8rem)
    border-bottom: solid 0.01rem var(--border-theme-color)
  &:last-child
    height: 0.8rem
  #side, #bar
    max-width: 28%
    min-width: 3.2rem
    flex: 2
    height: 100%
    background: var(--secondary-theme-color)
    border-right: solid 0.01rem var(--border-theme-color)
  #main, #status
    flex: 1
    height: 100%
    background: var(--theme-color)
  #side, #main
    overflow: auto
</style>