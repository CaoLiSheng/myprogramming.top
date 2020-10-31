import '@tpl/v2/index';
import '@audios/click';
import '@www/utils/messages';
import '@www/utils/favicon';
import '@www/utils/rem';

import Vue from 'vue';
import App from './app.vue';
import router from './router';

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
});
