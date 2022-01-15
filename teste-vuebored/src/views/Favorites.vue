<template>
  <div>
    <h1>Favorites</h1>
    <h3>As suas atividades favoritas:</h3>
    <div v-if="getLoggedUser.favorites.length > 0">
      <div v-for="(activity, index) in getLoggedUser.favorites" :key="index">
        <hr>
        <p>Nome: {{ getActivityFromKey(activity).activity }}</p>
        <p>Tipo: {{ getActivityFromKey(activity).type }}</p>
        <button @click="removeFromFavorites(getActivityFromKey(activity).key)">Remover dos favoritos</button>
        <hr>
      </div>
    </div>
    <div v-else>
      <p>Não adicionou nenhuma atividade aos favoritos.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Favorites",
  computed: {
    ...mapGetters(["getLoggedUser", "getActivityFromKey"])
  },
  methods: {
    ...mapMutations(["SET_ACTIVITY_TO_FAVORITES", "REMOVE_ACTIVITY_FROM_FAVORITES"]),
    removeFromFavorites(key) {
      this.REMOVE_ACTIVITY_FROM_FAVORITES(key);
    }
  }
}
</script>