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
        props: true,
        path: 'all/:query',
        name: 'AllComponent',
        component: AllComponent,
      },
      // {
      //   props: true,
      //   path: 'canlendar/:year/:month/:day',
      //   name: 'CanlendarComponent',
      //   component: CanlendarComponent,
      // },
      {
        props: true,
        path: 'tags/:query',
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

export function clickOnTag(tag: string, router: Router) {
  const curR = router.currentRoute;
  const query = curR.params['query'];

  let newQuery = tag;
  if ('*' !== query) {
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
