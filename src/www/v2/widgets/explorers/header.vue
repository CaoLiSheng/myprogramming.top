<template lang="pug">
.header
  h6 {{ text }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["text"],
});
</script>

<style lang="stylus" scoped>
.header
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-left: solid 0.1rem gray;
  border-bottom: solid 0.01rem gray;
  background: var(--secondary-theme-color);
  line-height: 0.5rem;
  font-size: 0.2rem;
  @media screen and (max-width: 750px)
    font-size: 0.36rem;
  h6
    color: var(--btn-foreground-theme-color);
</style>