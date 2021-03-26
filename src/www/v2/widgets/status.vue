<template lang="pug">
.r.status
  a.icon-wrapper(
    title="去旧版网站",
    v-if="!isMobile",
    :style="iconStyle",
    @click="goToV1"
  )
    GateIcon
  a.btn(v-if="isMobile", @click="openMenu") 菜单
  a.tag(
    v-for="tag in tags",
    :key="tag",
    :class="{ selected: selectedTags.includes(tag) }",
    @click="$event.preventDefault(), click(tag)"
  ) {{ tag }}
    TagIcon
  a.no-tag(v-if="isMobile") ...没有标签咯
</template>

<script lang="ts">

import GateIcon from "@images/gate.vue";
import TagIcon from "@images/tag-small.vue";
import { db, initOnce, ui } from "@vStores/index";
import { isMobileSize } from "@www/utils/rem";
import computeIconStyle, { SizeCfg, iconSizeCfg1 } from "@www/v2/utils/sizeCfg";
import Vue from "vue";
import Component from "vue-class-component";

import { clickOnTag } from "../router";

declare let __portal_to_v1__: string;

const __HomePageIndicators = new Set( [
  "/blog/v2/",
  "/blog/v2/index",
  "/blog/v2/index.html",
  "/",
  "/index",
  "/index.html",
] );

@Component( { components: { TagIcon, GateIcon } } )
export default class StatusComponent extends Vue.extend( {
  props: { query: { type: String, default: '' } },
} ) {
  iconStyle = computeIconStyle( iconSizeCfg1 as SizeCfg );

  db = db.state;

  isMobile = isMobileSize().result;

  sideRoot: HTMLElement | null = null;

  barRoot: HTMLElement | null = null;

  mounted (): void {
    void initOnce();

    if ( !this.isMobile ) return;

    this.sideRoot = document.querySelector( "#side" );
    this.barRoot = document.querySelector( "#bar" );

    setTimeout( () => {
      ui.setVisible( true );
      setTimeout( ui.closeMenu.bind( ui ), 1000 );
    }, 500 );
  }

  get tags (): string[] {
    if ( !this.db.refresh ) return [];

    const parsed = decodeURIComponent( window.location.pathname ).split( "/" );
    const post = parsed[parsed.length - 1];
    if ( !post ) return [];

    return db.data.metas[post]?.tags;
  }

  get selectedTags (): string[] {
    if ( !this.query || this.query === "*" ) {
      return [];
    }

    return this.query.split( "," ).map( ( t: string ) => t.trim() );
  }

  click ( tag: string ): void {
    if ( this.isMobile ) {
      this.openMenu();
    }
    clickOnTag( tag, this.$router );
  }

  openMenu (): void {
    if ( !ui.state.menuOpened ) {
      ui.openMenu( this.sideRoot, this.barRoot );
    }
  }

  static goToV1 (): void {
    if ( __HomePageIndicators.has( window.location.pathname ) ) {
      window.location.href = __portal_to_v1__;
      return;
    }

    const post = window.location.pathname.match( /^.*\/(.*)(\.html)?$/ )?.[1];
    if ( !post ) {
      window.location.href = __portal_to_v1__;
      return;
    }

    window.location.href = `${ __portal_to_v1__ }#/post/${ post }`;
  }
}
</script>

<style lang="stylus" scoped>
.status
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  transform: scaleX(-1);
  a
    transform: scaleX(-1);
    cursor: pointer;
    color: var(--btn-foreground-theme-color);
    &.icon-wrapper
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      svg.icon
        pointer-events: none;
        width: var(--icon-size);
        height: var(--icon-size);
    &.btn
      padding: 0 1em;
      font-size: 0.2rem;
      line-height: 0.5rem;
      @media screen and (max-width: 750px)
        font-size: 0.4rem;
        line-height: 1rem;
    &.tag
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;
      color: var(--theme-color);
      background: var(--btn-background-theme-color);
      padding: 0 0.5em;
      border-radius: 0.8em;
      line-height: 0.3rem;
      font-size: 0.16rem;
      @media screen and (max-width: 750px)
        line-height: 0.6rem;
        font-size: 0.3rem;
      svg.icon
        margin-right: 0.25em;
        width: 0.2rem;
        height: 0.2rem;
        @media screen and (max-width: 750px)
          width: 0.32rem;
          height: 0.32rem;
    &.no-tag
      pointer-events: none;
      line-height: 0.5rem;
      font-size: 0.16rem;
      @media screen and (max-width: 750px)
        line-height: 1rem;
        font-size: 0.3rem;
    &:active
      background: var(--btn-active-theme-color);
    &:not(:first-child)
      margin-left: 1em;
    @media (hover: hover)
      &:hover
        background: var(--btn-hover-theme-color);
</style>