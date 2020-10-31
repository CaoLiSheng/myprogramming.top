<template lang="pug">
h1 In Dev ...Searching -&gt;{{ query }}&lt;- @ page {{ page }}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["query", "page"],
});
</script>