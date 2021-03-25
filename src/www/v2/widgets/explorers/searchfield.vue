<template lang="pug">
form(action="", method="")
  a(@click="$event.preventDefault(); clear()") 🈳️
  input(
    ref="query",
    type="text",
    placeholder="🔍 Type to Search",
    @input="onInput($event)"
  )
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class SearchField extends Vue.extend({
  props: ["onInput", "onClear"],
}) {
  clear() {
    const input = this.$refs.query as HTMLInputElement;
    input.value = "";
    this.onClear();
  }
}
</script>

<style lang="stylus" scoped>
form
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 0.01rem var(--third-theme-color);
  height: 0.8rem;
  &>*
    flex: 0;
    outline: none;
    color: var(--btn-foreground-theme-color);
    background: var(--btn-background-theme-color);
    border: solid 0.01rem var(--btn-base-theme-color);
    border-radius: 0.2em;
    font-size: 0.18rem;
    line-height: 0.38rem;
    height: 50%;
    @media screen and (max-width: 750px)
      font-size: 0.28rem;
      line-height: 0.58rem;
      height: 75%;
  a
    flex-basis: 2em;
    cursor: pointer;
    text-align: center;
    @media (hover: hover)
      &:hover
        background: var(--btn-hover-theme-color);
    &:active
      background: var(--btn-active-theme-color);
    &:focus, &:visited
      background: var(--btn-background-theme-color);
  input
    flex-basis: calc(100% - 4em);
    padding: 0 0.45em;
</style>