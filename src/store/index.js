import Vue from 'vue';
import Vuex from 'vuex';

import chart from './modules/chart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {
    apiBase: () =>
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/api'
        : 'http://api.prod.com:8080/api',
  },
  mutations: {},
  actions: {},
  modules: { chart },
});
