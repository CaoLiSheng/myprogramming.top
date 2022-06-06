<template lang="pug">
.node(:class='[ nodeCls ]')
  h4(:style='{ paddingLeft }' @click='toggle()') {{ node.name }}
  .children(v-if='node.folder' :class='[ hiddenCls ]')
    FileNode(v-for='folder in node.folders' :key='folder.name' :node='folder' :depth='depth + 1')
    FileNode(v-for='file in node.files' :key='file.name' :node='file' :depth='depth + 1')
</template>

<script>
export default {
  name: 'FileNode',
  props: ['node', 'depth'],
  computed: {
    paddingLeft() {
      return `${this.depth * 15}px`;
    },
    nodeCls() {
      return this.node.folder ? 'folder' : 'file';
    },
  },
  data() {
    return {
      hiddenCls: 'hidden',
    };
  },
  methods: {
    toggle() {
      if (this.node.folder) {
        this.hiddenCls = this.hiddenCls === '' ? 'hidden' : '';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixins.scss';
@import '@/scss/variables.scss';

.node {
  h4 {
    @include uiText;
    
    line-height: 2em;
    border-bottom: solid 1px $solidColor;

    @include hoverable {
      background-color: $hoverColor;
    }

    &:active {
      background-color: $solidColor;
    }

    &:before {
      content: '';
      
      vertical-align: top;
      display: inline-block;
      height: 17px;
      width: 22px;
      margin-top: 0.5em;
      background-size: 17px 17px;
      background-repeat: no-repeat;
    }
  }

  &.folder>h4:before {
    background-image: url('~@/assets/folder.png');
  }

  &.file>h4:before {
    background-image: url('~@/assets/file.png');
  }

  .children {
    transition: transform .3s;
    transform-origin: 50% 0;
    transform: scaleY(1);
    height: auto;

    &.hidden {
      transition: unset;
      transform: scaleY(0);
      height: 0;
    }
  }
}
</style>
