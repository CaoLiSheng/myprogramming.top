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
  background: var(--theme-color);
body[theme='Light']
  --theme-color: white;
  --secondary-theme-color: rgb(246, 248, 250);
  --third-theme-color: rgb(225, 228, 232);
  --contrast-theme-color: rgb(27, 31, 35);
  --btn-foreground-theme-color: rgb(137, 143, 149);
  --btn-background-theme-color: rgb(207, 228, 253);
  --btn-base-theme-color: rgb(71, 71, 71);
  --btn-hover-theme-color: rgb(200, 220, 230);
  --btn-active-theme-color: rgb(125, 128, 132);
body[theme='Dark']
  --theme-color: rgb(36, 41, 46);
  --secondary-theme-color: rgb(31, 36, 40);
  --third-theme-color: rgb(27, 31, 35);
  --contrast-theme-color: rgb(225, 228, 232);
  --btn-foreground-theme-color: wheat;
  --btn-background-theme-color: rgb(28, 68, 114);
  --btn-base-theme-color: rgb(225, 228, 232);
  --btn-hover-theme-color: rgb(30, 70, 136);
  --btn-active-theme-color: rgb(125, 128, 132);
  @media print
    --theme-color: white;
    --secondary-theme-color: rgb(246, 248, 250);
    --third-theme-color: rgb(225, 228, 232);
    --contrast-theme-color: rgb(27, 31, 35);
    --btn-foreground-theme-color: rgb(137, 143, 149);
    --btn-background-theme-color: rgb(207, 228, 253);
    --btn-base-theme-color: rgb(71, 71, 71);
    --btn-hover-theme-color: rgb(200, 220, 230);
    --btn-active-theme-color: rgb(125, 128, 132);
body
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-weight: 200;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  user-select: none;
  outline: none;
.r
  width: 100%;
  height: 100%;
  &.hidden
    display: none;
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