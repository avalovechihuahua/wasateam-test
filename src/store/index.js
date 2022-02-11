import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    themeID: 0,
  },
  mutations: {
    setThemeID(state, payload) {
      state.themeID = payload;
    },
  },
  getters: {
    themeID: (state) => {
      return state.themeID;
    },
  },
});
