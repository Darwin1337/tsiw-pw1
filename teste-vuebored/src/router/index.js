import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Favorites from "../views/Favorites.vue";
import Error from "../views/Error.vue";

import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
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
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    name: "Error",
    component: Error
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getLoggedUser) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
