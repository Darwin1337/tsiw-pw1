<template>
    <div>
        <div>
            <h3>Cartão n.º {{ card.id }}</h3>
            <div>
                <p>{{ card.holderName }}</p>
                <p>{{ card.number }}</p>
            </div>
        </div>
        <div>
            <button type="button" @click="$router.go(-1)">Voltar</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Card",
  data() {
    return {
      card: []
    }
  },
  computed: {
    ...mapGetters(["getCardInfoByID"])
  },
  mounted() {
    this.card = this.getCardInfoByID(this.$route.params.id);
  }
};
</script>