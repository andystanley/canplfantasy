import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Squad from './views/Squad'
import Points from './views/Points'
import Rules from './views/Rules'
import League from './views/League'
import Leagues from './views/Leagues'
import store from './store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { protected: false }
    },
    {
      path: '/squad',
      name: 'squad',
      component: Squad,
      meta: { protected: true }
    },
    {
      path: '/points',
      name: 'points',
      component: Points,
      meta: { protected: true }
    },
    {
      path: '/view/points/:id',
      name: 'view points',
      component: Points,
      meta: { protected: true }
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules,
      meta: { protected: false }
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: Leagues,
      meta: { protected: true }
    },
    {
      path: '/league/:id',
      name: 'league',
      component: League,
      meta: { protected: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.protected)) {
    if (!store.getters.isAuthenticated) {
      next('/')
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
