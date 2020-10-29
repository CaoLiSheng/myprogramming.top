<template lang="pug">
h1 In Dev ... {{ year }} 年 {{ month }} 月 {{ day }} 日 @ page {{ page }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["year", "month", "day", "page"],
});
</script>