import { TOGGLE_LL, TOGGLE_LR } from '../types';

export default {
  namespaced: true,
  state: {
    ll_open: false,
    lr_open: false,
  },
  mutations: {
    [TOGGLE_LL](state) {
      state.ll_open = !state.ll_open;
    },
    [TOGGLE_LR](state) {
      state.lr_open = !state.lr_open;
    },
  },
};