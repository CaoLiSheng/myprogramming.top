import Vue from 'vue';
import Vuex from 'vuex';

import layout from './modules/layout';
import editing from './modules/editing';
import explorer from './modules/explorer';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    editing,
    explorer,
  }
});

export default store;
