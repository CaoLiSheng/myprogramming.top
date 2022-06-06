export default {
  namespaced: true,
  state: {
    rootNode: {
      name: '根目录',
      folder: true,
      folders: [
        { name: '目录1', folder: true, folders: [], files: [ { name: '文件0', folder: false } ] },
      ],
      files: [
        { name: '文件1', folder: false },
        { name: '文件2', folder: false },
        { name: '文件3', folder: false },
      ],
    },
  },
  getters: {
    
  },
  mutations: {
    
  },
};
