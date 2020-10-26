<template lang="pug">
router-view
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

// const IndexComponent = () =>
//   import(/* webpackChunkName: 'IndexComponent' */ "@vWidgets/index.vue");

// @Component({ components: { Index: IndexComponent } })
@Component
export default class App extends Vue {}
</script>

<style lang="stylus">
*, *:before, *:after
  user-select: none
  -webkit-user-drag: none
  box-sizing: border-box
  border: none
  padding: 0
  margin: 0
@import url('https://fonts.googleapis.com/css2?family=Long+Cang&display=swap')
body
  font-family: 'Long Cang', -apple-system-font, 'Hiragino Sans GB', 'Microsoft YaHei', Helvetica, sans-serif
  font-weight: 300
h1
  font-size: 0.72rem
span, div, p
  font-size: 0.32rem
</style>