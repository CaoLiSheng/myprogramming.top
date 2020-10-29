<template lang="pug">
router-view
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
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
body
  --theme-color: white
  --secondary-theme-color: rgb(246, 248, 250)
  --border-theme-color: rgb(225, 228, 232)
  --btn-base-theme-color: rgb(71, 71, 71)
  --btn-hover-theme-color: rgb(99, 99, 99)
  --btn-active-theme-color: rgb(125, 128, 132)
body[inverted]
  --theme-color: rgb(36, 41, 46)
  --secondary-theme-color: rgb(31, 36, 40)
  --border-theme-color: rgb(27, 31, 35)
  --btn-base-theme-color: rgb(225, 228, 232)
  --btn-hover-theme-color: white
  --btn-active-theme-color: rgb(125, 128, 132)
body
  font-family: -apple-system-font, 'Hiragino Sans GB', 'Microsoft YaHei', Helvetica, sans-serif
  font-weight: 200
h1
  font-size: 0.72rem
span, div, p
  font-size: 0.32rem
</style>