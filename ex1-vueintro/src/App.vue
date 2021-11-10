<template>
  <div>
    <Ex1 />
    <hr>
    <Ex2 />
    <hr>
    <!-- https://vuejs.org/v2/guide/components-props.html#Passing-a-Number -->
    <Ex3 v-bind:weight="72" />
    <hr>
    <Ex4 />
  </div>
</template>

<script>
import Ex1 from "./components/Ex1.vue";
import Ex2 from "./components/Ex2.vue";
import Ex3 from "./components/Ex3.vue";
import Ex4 from "./components/Ex4.vue";

export default {
  name: "App",
  components: {
    Ex1,
    Ex2,
    Ex3,
    Ex4
  }
};
</script>

<style>
</style>
