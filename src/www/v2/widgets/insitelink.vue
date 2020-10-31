<template lang="pug">
a(:href="href") {{ text }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["data"],
  data() {
    return {
      href: `${this.$props.data}${location.hash}`,
      text: this.$props.data,
    };
  },
});
</script>

<style lang="stylus" scoped>
a
  display: block
  font-size: 16px
  line-height: 1.5em
</style>
