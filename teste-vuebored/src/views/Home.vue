<template>
  <div>
    <h1>Home</h1>
    <p>Sessão iniciada como: {{ getLoggedUser.username }}</p>
    <h3>Atividades:</h3>
    <div v-if="getActivities.length > 0">
      <div v-for="(atividade, index) in getActivities" :key="index">
        <CardActivity :activity=atividade />
      </div>
    </div>
    <div v-else>
      <p>Não foram geradas nenhumas atividades.</p>
    </div>
    <button @click="generateActivity()">Gerar atividade</button>
  </div>
</template>

<script>
import CardActivity from "@/components/CardActivity.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    CardActivity
  },
  computed: {
    ...mapGetters(["getLoggedUser", "getActivities"])
  }, methods: {
    ...mapActions(["loadActivity"]),
    generateActivity() {
      this.loadActivity().catch((err) =>
        alert(`Problem handling something: ${err}.`)
      );
    }
  }
};
</script>
