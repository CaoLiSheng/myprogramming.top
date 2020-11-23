<template lang="pug">
.link
  a(:href="href", :class="{ init, running }")
    span.title {{ data.title }}
    span.date {{ data.date }}
    span.tags {{ data.tags.join(',') }}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const InsiteLinkProps = Vue.extend({
  props: ["name", "data", "delay"],
});

@Component
export default class InsiteLink extends InsiteLinkProps {
  get href() {
    return `${this.$props.name}${location.hash}`;
  }

  init = true;
  running = true;

  mounted() {
    setTimeout(() => {
      this.init = false;
    }, this.delay);
    setTimeout(() => {
      this.running = false;
    }, this.delay + 300);
  }
}
</script>

<style lang="stylus" scoped>
.link
  padding: 0.1rem;
  & ~ .link
    border-top: dashed 0.01rem gray;
  a
    display: block;
    font-size: 16px;
    line-height: 1.5em;
    text-decoration: none;
    padding: 0.05rem 0.1rem;
    color: var(--btn-foreground-theme-color);
    border: solid 0.01rem var(--btn-foreground-theme-color);
    border-radius: 0.05rem;
    transform: translateX(0);
    transition: transform ease-in-out 300ms;
    @media screen and (min-width: 750px)
      transition: transform ease-in-out 100ms;
      &:hover
        transform: translate3d(0.05rem, -0.05rem, 0);
        background-color: var(--btn-background-theme-color);
      &:active
        transform: translate3d(0.05rem, 0.05rem, 0);
    &.init
      transform: translateX(-100%);
    &.running
      background-color: var(--btn-background-theme-color);
    span
      display: block;
      &.title
        font-size: 20px;
</style>
