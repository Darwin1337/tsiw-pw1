import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToastify from "vue-toastify";

Vue.use(VueToastify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
