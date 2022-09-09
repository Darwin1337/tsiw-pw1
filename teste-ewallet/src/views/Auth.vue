<template>
  <div style="max-width: 600px" class="mx-auto mt-5">
    <h3 class="text-center">Autenticação</h3>
    <form @submit.prevent="iniciarSessao()">
      <div class="mt-4 mb-4 mx-auto" style="width: 255px">
        <input disabled type="password" class="form-control text-center" v-model="pin" style="font-size: 1.15em; font-weight: bold;">
      </div>
      <div class="btns d-flex flex-column">
        <div class="d-flex justify-content-center" style="gap: 15px">
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[0])">{{ baralharNumeros[0] }}</button>
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[1])">{{ baralharNumeros[1] }}</button>
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[2])">{{ baralharNumeros[2] }}</button>
        </div>
        <div class="d-flex justify-content-center" style="gap: 15px">
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[3])">{{ baralharNumeros[3] }}</button>
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[4])">{{ baralharNumeros[4] }}</button>
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[5])">{{ baralharNumeros[5] }}</button>
        </div>
        <div class="d-flex justify-content-center" style="gap: 15px">
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[6])">{{ baralharNumeros[6] }}</button>
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[7])">{{ baralharNumeros[7] }}</button>
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[8])">{{ baralharNumeros[8] }}</button>
        </div>
        <div class="d-flex justify-content-center" style="gap: 15px">
          <button type="button" class="btn btn-secondary" @click="pin = ''"><i class="fas fa-times"></i></button>
          <button type="button" class="btn btn-secondary" @click="escreverPin(baralharNumeros[9])">{{ baralharNumeros[9] }}</button>
          <button type="button" class="btn btn-secondary" @click="pin = pin.slice(0, -1)"><i class="fas fa-backspace"></i></button>
        </div>
      </div>
      <div class="w-100 text-center mt-3">
        <button type="submit" class="btn btn-primary">Iniciar sessão</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      pin: ""
    }
  },
  computed: {
    ...mapGetters(["getAllCards", "getLoggedUser"]),
    baralharNumeros() {
      let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = array.length - 1; i > 0; i--) {
          const J = Math.floor(Math.random() * (i + 1));
          [array[i], array[J]] = [array[J], array[i]];
      }
      return array;
    }
  },
  methods: {
    ...mapMutations(["SET_LOGGED_USER"]),
    iniciarSessao() {
      try {
        if (this.pin.length == 4) {
          this.SET_LOGGED_USER(this.pin);
          this.$vToastify.success("Sessão iniciada com sucesso!", "Sucesso!");
          this.$router.push({ name: "Home" });
        } else {
          this.$vToastify.error("O PIN terá de conter 4 dígitos!", "Erro!"); 
        }
      } catch(e) {
        this.$vToastify.error(String(e).substring(7), "Erro!"); 
        this.pin = "";
      }
    },
    escreverPin(num) {
      if (this.pin.length < 4) {
        this.pin += num;
      }
    }
  },
  mounted() {
    if (this.getLoggedUser != null) {
      this.$router.push({ name: 'Home' });
    }
    this.cards = this.getAllCards;
  }
};
</script>

<style scoped>
  .btns {
    gap: 15px;
  }

  .btns button {
    min-width: 75px;
    min-height: 75px;
    width: 75px;
    height: 75px;
    font-size: 1.15em;
    font-weight: bold;
  }
</style>
