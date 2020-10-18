<template lang="pug">
div(:class="{inverted:inverted}")
  .row-wrapper
    #side
    #main
  .row-wrapper
    #bar
      .change-theme(@click="changeTheme") 
        ThemeIcon
    #status
</template>

<script lang="ts">
import Vue from 'vue'
import ThemeIcon from '@images/theme.vue'
export default Vue.extend({
  components: {ThemeIcon},
  data() {
    return {inverted:false}
  },
  methods: {
    changeTheme() {
      console.log('hi')
      this.$data.inverted = !this.$data.inverted
    }
  },
})
</script>

<style lang="stylus">
*
*:before
*:after
  user-select none
  -webkit-user-drag none 
  box-sizing border-box
  border none
  padding 0
  margin 0

h1
  font-size 0.72rem

span
div
p
  font-size 0.32rem
</style>

<style lang="stylus" scoped>
.row-wrapper
  width 100vw
  display flex
  flex-direction row

  &:first-child
    height calc(100vh - 0.8rem)
    border-bottom solid 0.01rem rgb(225,228,232)

  &:last-child
    height 0.8rem

  #side,#bar
    max-width 7.5rem
    flex-basis 3.2rem
    flex-shrink 0
    flex-grow 1
    height 100%
    background rgb(246,248,250)
    border-right solid 0.01rem rgb(225,228,232)

  #main,#status
    flex: 1
    height 100%
    background white

.inverted
  .row-wrapper
    &:first-child
      border-bottom solid 0.01rem rgb(27,31,35)
    
    #side,#bar
      background rgb(31,36,40)
      border-right solid 0.01rem rgb(27,31,35)

    #main,#status
      background rgb(36,41,46)
</style>

<style lang="stylus" scoped>
#bar
  &>*
    width 0.8rem
    height 0.8rem
    padding 0.2rem
    
    svg.icon
      width 100%
      height 100%

    &.change-theme
      float right
</style>

<style lang="stylus">
#bar
  .change-theme
    &:hover,&:active
      svg.icon
        path.outline
          fill blue

.inverted
  #bar
    .change-theme
      path
        fill rgb(225,228,232)

      &:hover,&:active
        svg.icon
          path.outline
            fill white
</style>