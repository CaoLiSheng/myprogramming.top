<template lang="pug">
  .layout
    .layout-top
      h1 又心の博客
      .layout-btn-left(deta-title='弹出文件面板' deta-title-pos='right' @click='toggleLL()')
      .layout-btn-right(deta-title='弹出设置面板' deta-title-pos='left' @click='toggleLR()')
    .layout-center
      .layout-editor(ref='editor')
      .layout-tabs
        h3(v-for='tab, idx in tabs' :key='tab + idx' :class='{active: idx === activeTab}' @click='setActive({ idx })') {{ tab }}
        h3.blank(:style='{ width: blankTabWidth + "px" }')
    .layout-left(:class='{ open: llOpen }')
      LLPanel
    .layout-right(:class='{ open: lrOpen }')
      LRPanel
</template>

<script lang='ts'>
import Vue from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { ADD_EDITING, ACTIVE_EDITING, TOGGLE_LL, TOGGLE_LR } from './store/types.js';
import LLPanel from '@/components/LLPanel.vue';
import LRPanel from '@/components/LRPanel.vue';

import test, { parseHTML } from './services/editView';
import MutationObs from './services/mutationObs';

export default Vue.extend({
  name: 'App',
  components: {
    LLPanel,
    LRPanel,
  },
  computed: {
    ...mapState('layout', { llOpen: 'll_open', lrOpen: 'lr_open' }),
    ...mapState('editing', { activeTab: 'active' }),
    ...mapGetters('editing', [ 'tabs' ]),
  },
  data() {
    return {
      blankTabWidth: 1200,
    };
  },
  methods: {
    calcBlankTabWidth() {
      let result = 1200;
      let tabs = document.querySelectorAll('.layout-tabs>h3:not(.blank)');
      tabs.forEach(tab => { result -= (tab as HTMLElement).offsetWidth; });
      console.log('[i] ' + result);
      this.blankTabWidth = result > 0 ? result : 0;
    },
    ...mapMutations('editing', {
      addFile: ADD_EDITING,
      setActive: ACTIVE_EDITING,
    }),
    ...mapMutations('layout', {
      toggleLL: TOGGLE_LL,
      toggleLR: TOGGLE_LR,
    }),
  },
  mounted() {
    for (let i = 0; i < 20; i++) {
      this.addFile({ file: { title: '文件' + i } });
    }

    setTimeout(this.calcBlankTabWidth.bind(this), 0);

    // const h1Elem = new EditElement();
    // h1Elem.setCreater(() => document.createElement('h1'));

    // const h1TextElem = new EditElement();
    // h1TextElem.setCreater(() => document.createTextNode('文章标题'));

    // h1Elem.append(h1TextElem);

    // const pElem = new EditElement();
    // pElem.setCreater(() => document.createElement('p'));

    // const pText1Elem = new EditElement();
    // pText1Elem.setCreater(() => document.createTextNode('这是一段'));

    // const bElem = new EditElement();
    // bElem.setCreater(() => {
    //   const result = document.createElement('b');
    //   result.style.color = 'red';
    //   return result;
    // });

    // const bTextElem = new EditElement();
    // bTextElem.setCreater(() => document.createTextNode('重点'));

    // bElem.append(bTextElem);

    // const pText2Elem = new EditElement();
    // pText2Elem.setCreater(() => document.createTextNode('内容。'));

    // pElem.append(pText1Elem);
    // pElem.append(pText2Elem);
    // pElem.append(bElem, 1);

    // const rootElem = new EditElement();
    // rootElem.append(h1Elem);
    // rootElem.append(pElem);


    if (this.$refs.editor instanceof HTMLElement) {
      const rootElm = test(parseHTML('<h1>文章标题</h1><p>这是一段<i>重点</i>内容。</p>'));
      
      if (rootElm instanceof HTMLElement) {
        rootElm.setAttribute('contenteditable', 'true');
        const obs = new MutationObs();
        obs.observe(rootElm);
      }

      this.$refs.editor.appendChild(rootElm);
    }
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

  .layout-top {
    @include flex-center;

    width: 100%;
    height: 60px;
    background-color: $bgColor2;
    position: relative;

    h1 {
      @include uiText;
    }

    .layout-btn-left, .layout-btn-right {
      position: absolute;
      top: 20px;
    }

    .layout-btn-left {
      @include linearGradientBtn(20px, 20px, 90deg);
      left: 20px;
    }

    .layout-btn-right {
      @include linearGradientBtn(20px, 20px, -90deg);
      right: 20px;
    }
  }

  .layout-center {
    width: 1200px;
    height: calc(100vh - 80px);
    margin: 20px auto 0;
    position: relative;

    .layout-editor {
      height: calc(100% - 40px);
      background-color: $bgColor;
      border: solid 1px $activeColor;
      border-bottom: none;
      border-top: none;

      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }

    .layout-tabs {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;

      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;

      @include overflow(auto, hidden);

      h3 {
        @include flex-center;
        @include ellipsisText;
        @include uiText;
        
        max-width: 200px;
        width: auto;
        height: 40px;
        padding: 0 20px;

        background-color: $bgColor;
        border-top: solid 1px $solidColor;
        border-bottom: solid 1px $activeColor;
        
        &:not(.active) + h3:not(.active), &:first-child {
          border-left: solid 1px $solidColor;
        }

        &.active {
          border: solid 1px $activeColor;
          border-bottom: none;  
        }

        &.blank {
          max-width: 1200px;
          background: none;
          border: none;
          border-bottom: solid 1px $activeColor;
          pointer-events: none;
        }
      }
    }
  }

  .layout-left, .layout-right {
    width: 500px;
    height: 100vh;
    background-color: $bgColor;

    @include overflow(hidden, auto);
    @include defaultTransition;

    position: absolute;
    top: 0;

    &.open {
      transform: translate(0, 0);
      visibility: visible;
    }
  }

  .layout-left {
    left: 0;
    border-right: solid 1px $activeColor;
    transform: translate(-500px, 0);
    visibility: hidden;
  }

  .layout-right {
    right: 0;
    border-left: solid 1px $activeColor;
    transform: translate(500px, 0);
    visibility: hidden;
  }
}
</style>
