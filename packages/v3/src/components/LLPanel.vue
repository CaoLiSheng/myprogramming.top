<template lang="pug">
.panel
  .panel-content
    FileNode(:node='rootNode' :depth='0')
  .panel-header
    .panel-btn.new-file(deta-title='新建文件' deta-title-pos='bottom-right')
    .panel-btn.new-folder(deta-title='新建目录' deta-title-pos='bottom-right')
    .panel-btn.move(deta-title='移动' deta-title-pos='bottom-right')
    .panel-btn.delete(deta-title='删除(Del)' deta-title-pos='bottom-right')
    .blank-btn
    .panel-btn.close(deta-title='关闭文件面板' deta-title-pos='bottom-left' @click='toggleLL()')
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { TOGGLE_LL } from '@/store/types.js';
import FileNode from './FileNode.vue';

export default {
  components: {
    FileNode,
  },
  computed: {
    ...mapState('explorer', [ 'rootNode' ]),
  },
  methods: {
    ...mapMutations('layout', { toggleLL: TOGGLE_LL }),
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixins.scss';
@import '@/scss/variables.scss';

.panel {
  position: relative;
  overflow: auto;

  .panel-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    height: 60px;
    padding: 0 20px;
    background-color: $bgColor2;
    
    @include flex-center;

    .panel-btn {
      flex-grow: 0;

      @include linearGradientBtn(20px, 20px, 180deg);

      & + .panel-btn {
        margin-left: 20px;
      }
    }

    .blank-btn {
      flex-grow: 1;
    }
  }

  .panel-content {
    margin-top: 60px;
  }
}
</style>
