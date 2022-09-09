<template>
  <div style="background-color: #f9f9f9; border-radius: 10px; padding: 15px;">
    <form @submit.prevent="adicionarCartao()">
      <div class="mb-2">
        <label for="card-holder" class="form-label">Nome do titular:</label>
        <input type="text" class="form-control" id="card-holder" v-model="card.holderName" required>
      </div>
      <div class="mb-2">
        <label for="card-number" class="form-label">Número do cartão:</label>
        <input type="text" class="form-control" id="card-number" v-model="card.number" maxlength="19" required>
      </div>
      <div class="mb-2">
        <div class="d-flex w-100" style="gap: 15px;">
          <div class="w-100">
            <label for="card-month" class="form-label">Mês:</label>
            <input type="text" class="form-control" id="card-month" v-model="card.expires.month" maxlength="2" required>
          </div>
          <div class="w-100">
            <label for="card-year" class="form-label">Ano:</label>
            <input type="text" class="form-control" id="card-year" v-model="card.expires.year" maxlength="4" required>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="card-vendor" class="form-label">Marca:</label>
        <select id="card-vendor" class="form-control" v-model="card.vendor" required>
          <option disabled value="0">Selecione uma opção</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="American Express">American Express</option>
        </select>
      </div>
      <div class="w-100 text-left">
        <button type="submit" class="btn btn-primary">Guardar cartão</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "CardForm",
  data() {
    return {
      card: {
        number: "",
        holderName: "",
        expires: {
          month: "",
          year: ""
        },
        vendor: 0
      }
    }
  },
  computed: {
    ...mapGetters(["getNewID"])
  },
  methods: {
    ...mapMutations(["SET_CARD"]),
    adicionarCartao() {
      try {
        if (this.card.vendor != 0) {
          this.$vToastify.prompt({
            body: "Adicionar este cartão?",
            answers: { Sim: true, Não: false }
          }).then(value => {
            if (value) {
              this.SET_CARD({
                id: this.getNewID,
                number: this.card.number,
                holderName: this.card.holderName,
                expires: {
                  month: this.card.expires.month,
                  year: this.card.expires.year
                },
                vendor: this.card.vendor,
              });
            }
          }).catch((e) => {
            this.$vToastify.error(String(e).substring(7), "Erro!");
          });
        } else {
          throw new Error("Selecione uma marca de cartão válida!");
        }
      } catch(e) {
        this.$vToastify.error(String(e).substring(7), "Erro!"); 
      }
    }
  },
  watch: {
    'card.number'() {
      this.card.number = this.card.number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    },
    'card.expires.month'() {
      this.card.expires.month = this.card.expires.month.replace(/[^\dA-Z]/g, '');
    },
    'card.expires.year'() {
      this.card.expires.year = this.card.expires.year.replace(/[^\dA-Z]/g, '');
    }
  }
};
</script>

<style scoped>
</style>
