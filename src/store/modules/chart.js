import axios from 'axios';

export default {
  state: () => ({
    loading: false,
  }),

  mutations: {
    setChartLoading(state, s) {
      state.loading = s;
    },
  },

  actions: {
    chartGetData({ commit }, payload) {
      commit('setChartLoading', true);

      const { symbol, period } = payload;

      return new Promise((resolve) => {
        axios
          .get(`${this.getters.apiBase}/chart-data/${symbol}/${period}`)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => commit('setChartLoading', false));
      });
    },

    chartGetPortfolio({ commit }, payload) {
      commit('setChartLoading', true);

      const { mix, period } = payload;
      let mixStr = '';
      Object.keys(mix).forEach((k) => (mixStr += k + ':' + mix[k] + ','));
      mixStr = mixStr.replace(/,$/, '');
      const mixEnc = Buffer.from(mixStr).toString('base64');

      return new Promise((resolve) => {
        axios
          .get(`${this.getters.apiBase}/chart-portfolio/${period}/${mixEnc}`)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => commit('setChartLoading', false));
      });
    },
  },
};
