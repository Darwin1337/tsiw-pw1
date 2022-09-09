<template>
  <div class="container mt-5">
    <div class="row gy-3">
      <div class="col-lg-6">
        <h3>Adicionar cartão</h3>
        <hr>
        <CardForm />
      </div>
      <div class="col-lg-6">
        <h3>Todos os cartões</h3>
        <hr>
        <div class="all-cards">
          <div class="d-flex w-100 card-wrapper mb-3" style="gap: 25px;" v-for="(card, idx) in cards" :key="idx">
            <div @click="$router.push({ name: 'Card', params: { id: card.id} })" class="card-design" :class="card.vendor == 'Visa' ? 'visa' : (card.vendor == 'MasterCard' ? 'mastercard' : 'american-express')">
              <p><strong>{{ card.holderName }}</strong></p>
              <p style="letter-spacing: 0.2em;">•••• •••• •••• {{ card.number.slice(card.number.length - 4) }}</p>
              <p class="m-0">{{ card.expires.month }}/{{ card.expires.year }}</p>
              <img :src="getVendorByName(card.vendor).imagem" alt="Vendor logo">
            </div>
            <div class="d-flex flex-column justify-content-center" style="gap: 10px;">
              <button class="btn btn-danger" @click="removerCartao(card.id)">Remover</button>
              <button class="btn btn-primary" @click="$router.push({ name: 'Card', params: { id: card.id} })">Detalhes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardForm from "@/components/CardForm.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    CardForm,
  },
  data() {
    return {
      cards: []
    }
  },
  methods: {
    ...mapMutations(["REMOVE_CARD"]),
    removerCartao(id) {
      this.$vToastify.prompt({
        body: "Tem a certeza que quer remover este cartão?",
        answers: { Sim: true, Não: false }
      }).then(value => {
        if (value) {
          this.REMOVE_CARD(id);
          this.cards = this.getAllCards;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["getAllCards", "getVendorByName"])
  },
  mounted() {
    this.cards = this.getAllCards;
  },
};
</script>

<style scoped>
  .all-cards {
    min-height: 550px;
    height: 550px;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .card-design {
    min-width: 150px;
    max-width: 400px;
    width: 100%;
    cursor: pointer;
    box-shadow: rgba(46, 33, 107, 0.16) 0px 1px 4px;
    padding: 20px;
    position: relative;
    border-radius: 10px;
    color: white;
  }

  .mastercard {
    background: #F2994A;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #F2C94C, #F2994A);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #F2C94C, #F2994A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .visa {
    background: #00d2ff;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #928DAB, #00d2ff);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #928DAB, #00d2ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .american-express {
    background: #667db6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .card-design img {
    width: 35px;
    min-width: 35px;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  @media (max-width: 490px) {
    .card-wrapper {
      flex-direction: column;
      gap: 10px !important;
    }
  }
</style>
