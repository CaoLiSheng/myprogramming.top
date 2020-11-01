<template lang="pug">
#bar
  router-link.explorer(
    title="浏览全部",
    :to="{ name: 'AllComponent', params: { query: '*', page: 1 } }"
  )
    .hoverable
      AllIcon
  router-link.explorer(
    title="按日历浏览",
    :to="{ name: 'CanlendarComponent', params: { year: '*', month: '*', day: '*', page: 1 } }"
  )
    .hoverable.canlendar(
      @mouseover="showPopup",
      @mouseleave="inDevPopupVisibility = false"
    )
      CanlendarIcon
  router-link.explorer(
    title="按标签浏览",
    :to="{ name: 'TagsComponent', params: { query: '*', page: 1 } }"
  )
    .hoverable.tags(
      @mouseover="showPopup",
      @mouseleave="inDevPopupVisibility = false"
    )
      TagsIcon
  .change-theme(title="切换主题", @click="changeTheme")
    ThemeIcon
  portal(to="in-dev-portal")
    .in-dev-popup(
      v-show="inDevPopupVisibility",
      :style="{ bottom: popupBottom + 'px', left: popupLeft + 'px' }"
    )
      .content 开发中...
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import localforage from "localforage";

import { HTMLElementOffset, EmptyOffset, getOffset } from "@www/utils/offset";

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
  data() {
    return { inDevPopupVisibility: false, popupBottom: 0, popupLeft: 0 };
  }

  showPopup(ev: MouseEvent) {
    let offset: HTMLElementOffset = EmptyOffset;
    if (ev.target instanceof HTMLElement) {
      offset = getOffset(ev.target);
    }
    this.$data.popupBottom = window.innerHeight - offset.top + 10;
    this.$data.popupLeft = offset.left + offset.width / 2;
    this.$data.inDevPopupVisibility = true;
  }

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
  &>*
    width: 0.8rem
    height: 0.8rem
  .explorer
    float: left
    .hoverable
      width: 100%
      height: 100%
      padding: 0.2rem
      &.tags
        padding: 0.24rem
      &.canlendar
        padding: 0.22rem
  .change-theme
    float: right
    padding: 0.2rem
  svg.icon
    display: block
    width: 100%
    height: 100%
    pointer-events: none
.in-dev-popup
  pointer-events: none
  font-size: 18px
  position: fixed
  transform: translateX(-50%)
  background: var(--theme-color)
  width: 5em
  height: 5em
  line-height: 5em
  text-align: center
  border-radius: 50%
  &:before
    content: ''
    display: block
    height: 0
    width: 0
    border: solid 30px transparent
    border-top-color: var(--theme-color)
    position: absolute
    bottom: -40px
    left: 2.5em
    transform: translateX(-50%)
</style>
