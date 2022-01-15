<template>
  <div>
    <hr>
    <p>Nome: {{ activity.activity }}</p>
    <p>Tipo: {{ activity.type }}</p>
    <div style="display: flex; gap: 15px;">
      <button :disabled="getLoggedUser.favorites.some(fav => fav == activity.key)" @click="addToFavorites()">Adicionar aos favoritos</button>
      <button :disabled="!getLoggedUser.favorites.some(fav => fav == activity.key)" @click="removeFromFavorites()">Remover dos favoritos</button>
    </div>
    <hr>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CardActivity",
  props: {
    activity: Object
  },
  methods: {
    ...mapMutations(["SET_ACTIVITY_TO_FAVORITES", "REMOVE_ACTIVITY_FROM_FAVORITES"]),
    addToFavorites() {
      this.SET_ACTIVITY_TO_FAVORITES(this.activity.key);
    },
    removeFromFavorites() {
      this.REMOVE_ACTIVITY_FROM_FAVORITES(this.activity.key);
    }
  },
  computed: {
    ...mapGetters(["getLoggedUser"])
  }
};
</script>