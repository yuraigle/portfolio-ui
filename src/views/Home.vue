<template>
  <div>
    <h1>Portfolio Compare</h1>

    <div>
      <a
        v-for="k in ['1Y', '3Y', '5Y', '10Y']"
        :key="k"
        href="#"
        @click="setPeriod(k)"
        :style="{ fontWeight: period === k ? 'bold' : 'normal' }"
      >
        {{ k }}
      </a>
    </div>
    <MyChart :data1="data1" :data2="data2" />
  </div>
</template>

<script>
import MyChart from '../components/MyChart.vue';

export default {
  components: {
    MyChart,
  },

  data: () => ({
    portfolios: [
      { name: 'Portfolio #1', mix: { SP500: 100.0 } },
      { name: 'Portfolio #2', mix: { AAPL: 100.0 } },
    ],
    data: [],
    period: '3Y',
    data1: [],
    data2: [],
  }),

  methods: {
    updateChart() {
      this.$store
        .dispatch('chartGetPortfolio', {
          period: this.period,
          mix: this.portfolios[0].mix,
        })
        .then((data1) => {
          this.$store
            .dispatch('chartGetPortfolio', {
              period: this.period,
              mix: this.portfolios[1].mix,
            })
            .then((data2) => {
              this.data1 = data1;
              this.data2 = data2;
            });
        });
    },

    setPeriod(newVal) {
      this.period = newVal;
      this.updateChart();
    },
  },

  mounted() {
    this.updateChart();

    this.$store.dispatch('chartGetPortfolio', {
      period: this.period,
      mix: this.portfolios[0].mix,
    });
  },
};
</script>
