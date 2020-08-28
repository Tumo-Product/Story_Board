import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/editor',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "editor" */ '../editor/editor.vue')
  },
  {
    path: '/viewer',
    name: 'Viewer',
    component: () => import(/* webpackChunkName: "viewer" */ '../viewer/viewer.vue')
  },
  {
    path: '/examiner',
    name: 'Examiner',
    component: () => import(/* webpackChunkName: "examiner" */ '../examiner/examiner.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
