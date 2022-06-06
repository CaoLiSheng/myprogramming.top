<template lang="pug">
  .layout
    .layout-content
      .layout-content-left
      .layout-content-right
    .layout-header
      .layout-logo
      .layout-nav
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {
    
  },
  computed: {

  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
})
</script>

<style lang="scss">
@import '@/scss/normalize.scss';
@import '@/scss/deta-title.scss';
</style>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
@import '@/scss/mixins.scss';

.layout {
  position: relative;

  .layout-content {
    @include flex-center;

    height: 66.6vh;
    background-color: #eee;

    .layout-content-left {
      width: 33.4vw;
    }

    .layout-content-right {
      width: 66.6vw;
    }
  }

  .layout-header {
    @include flex-center;

    height: 33.4vh;
    background-color: rgb(10, 126, 64);

    .layout-logo {
      width: 33.4vw;
    }

    .layout-nav {
      width: 66.6vw;
    }
  }
}
</style>
