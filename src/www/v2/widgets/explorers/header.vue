<template lang="pug">
.header
  h6 {{ text }}
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend( {
  props: { text: { type: String, default: '' } },
} );
</script>

<style lang="stylus" scoped>
.header
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-bottom: solid 0.01rem var(--third-theme-color);
  line-height: 0.5rem;
  font-size: 0.2rem;
  position: relative;
  &::before
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.3em;
    background: var(--contrast-theme-color);
  @media screen and (max-width: 750px)
    font-size: 0.36rem;
  h6
    color: var(--btn-foreground-theme-color);
</style>