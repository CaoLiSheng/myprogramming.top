<template lang="pug">
  .hello 
    Links
    p {{ computedMsg }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Links from './links.vue'

const HelloComponentProps = Vue.extend({
  props: {
    msg: {
      type: String,
      default: 'world.'
    }
  }
})

@Component({components: { Links }})
export default class HelloComponent extends HelloComponentProps {
  get computedMsg(): string {
    return 'Hello, ' + this.msg
  }
}
</script>
