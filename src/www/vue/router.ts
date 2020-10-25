import Vue from 'vue'
import Router from 'vue-router'

const IndexComponent = () =>
  import(/* webpackChunkName: 'IndexComponent' */ '@vWidgets/index.vue')

const routes = [
  {
    path: '/',
    name: 'IndexComponent',
    component: IndexComponent,
    children: [],
  },
]

Vue.use(Router)

export default new Router({
  routes,
})
