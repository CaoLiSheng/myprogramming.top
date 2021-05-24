<template lang="pug">
  .link
    a(:class="{ init, running }", @click="$event.preventDefault(); goToHref()")
      span.title {{ data.title }}
      span.date {{ date }}
      span.tags {{ data.tags.join(',') }}
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";
import { clickOnLink } from "@v2/router";

@Component
export default class InsiteLink extends Vue.extend ( {
  props: {
    name: {
      type   : String,
      default: '',
    },
    data: {
      type   : Object,
      default: () => ( {} ),
    },
    delay: {
      type   : Number,
      default: 0,
    }
  },
} ) {
  init = true;
  running = true;

  get date (): string {
    return ( this.data.top ? this.data.date : this.data.date.slice ( 0, 10 ) ) as string;
  }

  mounted (): void {
    setTimeout ( () => {
      this.init = false;
    }, this.delay );
    setTimeout ( () => {
      this.running = false;
    }, this.delay + 300 );
  }

  goToHref (): void {
    clickOnLink ( this.$props.name, this.$router );
  }
}
</script>

<style lang="stylus" scoped>
.link
  padding: 0.2rem;
  & ~ .link
    border-top: dashed 0.01rem gray;
  a
    cursor: pointer;
    display: block;
    font-size: 0;
    text-decoration: none;
    padding: 0.05rem 0.1rem;
    color: var(--btn-foreground-theme-color);
    border: solid 0.01rem var(--btn-foreground-theme-color);
    border-radius: 0.1rem;
    transform: translateX(0);
    transition: transform ease-in-out 300ms;
    &.init
      transform: translateX(-100%);
    &.running
      background-color: var(--btn-background-theme-color);
    span
      display: block;
      line-height: 1.5em;
      &.title
        font-size: 0.32rem;
      &.date
        font-size: 0.26rem;
        border-top: dashed 0.01rem var(--btn-foreground-theme-color);
        border-bottom: dashed 0.01rem var(--btn-foreground-theme-color);
      &.tags
        font-size: 0.2rem;
    @media (hover: hover)
      &:hover
        transform: translate3d(0.05rem, -0.05rem, 0);
        background-color: var(--btn-background-theme-color);
    @media screen and (min-width: 750px)
      transition: transform ease-in-out 100ms;
      &:active
        transform: translate3d(0.05rem, 0.05rem, 0);
      span
        &.title
          font-size: 0.2rem;
        &.date
          font-size: 0.16rem;
        &.tags
          font-size: 0.12rem;
</style>
