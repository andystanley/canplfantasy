import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import store from "./store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.protected)) {
    if (!store.getters.isAuthenticated) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
