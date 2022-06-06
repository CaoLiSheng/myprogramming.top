import Vue from 'vue';

import store from '@/store/index.js';
import App from '@/App.vue';

console.log('[i] Starting client app');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
