<template>
  <div>
      <div>
        <button @click="showMsg()">um</button>
        <button @click="showCustomMsg(msg, $event)">dois</button>
      </div>
      <div v-on:click="showMessage">
          <!-- <button v-on:click="showMessage">CLICA-ME</button>
          <button v-on:click.stop="showMessage">CLICA-ME</button>
          <button v-on:click.once="showMessage">CLICA-ME</button> -->
          <button @keyup.tab="showMessage">CLICA-ME</button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "Programação Web I"
        }
    }, methods: {
        showMsg() {
            alert(this.msg);
        },
        showCustomMsg(msg, event) {
            alert(msg);
            console.log(event.target);
            console.log(event.type);
        }
    }, computed: {
        showMessage() {
            console.log("hey");
            return "";
        }
    }
}
</script>

<style>
</style>