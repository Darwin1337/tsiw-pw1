import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Card from "../views/Card.vue";
import Auth from "../views/Auth.vue";

import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/card/:id",
    name: "Card",
    component: Card,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getLoggedUser) {
    next({ name: "Auth" });
  } else {
    next();
  }
});

export default router;
