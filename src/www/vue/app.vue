<template lang="pug">
router-view
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
});
</script>

<style lang="stylus">
*, *:before, *:after
  user-select: none
  -webkit-user-drag: none
  box-sizing: border-box
  border: none
  padding: 0
  margin: 0
h1
  font-size: 0.72rem
span, div, p
  font-size: 0.32rem
</style>