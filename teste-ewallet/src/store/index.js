import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: localStorage.cards ? JSON.parse(localStorage.cards) : [{"id":0,"number":"4151 6500 2345 4563","holderName":"Diogo Borges","expires":{"month":"06","year":"2023"},"vendor":"Visa"},{"id":1,"number":"5154 3435 2368 7693","holderName":"Diogo Borges","expires":{"month":"11","year":"2025"},"vendor":"MasterCard"},{"id":2,"number":"5634 0432 4327 8734","holderName":"Diogo Borges","expires":{"month":"01","year":"2023"},"vendor":"American Express"},{"id":3,"number":"4151 5454 3123 5665","holderName":"Diogo Borges","expires":{"month":"07","year":"2022"},"vendor":"Visa"}],
    loggedUser: localStorage.loggedUser ? localStorage.loggedUser : null,
    pin: 1298,
    vendors: [{"nome":"Visa","imagem":"https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"},{"nome":"MasterCard","imagem":"https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"},{"nome":"American Express","imagem":"https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"}]
  },
  getters: {
    getLoggedUser: (state) => state.loggedUser,
    getNewID: (state) => state.cards.length > 0 ? Math.max.apply(null, state.cards.map(card => card.id)) + 1 : 0,
    getAllCards: (state) => state.cards,
    getCardInfoByID: (state) => (id) => state.cards.find(card => card.id == id),
    getVendorByName: (state) => (nome) => state.vendors.find(vendor => vendor.nome == nome)
  },
  mutations: {
    SET_CARD(state, payload) {
      if (state.cards.every(card => card.number != payload.number)) {
        state.cards.push(payload);
        localStorage.cards = JSON.stringify(state.cards);
      } else {
        throw new Error("O cartão já existe!");
      }
    },
    SET_LOGGED_USER(state, payload) {
      if (payload == state.pin) {
        state.loggedUser = true;
        localStorage.loggedUser = true;
      } else {
        throw new Error("O PIN introduzido está incorreto!")
      }
    },
    SET_LOGOUT(state) {
      state.loggedUser = null;
      localStorage.removeItem("loggedUser");
    },
    REMOVE_CARD(state, payload) {
      state.cards = state.cards.filter(card => card.id != payload);
      localStorage.cards = JSON.stringify(state.cards);
    }
  },
  actions: {},
  modules: {},
});
