import { ADD_EDITING, ACTIVE_EDITING } from "../types";

export default {
  namespaced: true,
  state: {
    files: [],
    active: 0,
  },
  getters: {
    tabs: ({ files }) => {
      return files.map(({ title }) => title);
    }
  },
  mutations: {
    [ADD_EDITING](state, { file }) {
      state.files = [...state.files, file];
    },
    [ACTIVE_EDITING](state, { idx }) {
      state.active = idx;
    }
  },
};
