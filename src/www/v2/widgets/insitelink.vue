<template lang="pug">
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
a
  display: block
  font-size: 16px
  line-height: 1.5em
  padding: 0.1rem 0.3rem
  text-decoration: none
  color: var(--a-foregrounnd-article-color)
  & ~ a
    border-top: dashed 0.01rem gray
  span
    display: block
    &.title
      font-size: 20px
</style>
