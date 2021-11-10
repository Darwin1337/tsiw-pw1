<template>
  <div>
    <h2>Peso: {{ weight }} kgs</h2>
  </div>
</template>

<script>
export default {
  name: "Ex3",
  // Alínea 6) - Alternativa à passagem da variável pelo App.vue
  // data() {
  //   return {
  //     weight: 55
  //   }
  // },
  props: {
    weight: {
      type: Number
    }
  },
  beforeCreate() {
    console.log("beforecreate");
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeupdate");
  },
  updated() {
    console.log("updated");
  }
};
</script>

<style>
</style>