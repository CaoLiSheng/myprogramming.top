import Vue from 'vue';
import Router from 'vue-router';

const IndexComponent = () =>
  import(/* webpackChunkName: 'IndexComponent' */ '@vWidgets/index.vue');

const AllComponent = () =>
  import(/* webpackChunkName: 'AllComponent' */ '@vWidgets/explorer/all.vue');

const CanlendarComponent = () =>
  import(
    /* webpackChunkName: 'CanlendarComponent' */ '@vWidgets/explorer/canlendar.vue'
  );

const TagsComponent = () =>
  import(/* webpackChunkName: 'TagsComponent' */ '@vWidgets/explorer/tags.vue');

const routes = [
  {
    path: '/',
    name: 'IndexComponent',
    component: IndexComponent,
    children: [
      {
        props: true,
        path: 'all/:query/p/:page',
        name: 'AllComponent',
        component: AllComponent,
      },
      {
        props: true,
        path: 'canlendar/:year/:month/:day/p/:page',
        name: 'CanlendarComponent',
        component: CanlendarComponent,
      },
      {
        props: true,
        path: 'tags/:query/p/:page',
        name: 'TagsComponent',
        component: TagsComponent,
      },
    ],
  },
];

Vue.use(Router);

export default new Router({
  routes,
});
