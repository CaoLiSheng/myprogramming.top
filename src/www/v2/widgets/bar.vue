<template lang="pug">
.r.bar
  .home.icon-wrapper(title="首页", :style="iconStyle", @click="goToHomePage")
    HomeIcon
  router-link.explorer.icon-wrapper(
    title="浏览全部",
    :style="iconStyle",
    :to="{ name: 'AllComponent', params: { query: '*' } }"
  )
    AllIcon
  router-link.explorer.icon-wrapper(
    title="按标签浏览",
    :style="iconStyle",
    :to="{ name: 'TagsComponent', params: { query: '*' } }"
  )
    TagsIcon
  .fn-btn.icon-wrapper(title="切换主题", :style="iconStyle", @click="changeTheme")
    ThemeIcon
  .fn-btn.icon-wrapper(
    title="切换浏览级别",
    v-if="ui.rlGrantable",
    :style="iconStyle",
    @click="changeReaderLevel"
  )
    DraftsShowIcon(v-if="ui.readerLevelGranted")
    DraftsHideIcon(v-if="!ui.readerLevelGranted")
  //- router-link.explorer(
  //-   title="按日历浏览",
  //-   :to="{ name: 'CanlendarComponent', params: { year: '*', month: '*', day: '*', page: 1 } }"
  //- )
  //-   .hoverable.icon-wrapper(
  //-     @mouseover="showPopup",
  //-     @mouseleave="inDevPopupVisibility = false",
  //-     @click="$event.preventDefault()"
  //-   )
  //-     CanlendarIcon
  //- portal(to="in-dev-portal")
  //-   .in-dev-popup(
  //-     v-show="inDevPopupVisibility",
  //-     :style="{ bottom: popupBottom + 'px', left: popupLeft + 'px' }"
  //-   )
  //-     .content 开发中...
</template>

<script lang="ts">

import AllIcon from "@images/all.vue";
import CanlendarIcon from "@images/canlendar.vue";
import DraftsHideIcon from "@images/drafts-hide.vue";
import DraftsShowIcon from "@images/drafts-show.vue";
import HomeIcon from "@images/home.vue";
import TagsIcon from "@images/tags.vue";
import ThemeIcon from "@images/theme.vue";
import { ui } from "@vStores/index";
import { EmptyOffset, HTMLElementOffset, getOffset } from "@www/utils/offset";
import computeIconStyle, { SizeCfg, iconSizeCfg1 } from "@www/v2/utils/sizeCfg";
import localforage from "localforage";
import Vue from "vue";
import Component from "vue-class-component";

const ThemeAttr = "theme";
const ThemeKey = "THEME";
const ThemeDefault = "Light";
const Theme2 = "Dark";

@Component( {
  components: {
    HomeIcon,
    ThemeIcon,
    AllIcon,
    CanlendarIcon,
    TagsIcon,
    DraftsShowIcon,
    DraftsHideIcon,
  },
} )
export default class BarComponent extends Vue {
  iconStyle = computeIconStyle( iconSizeCfg1 as SizeCfg );

  inDevPopupVisibility = false;

  popupBottom = 0;

  popupLeft = 0;

  ui = ui.state;

  async mounted (): Promise<void> {
    const curTheme = await localforage.getItem<string>( ThemeKey );
    document.body.setAttribute( ThemeAttr, curTheme || ThemeDefault );
  }

  showPopup ( ev: MouseEvent ): void {
    let offset: HTMLElementOffset = EmptyOffset;
    if ( ev.target instanceof HTMLElement ) {
      offset = getOffset( ev.target );
    }
    this.$data.popupBottom = window.innerHeight - offset.top + 10;
    this.$data.popupLeft = offset.left + offset.width / 2;
    this.$data.inDevPopupVisibility = true;
  }

  goToHomePage (): void {
    window.location.href = `index.html${ window.location.hash }`;
  }

  changeTheme (): void {
    const theme =
      document.body.getAttribute( ThemeAttr ) === ThemeDefault
        ? Theme2
        : ThemeDefault;
    document.body.setAttribute( ThemeAttr, theme );
    void localforage.setItem( ThemeKey, theme );
  }

  changeReaderLevel (): void {
    ui.toggleReaderLevel();
  }
}
</script>

<style lang="stylus" scoped>
.bar
  .home, .explorer
    float: left;
  .fn-btn
    float: right;
  .icon-wrapper
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg.icon
      pointer-events: none;
      width: var(--icon-size);
      height: var(--icon-size);
    @media (hover: hover)
      &:hover
        background: var(--btn-hover-theme-color);
    &:active
      background: var(--btn-active-theme-color);
.in-dev-popup
  pointer-events: none;
  font-size: 0.18rem;
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
    font-size: 0.18rem;
    border: solid 0.3rem transparent;
    border-top-color: var(--btn-background-theme-color);
    position: absolute;
    bottom: -2.5em;
    left: 2.5em;
    transform: translateX(-50%);
</style>
