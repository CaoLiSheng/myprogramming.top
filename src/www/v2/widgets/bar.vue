<template lang="pug">
#bar
  router-link.explorer(
    title="浏览全部",
    :to="{ name: 'AllComponent', params: { query: '*', page: 1 } }"
  )
    AllIcon
  router-link.explorer.canlendar(
    title="按日历浏览",
    :to="{ name: 'CanlendarComponent', params: { year: '*', month: '*', day: '*', page: 1 } }"
  )
    CanlendarIcon
  router-link.explorer.tags(
    title="按标签浏览",
    :to="{ name: 'TagsComponent', params: { query: '*', page: 1 } }"
  )
    TagsIcon
  .change-theme(title="切换主题", @click="changeTheme")
    ThemeIcon
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import localforage from "localforage";

import ThemeIcon from "@images/theme.vue";
import AllIcon from "@images/all.vue";
import CanlendarIcon from "@images/canlendar.vue";
import TagsIcon from "@images/tags.vue";

const ThemeAttr = "theme";
const ThemeKey = "THEME";
const ThemeDefault = "Light";
const Theme2 = "Dark";

@Component({ components: { ThemeIcon, AllIcon, CanlendarIcon, TagsIcon } })
export default class BarComponent extends Vue {
  changeTheme() {
    const theme =
      document.body.getAttribute(ThemeAttr) === ThemeDefault
        ? Theme2
        : ThemeDefault;
    document.body.setAttribute(ThemeAttr, theme);
    localforage.setItem(ThemeKey, theme);
  }

  async mounted() {
    const curTheme = await localforage.getItem<string>(ThemeKey);
    document.body.setAttribute(ThemeAttr, curTheme || ThemeDefault);
  }
}
</script>

<style lang="stylus" scoped>
#bar
  .explorer
    float: left
  .change-theme
    float: right
  &>*
    width: 0.8rem
    height: 0.8rem
    padding: 0.2rem
    &.tags
      padding: 0.24rem
    &.canlendar
      padding: 0.22rem
    svg.icon
      display: block
      width: 100%
      height: 100%
</style>
