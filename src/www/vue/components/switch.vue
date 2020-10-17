<template lang="pug">
  div
    Links
    h1 {{title}}: 
      router-view
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Links from './links.vue'

@Component({components: {Links}})
export default class SamplesComponent extends Vue {
  title: string = '';
  mounted () {
    this.title = "Samples";
  }
}
</script>