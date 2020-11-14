<template lang="pug">
.bar
  router-link.explorer(
    title="浏览全部",
    :to="{ name: 'AllComponent', params: { query: '*', page: 1 } }"
  )
    .hoverable.icon-wrapper
      AllIcon
  router-link.explorer(
    title="按日历浏览",
    :to="{ name: 'CanlendarComponent', params: { year: '*', month: '*', day: '*', page: 1 } }"
  )
    .hoverable.icon-wrapper(
      @mouseover="showPopup",
      @mouseleave="inDevPopupVisibility = false"
    )
      CanlendarIcon
  router-link.explorer(
    title="按标签浏览",
    :to="{ name: 'TagsComponent', params: { query: '*', page: 1 } }"
  )
    .hoverable.icon-wrapper(
      @mouseover="showPopup",
      @mouseleave="inDevPopupVisibility = false"
    )
      TagsIcon
  .change-theme.icon-wrapper(title="切换主题", @click="changeTheme")
    ThemeIcon
  .home.icon-wrapper(title="首页", @click="goToHomePage")
    HomeIcon
  portal(to="in-dev-portal")
    .in-dev-popup(
      v-show="inDevPopupVisibility",
      :style="{ top: popupTop + 'px', left: popupLeft + 'px' }"
    )
      .content 开发中...
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import localforage from "localforage";

import { HTMLElementOffset, EmptyOffset, getOffset } from "@www/utils/offset";

import HomeIcon from "@images/home.vue";
import ThemeIcon from "@images/theme.vue";
import AllIcon from "@images/all.vue";
import CanlendarIcon from "@images/canlendar.vue";
import TagsIcon from "@images/tags.vue";

const ThemeAttr = "theme";
const ThemeKey = "THEME";
const ThemeDefault = "Light";
const Theme2 = "Dark";

@Component({
  components: { HomeIcon, ThemeIcon, AllIcon, CanlendarIcon, TagsIcon },
})
export default class BarComponent extends Vue {
  data() {
    return { inDevPopupVisibility: false, popupTop: 0, popupLeft: 0 };
  }

  showPopup(ev: MouseEvent) {
    let offset: HTMLElementOffset = EmptyOffset;
    if (ev.target instanceof HTMLElement) {
      offset = getOffset(ev.target);
    }
    this.$data.popupTop = offset.top + offset.height + 10;
    this.$data.popupLeft = offset.left + offset.width / 2;
    this.$data.inDevPopupVisibility = true;
  }

  goToHomePage() {
    window.location.href = "index.html";
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
.bar
  height: 100%;
  &>*
    height: 100%;
    width: 0.8rem;
    @media screen and (max-width: 750px)
      width: 1rem;
  .explorer
    float: left;
    .hoverable
      width: 100%;
      height: 100%;
  .change-theme, .home
    float: right;
  .icon-wrapper
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover
      cursor: pointer;
  svg.icon
    width: 0.25rem;
    height: 0.25rem;
    pointer-events: none;
    @media screen and (max-width: 750px)
      width: 0.5rem;
      height: 0.5rem;
.in-dev-popup
  pointer-events: none;
  font-size: 18px;
  position: fixed;
  transform: translateX(-50%);
  background: var(--btn-background-theme-color);
  color: var(--btn-foreground-theme-color);
  width: 5em;
  height: 5em;
  line-height: 5em;
  text-align: center;
  border-radius: 50%;
  &:before
    content: '';
    display: block;
    height: 0;
    width: 0;
    border: solid 30px transparent;
    border-bottom-color: var(--btn-background-theme-color);
    position: absolute;
    top: -40px;
    left: 2.5em;
    transform: translateX(-50%);
</style>
