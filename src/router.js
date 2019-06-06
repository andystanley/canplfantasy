import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Squad from './views/Squad'
import Points from './views/Points'
import Rules from './views/Rules'
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
      path: '/squad',
      name: 'squad',
      component: Squad
    },
    {
      path: '/points',
      name: 'points',
      component: Points
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules
    }
  ]
})
