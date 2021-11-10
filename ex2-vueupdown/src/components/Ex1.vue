<template>
  <div>
    <div>
      <span>{{ num }}</span>
    </div>
    <div>
      <button @click="num++">+</button>
      <button @click="num--" :disabled="num == 0">-</button>
    </div>
    <h2 v-if="num < 0">Número inválido</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: localStorage.num ? JSON.parse(localStorage.num) : 0
    }
  }, watch: {
    num() {
      // if (this.num < 0) { this.num = 0; }
      localStorage.setItem("num", JSON.stringify(this.num));
    }
  }, created () {
    console.log("A instância Vue foi criada");
  }, mounted () {
    console.log("A instância Vue foi montada");
  }, updated () {
    console.log("O número foi alterado");
  }
}
</script>

<style>

</style>