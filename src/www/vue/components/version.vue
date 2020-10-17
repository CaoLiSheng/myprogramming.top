<template lang="pug">
  span {{ version }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    version: {
      type: String,
      default: '0'
    }
  }
})
</script>