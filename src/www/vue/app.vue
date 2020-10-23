<template lang="pug">
#main-wrapper(:class="{ inverted: inverted }")
  .row-wrapper
    #side
    #main
  .row-wrapper
    Bar(:changeTheme="changeTheme")
    #status
</template>

<script lang="ts">
import Vue from "vue";
import Bar from "@vWidgets/bar/index.vue";
export default Vue.extend({
  components: { Bar },
  data() {
    return { inverted: false };
  },
  methods: {
    changeTheme() {
      console.log("hi");
      this.$data.inverted = !this.$data.inverted;
    },
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

<style lang="stylus" scoped>
.row-wrapper
  width: 100vw
  display: flex
  flex-direction: row
  &:first-child
    height: calc(100vh - 0.8rem)
    border-bottom: solid 0.01rem rgb(225, 228, 232)
  &:last-child
    height: 0.8rem
  #side, #bar
    max-width: 20%
    min-width: 3.2rem
    flex: 2
    height: 100%
    background: rgb(246, 248, 250)
    border-right: solid 0.01rem rgb(225, 228, 232)
  #main, #status
    flex: 1
    height: 100%
    background: white
.inverted
  .row-wrapper
    &:first-child
      border-bottom: solid 0.01rem rgb(27, 31, 35)
    #side, #bar
      background: rgb(31, 36, 40)
      border-right: solid 0.01rem rgb(27, 31, 35)
    #main, #status
      background: rgb(36, 41, 46)
</style>