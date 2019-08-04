import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

const isProduction = process.env.NODE_ENV === "production";

Vue.use(VueAnalytics, {
  id: "UA-144995085-1",
  router,
  debug: {
    enabled: !isProduction,
    sendHitTask: isProduction
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
