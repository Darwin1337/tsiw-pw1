<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUser()">
        <div>
            <label for="username">Username:</label><br>
            <input id="username" type="text" v-model="user.username" required>
        </div>
        <br>
        <div>
            <label for="password">Password:</label><br>
            <input id="password" type="password" v-model="user.password" required>
        </div>
        <br>
        <div>
            <button type="submit">Login</button>
        </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapMutations(["SET_LOGGED_USER"]),
    loginUser() {
      if (this.isUser(this.user.username, this.user.password)) {
        this.SET_LOGGED_USER(this.user.username);
        this.$router.push({ name: "Home" });
      } else {
        alert("Os dados introduzidos não pertencem a nenhum utilizador, tente novamente!");
      }
    }
  },
  created () {
    if (this.getLoggedUser != null) {
      this.$router.push({ name: 'Home' });
    }
  },
  computed: {
    ...mapGetters(["isUser", "getLoggedUser"])
  }
}
</script>