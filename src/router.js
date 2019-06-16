import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Squad from './views/Squad'
import Points from './views/Points'
import Rules from './views/Rules'
import League from './views/League'
import Leagues from './views/Leagues'
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
      path: '/view/points/:id',
      name: 'view points',
      component: Points
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: Leagues,
    },
    {
      path: '/league/:id',
      name: 'league',
      component: League,
    }
  ]
})
