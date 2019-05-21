import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BuildSquad from './views/BuildSquad.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/build-squad',
      name: 'build squad',
      component: BuildSquad
    }
  ]
})
