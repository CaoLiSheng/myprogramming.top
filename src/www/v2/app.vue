<template lang="pug">
.r
  router-view
  portal-target(name="in-dev-portal")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component
export default class App extends Vue {}
</script>

<style lang="stylus">
*, *:before, *:after
  box-sizing: border-box
  border: none
  padding: 0
  margin: 0
body
  --a-foregrounnd-article-color: #0366d6
  --title-theme-color: gray
body[theme='Light']
  --theme-color: white
  --secondary-theme-color: rgb(246, 248, 250)
  --border-theme-color: rgb(225, 228, 232)
  --btn-base-theme-color: rgb(71, 71, 71)
  --btn-hover-theme-color: rgb(99, 99, 99)
  --btn-active-theme-color: rgb(125, 128, 132)
body[theme='Dark']
  --theme-color: rgb(36, 41, 46)
  --secondary-theme-color: rgb(31, 36, 40)
  --border-theme-color: rgb(27, 31, 35)
  --btn-base-theme-color: rgb(225, 228, 232)
  --btn-hover-theme-color: white
  --btn-active-theme-color: rgb(125, 128, 132)
body
  font-family: system-ui, 'PingFang SC', 'Microsoft YaHei', Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'
  font-weight: 200
  user-select: none
  -webkit-user-drag: none
</style>