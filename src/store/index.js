import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    laniste: "",
    ludis: [],
    deniers: null,
  },
  mutations: {
    setAccount(state, payload) {
      state.id = payload.id;
      state.laniste = payload.laniste;
      state.deniers = payload.deniers;
    },
    setLudis(state, ludis) {
      state.ludis = ludis;
    },
    addLudi(state, ludi) {
      state.ludis.push(ludi);
    },
  },
});
