<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Error",
  created () {
    if (this.getLoggedUser != null) {
      this.$router.push({ name: 'Home' });
    } else {
      this.$router.push({ name: 'Login' });
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser"])
  }
}
</script>