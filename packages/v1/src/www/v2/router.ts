import Vue from 'vue';
import Router from 'vue-router';

const PostComponent = () => import ( /* webpackChunkName: 'PostComponent' */ '@vWidgets/post.vue' );

const StatusComponent = () => import ( /* webpackChunkName: 'StatusComponent' */ '@vWidgets/status.vue' );

const IndexComponent = () => import ( /* webpackChunkName: 'IndexComponent' */ '@vWidgets/index.vue' );

const ListComponent = () => import ( /* webpackChunkName: 'ListComponent' */ '@vWidgets/explorers/list.vue' );

const TagsComponent = () => import ( /* webpackChunkName: 'TagsComponent' */ '@vWidgets/explorers/tags.vue' );

const routes = [
  {
    path    : '',
    redirect: {
      name  : 'ListComponent',
      params: { query: '*', post: '=' },
    },
  },
  {
    path     : '/:post/',
    name     : 'IndexComponent',
    component: IndexComponent,
    children : [
      {
        path      : 'list/:query',
        name      : 'ListComponent',
        components: {
          default: ListComponent,
          status : StatusComponent,
          post   : PostComponent,
        },
        props: { default: true, status: false, post: true },
      },
      {
        path      : 'tags/:query',
        name      : 'TagsComponent',
        components: {
          default: TagsComponent,
          status : StatusComponent,
          post   : PostComponent,
        },
        props: { default: true, status: true, post: true },
      },
    ],
  },
];

Vue.use ( Router );

export default new Router ( {
  routes,
} );

export function clickOnTag ( tag: string, router: Router ): void {
  const curR = router.currentRoute;
  const { query, post } = curR.params;

  let newQuery = tag;
  if ( query !== '*' && curR.name === 'TagsComponent' ) {
    const tags = query.split ( ',' ).map ( ( t: string ) => t.trim () );
    const idx = tags.indexOf ( tag );
    if ( idx >= 0 ) {
      newQuery = tags.length === 1 ? '*' : [ ...tags.slice ( 0, idx ), ...tags.slice ( idx + 1 ) ].join ( ',' );
    } else {
      newQuery = [ ...tags, tag ].join ( ',' );
    }
  }

  void router.replace ( {
    name  : 'TagsComponent',
    params: { query: newQuery, post },
  } );
}

export function clickOnLink ( name: string, router: Router ): void {
  const { name: curRName, params: { query, post } } = router.currentRoute;
  
  if ( !curRName || post === name ) return;

  void router.replace ( {
    name  : curRName,
    params: { query, post: name }
  } );
}
