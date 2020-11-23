<template lang="pug">
form(action="", method="")
  a(@click="$event.preventDefault(); clear()") 清空
  input(
    ref="query",
    type="text",
    placeholder="输入关键字搜索",
    @input="onChange($event)"
  )
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["onChange", "onClear"],
  methods: {
    clear() {
      (this.$refs.query as HTMLInputElement).value = "";
      this.onClear();
    },
  },
});
</script>

<style lang="stylus" scoped>
form
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 0.01rem gray;
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
    flex-basis: 3em;
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
    flex-basis: calc(100% - 6em);
    padding: 0 0.45em;
</style>