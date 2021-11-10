<template>
  <div>
    <h2>First name: {{ firstName }}</h2>
    <h2>Last name: {{ lastName }}</h2>
    <h2>Age: {{ age }}</h2>
    <h2>Full name: {{ fullName() }}</h2>
  </div>
</template>

<script>
export default {
  name: "Ex2",
  data() {
    return {
      firstName: "Diogo",
      lastName: "Borges",
      age: 22
    };
  },
  methods: {
    fullName() {
      return this.firstName + " " + this.lastName;
    }
  }
};
</script>

<style>
</style>