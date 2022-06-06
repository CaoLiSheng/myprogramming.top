<template lang="pug">
.panel
  .panel-content
    .panel-entry
      .panel-entry-icon
        img(:src='dbIcon')
      .panel-entry-desc
        h3 配置数据库
        h4 配置GitHub、工作目录...
    .panel-entry
      .panel-entry-icon
        img(:src='editIcon')
      .panel-entry-desc
        h3 配置当前文章
        h4 配置标题、Tags、日期...
  .panel-header
    h3 设置
    .panel-close-btn(deta-title='关闭设置面板' deta-title-pos='bottom-right' @click='toggleLR()')
</template>

<script>
import { mapMutations } from 'vuex';
import { TOGGLE_LR } from '@/store/types.js';

import dbIcon from '@/assets/db.png';
import editIcon from '@/assets/edit.png';

export default {
  data() {
    return {
      dbIcon,
      editIcon,
    };
  },
  methods: {
    ...mapMutations('layout', { toggleLR: TOGGLE_LR }),
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
    background-color: $bgColor2;
    
    @include flex-center;

    h3 {
      @include uiText;
    }

    .panel-close-btn {
      @include linearGradientBtn(20px, 20px, 180deg);

      position: absolute;
      top: 20px;
      left: 20px;
    }
  }

  .panel-content {
    margin-top: 60px;

    .panel-entry {
      @include flex-center;

      width: 100%;
      height: 100px;
      padding: 0 20px;
      border-bottom: solid 1px $solidColor;
      cursor: pointer;

      @include hoverable {
        background-color: $hoverColor;
      }

      &:active {
        background-color: $solidColor;
      }

      .panel-entry-icon {
        flex-grow: 0;

        @include linearGradientBtn(60px, 60px, 180deg);
        @include flex-center;

        img {
          width: 50px;
          height: 50px;
        }
      }

      .panel-entry-desc {
        flex-grow: 1;
        margin-left: 20px;

        h3, h4 {
          @include uiText;
          @include ellipsisText;
        }

        h4 {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
