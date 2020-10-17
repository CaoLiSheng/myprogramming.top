import Vue from 'vue';
import Router from 'vue-router';
import SwitchComponent from './components/switch.vue';

const HelloComponent = () =>
  import(/* webpackChunkName: 'HelloComponent' */ './components/hello.vue');

const VersionComponent = () =>
  import(/* webpackChunkName: 'VersionComponent' */ './components/version.vue');

const routes = [
  {
    path: '/',
    name: 'HelloComponent',
    component: HelloComponent,
    props: { msg: 'typeScirpt_webpack_vue !' },
  },
  {
    path: '/name',
    name: 'HiUserComponent',
    component: HelloComponent,
    props: { msg: 'user !' },
  },
  {
    path: '/switch',
    name: 'SwitchComponent',
    component: SwitchComponent,
    children: [
      {
        path: 'v1',
        name: 'V1Component',
        component: VersionComponent,
        props: { version: 'v1.0' },
      },
      {
        path: 'v2',
        name: 'V2Component',
        component: VersionComponent,
        props: { version: 'v2.0' },
      },
    ],
  },
];

Vue.use(Router);

export default new Router({
  routes,
});
