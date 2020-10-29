<template lang="pug">
.r
  h5 搜索
  p @ page {{ page }}
  p Search for {{ query }}
  p Filter by {{ query }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["query", "page"],
});
</script>

<style lang="stylus" scoped>
h5
  margin-bottom: 0.18rem
</style>