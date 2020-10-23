<template lang="pug">
#main-wrapper(:class="{ inverted: inverted }")
  .row-wrapper
    #side
    #main
  .row-wrapper
    Bar(
      :changeTheme="changeTheme",
      :showDefaultExplorer="showDefaultExplorer",
      :showCanlenderExplorer="showCanlenderExplorer",
      :showTagsExplorer="showTagsExplorer"
    ) 
    #status
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const BarComponent = () =>
  import(/* webpackChunkName: 'BarComponent' */ "@vWidgets/bar.vue");

@Component({ components: { Bar: BarComponent } })
export default class IndexComponent extends Vue {
  data() {
    return { inverted: false };
  }
  changeTheme() {
    this.$data.inverted = !this.$data.inverted;
  }
  showDefaultExplorer() {
    console.log("showDefaultExplorer");
  }
  showCanlenderExplorer() {
    console.log("showCanlenderExplorer");
  }
  showTagsExplorer() {
    console.log("showTagsExplorer");
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
    border-bottom: solid 0.01rem rgb(225, 228, 232)
  &:last-child
    height: 0.8rem
  #side, #bar
    max-width: 20%
    min-width: 3.2rem
    flex: 2
    height: 100%
    background: rgb(246, 248, 250)
    border-right: solid 0.01rem rgb(225, 228, 232)
  #main, #status
    flex: 1
    height: 100%
    background: white
.inverted
  .row-wrapper
    &:first-child
      border-bottom: solid 0.01rem rgb(27, 31, 35)
    #side, #bar
      background: rgb(31, 36, 40)
      border-right: solid 0.01rem rgb(27, 31, 35)
    #main, #status
      background: rgb(36, 41, 46)
</style>