import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: localStorage.users ? JSON.parse(localStorage.users) : 
    [ 
      { "id": 1, "username": "dinis", "password": "12345", "favorites": [] },
      { "id": 2, "username": "artur", "password": "12345", "favorites": [] },
      { "id": 3, "username": "rita", "password": "12345", "favorites": [] }
    ],
    loggedUser: localStorage.loggedUser ? JSON.parse(localStorage.loggedUser) : null,
    activities: localStorage.activities ? JSON.parse(localStorage.activities) : []
  },
  getters: {
    isUser: (state) => (username, password) => state.users.some((user) => user.username === username && user.password === password),
    getLoggedUser: (state) => state.loggedUser,
    getActivities: (state) => state.activities,
    getActivityFromKey: (state) => (key) => state.activities.find(activity => activity.key == key)
  },
  mutations: {
    SET_LOGGED_USER(state, payload) {
      state.loggedUser = state.users.find((user) => user.username === payload);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SET_LOGOUT(state) {
      state.loggedUser = null;
      localStorage.removeItem("loggedUser");
    },
    SET_ACTIVITY(state, payload) {
      // TO DO - SE HOUVER TEMPO
      // Verificar se a ativiadde já existe no array activities
      if (state.activities.every(activity => activity.key != payload.key)) {
        state.activities.push(payload);
        localStorage.activities = JSON.stringify(state.activities);
      } else {
        throw new Error("A atividade gerada já existe no sistema, tente novamente!");
      }
    },
    SET_ACTIVITY_TO_FAVORITES(state, payload) {
      state.users.map((user) => {
        if (user.username === state.loggedUser.username) {
          user.favorites.push(payload);
          localStorage.activities = JSON.stringify(state.activities);
        }
      });
      // Atualizar também o objeto do utilizador logado no state bem como o da localstorage
      state.loggedUser = state.users.find((user) => user.username === state.loggedUser.username);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);

      // Atualizar o array de utilizadores na localstorage
      localStorage.users = JSON.stringify(state.users);
    },
    REMOVE_ACTIVITY_FROM_FAVORITES(state, payload) {
      state.users.map((user) => {
        if (user.username === state.loggedUser.username) {
          user.favorites = user.favorites.filter(fav => fav != payload);
          localStorage.activities = JSON.stringify(state.activities);
        }
      });
      // Atualizar também o objeto do utilizador logado no state bem como o da localstorage
      state.loggedUser = state.users.find((user) => user.username === state.loggedUser.username);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);

      // Atualizar o array de utilizadores na localstorage
      localStorage.users = JSON.stringify(state.users);
    }
  },
  actions: {
    async loadActivity(context) {
      const response = await fetch("https://www.boredapi.com/api/activity");
      if (response.ok) {
        context.commit("SET_ACTIVITY", await response.json());
      } else {
        throw new Error(response.status);
      }
    }
  }
});
