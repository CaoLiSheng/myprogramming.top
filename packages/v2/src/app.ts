import 'commons/src/www/utils/design';
import 'commons/src/www/plugins/sprites/ring';
import 'commons/src/www/plugins/knock';
import 'commons/src/www/plugins/hotkeys';
import 'commons/src/www/plugins/print';
import 'commons/src/www/plugins/history';

import PortalVue from 'portal-vue';
import Vue from 'vue';

import App from './app.vue';
import router from './router';

Vue.use ( PortalVue );

new Vue ( {
  el    : '#app',
  render: ( h ) => h ( App ),
  router,
} );
