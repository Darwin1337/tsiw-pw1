<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand">E-Wallet</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!this.getLoggedUser">
              <router-link class="nav-link" to="/">Auth</router-link>
            </li>
            <li class="nav-item" v-if="this.getLoggedUser">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li class="nav-item" v-if="this.getLoggedUser">
              <a class="nav-link" href="#" @click="terminarSessao()" v-if="getLoggedUser">Terminar sessão</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapMutations(["SET_LOGOUT"]),
    terminarSessao() {
      this.$vToastify.prompt({
        body: "Tem a certeza que quer terminar a sessão?",
        answers: { Sim: true, Não: false }
      }).then(value => {
        if (value) {
          this.SET_LOGOUT();
          this.$router.push({ name: "Auth" });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser"])
  }
}
</script>
