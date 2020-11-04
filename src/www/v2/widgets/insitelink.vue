<template lang="pug">
.router
  a(:href="href")
    span.title {{ data.title }}
    span.date {{ data.date }}
    span.tags {{ data.tags.join(',') }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["name", "data"],
  data() {
    return {
      href: `${this.$props.name}${location.hash}`,
    };
  },
});
</script>

<style lang="stylus" scoped>
.router
  padding: 0.1rem
  & ~ .router
    border-top: dashed 0.01rem gray
  a
    display: block
    font-size: 16px
    line-height: 1.5em
    text-decoration: none
    padding: 0.05rem 0.1rem
    color: var(--btn-foreground-theme-color)
    border: solid 0.01rem var(--btn-foreground-theme-color)
    border-radius: 0.05rem
    &:hover
      background-color: var(--btn-background-theme-color)
    span
      display: block
      &.title
        font-size: 20px
</style>
