<template lang="pug">
#bar
  .explorer(@click="showDefaultExplorer")
    AllIcon
  .explorer.canlendar(@click="showCanlenderExplorer")
    CanlendarIcon
  .explorer.tags(@click="showTagsExplorer")
    TagsIcon
  .change-theme(@click="changeTheme")
    ThemeIcon
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ThemeIcon from "@images/theme.vue";
import AllIcon from "@images/all.vue";
import CanlendarIcon from "@images/canlendar.vue";
import TagsIcon from "@images/tags.vue";

const BarComponentBase = Vue.extend({
  props: [
    "changeTheme",
    "showDefaultExplorer",
    "showCanlenderExplorer",
    "showTagsExplorer",
  ],
});

@Component({ components: { ThemeIcon, AllIcon, CanlendarIcon, TagsIcon } })
export default class BarComponent extends BarComponentBase {}
</script>

<style lang="stylus" scoped>
#bar
  .explorer
    float: left
  .change-theme
    float: right
  &>*
    width: 0.8rem
    height: 0.8rem
    padding: 0.2rem
    svg.icon
      display: block
      width: 100%
      height: 100%
    &.tags
      padding: 0.24rem
    &.canlendar
      padding: 0.18rem
</style>
