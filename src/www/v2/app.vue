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
  box-sizing: border-box;
  border: none;
  padding: 0;
  margin: 0;
body
  --header-theme-color: gray;
body[theme='Light']
  --theme-color: white;
  --secondary-theme-color: rgb(246, 248, 250);
  --third-theme-color: rgb(225, 228, 232);
  --btn-foreground-theme-color: rgb(137, 143, 149);
  --btn-background-theme-color: rgb(207, 228, 253);
  --btn-base-theme-color: rgb(71, 71, 71);
  --btn-hover-theme-color: rgb(99, 99, 99);
  --btn-active-theme-color: rgb(125, 128, 132);
body[theme='Dark']
  --theme-color: rgb(36, 41, 46);
  --secondary-theme-color: rgb(31, 36, 40);
  --third-theme-color: rgb(27, 31, 35);
  --btn-foreground-theme-color: wheat;
  --btn-background-theme-color: rgb(28, 68, 114);
  --btn-base-theme-color: rgb(225, 228, 232);
  --btn-hover-theme-color: white;
  --btn-active-theme-color: rgb(125, 128, 132);
body
  font-family: system-ui, 'PingFang SC', 'Microsoft YaHei', Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-weight: 200;
  user-select: none;
  -webkit-user-drag: none;
::-webkit-scrollbar
  width: 3pt;
  height: 3pt;
  border: none;
::-webkit-scrollbar-track
  background: #ddd;
  border-radius: 9pt;
::-webkit-scrollbar-corner
  background: #ddd;
::-webkit-scrollbar-thumb
  background: #999;
  border-radius: 9pt;
::-webkit-scrollbar-thumb:window-inactive
  background: #aaa;
</style>