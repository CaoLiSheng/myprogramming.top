<template lang="pug">
h5 In Dev ... {{ year }} 年 {{ month }} 月 {{ day }} 日 @ page {{ page }}
</template>

<script lang="ts">

import Vue from "vue";
export default Vue.extend({
  props: ["year", "month", "day", "page"],
});
</script>

<style lang="stylus" scoped>
h5
  font-size: 24px
  line-height: 2em
  padding: 0 0.5rem
  margin-bottom: 0.2rem
  border-botton: solid 0.01rem gray
  box-shadow: 0 0.03rem 0.05rem 0 gray
  color: var(--title-theme-color)
</style>