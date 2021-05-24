import '@utils/design';
import '@plugins/sprites/ring';
import '@plugins/knock';
import '@plugins/hotkeys';
import '@plugins/print';
import '@plugins/history';

import Vue from 'vue';
import PortalVue from 'portal-vue';

import App from './app.vue';
import router from './router';

Vue.use ( PortalVue );

new Vue ( {
  el    : '#app',
  render: ( h ) => h ( App ),
  router,
} );
