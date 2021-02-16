import Vue from 'vue';
import Router from 'vue-router';

const IndexComponent = () =>
  import(/* webpackChunkName: 'IndexComponent' */ '@vWidgets/index.vue');

const AllComponent = () =>
  import(/* webpackChunkName: 'AllComponent' */ '@vWidgets/explorers/all.vue');

// const CanlendarComponent = () =>
//   import(
//     /* webpackChunkName: 'CanlendarComponent' */ '@vWidgets/explorers/canlendar.vue'
//   );

const TagsComponent = () =>
  import(
    /* webpackChunkName: 'TagsComponent' */ '@vWidgets/explorers/tags.vue'
  );

const StatusComponent = () =>
  import(/* webpackChunkName: 'StatusComponent' */ '@vWidgets/status.vue');

const routes = [
  {
    path: '/',
    component: IndexComponent,
    children: [
      {
        path: '',
        redirect: { name: 'AllComponent', params: { query: '*' } },
      },
      {
        path: 'all/:query',
        name: 'AllComponent',
        components: {
          default: AllComponent,
          status: StatusComponent,
        },
        props: { default: true, status: false },
      },
      // {
      //   props: true,
      //   path: 'canlendar/:year/:month/:day',
      //   name: 'CanlendarComponent',
      //   component: CanlendarComponent,
      // },
      {
        path: 'tags/:query',
        name: 'TagsComponent',
        components: {
          default: TagsComponent,
          status: StatusComponent,
        },
        props: { default: true, status: true },
      },
    ],
  },
];

Vue.use(Router);

export default new Router({
  routes,
});

export function clickOnTag(tag: string, router: Router) {
  const curR = router.currentRoute;
  const query = curR.params['query'];

  let newQuery = tag;
  if ('*' !== query && 'TagsComponent' === curR.name) {
    const tags = query.split(',').map((t: string) => t.trim());
    const idx = tags.indexOf(tag);
    if (idx >= 0) {
      if (tags.length === 1) {
        newQuery = '*';
      } else {
        newQuery = [...tags.slice(0, idx), ...tags.slice(idx + 1)].join(',');
      }
    } else {
      newQuery = [...tags, tag].join(',');
    }
  }

  router.replace({
    name: 'TagsComponent',
    params: { query: newQuery },
  });
}
