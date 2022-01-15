<template>
  <div>
    <div>
      <router-link v-if="!getLoggedUser" :to="{ name: 'Login' }">Login</router-link>
      <router-link v-if="getLoggedUser" :to="{ name: 'Home' }">Home | </router-link>
      <router-link v-if="getLoggedUser" :to="{ name: 'Favorites' }">Favorites | </router-link>
      <a href="" @click="logoutUser()" v-if="getLoggedUser">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapMutations(["SET_LOGOUT"]),
    logoutUser() {
      this.SET_LOGOUT();
      this.$router.push({ name: "Login" });
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser"])
  }
}
</script>
