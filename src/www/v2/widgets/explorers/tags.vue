<template lang="pug">
h5 In Dev ...Searching -&gt;{{ query }}&lt;-
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["query"],
});
</script>

<style lang="stylus" scoped></style>