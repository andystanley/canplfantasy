import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Squad from './views/Squad'
import Points from './views/Points'
import Help from './views/Help'
import League from './views/League'
import PlayerAvailability from './views/PlayerAvailability'
import Leagues from './views/Leagues'
import store from './store'
import Forwards from './views/articles/Forwards'
import Midfielders from './views/articles/Midfielders'
Vue.use(Router)

const router = new Router({
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
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: Leagues
    },
    {
      path: '/league/:id',
      name: 'league',
      component: League
    },
    {
      path: '/articles/forwards',
      name: 'forwards',
      component: Forwards
    },
    {
      path: '/articles/midfielders',
      name: 'midfielders',
      component: Midfielders
    },
    {
      path: '/player-availability',
      name: 'player availability',
      component: PlayerAvailability
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
