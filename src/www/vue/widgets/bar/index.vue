<template lang="pug">
#bar
  .explorer(@click="changeTheme")
    AllIcon
  .explorer(@click="changeTheme")
    CanlendarIcon
  .explorer.tags(@click="changeTheme")
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
  props: ["changeTheme"],
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
</style>
