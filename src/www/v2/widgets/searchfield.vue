<template lang="pug">
form(:style="{ height }", action="", method="")
  button(:style="{ fontSize }", @click="$event.preventDefault(); onClear()") 清空
  input(
    type="text",
    placeholder="输入关键字搜索",
    :style="{ fontSize }",
    @input="onChange($event)"
  )
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["height", "fontSize", "onChange", "onClear"],
});
</script>

<style lang="stylus" scoped>
form
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 0.01rem gray;
  &>*
    flex: 0;
    height: 50%;
    outline: none;
    color: var(--btn-foreground-theme-color);
    background: var(--btn-background-theme-color);
    border: solid 0.01rem var(--btn-base-theme-color);
    border-radius: 0.2em;
  button
    flex-basis: 5em;
    padding: 0 1em;
    &:hover
      background: var(--btn-hover-theme-color);
    &:active
      background: var(--btn-active-theme-color);
  input
    flex-basis: calc(100% - 8em);
    padding: 0 0.5em;
</style>