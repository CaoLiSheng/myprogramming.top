import '@tpl/v2/index';
// import '@audios/click';
import '@sprites/ring';
import '@www/utils/print';
import '@www/utils/vh100';

import initREM from '@www/utils/rem';
initREM();

import Vue from 'vue';
// import PortalVue from 'portal-vue';
import App from './app.vue';
import router from './router';

// Vue.use(PortalVue);

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
});
