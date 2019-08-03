import Vue from "vue";
import router from "./router";
import VueAnalytics from "vue-analytics";

Vue.use(VueAnalytics, {
  id: "UA-144995085-1",
  router
});
