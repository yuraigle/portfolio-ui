<template>
  <div ref="echart1" style="width: 800px; height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    data1: Array,
    data2: Array,
  },

  data: () => ({
    chartRef: undefined,
  }),

  mounted() {
    this.chartRef = echarts.init(this.$refs.echart1);
    this.fillWithData();
  },

  methods: {
    fillWithData() {
      const dateList = this.data1.map(function (item) {
        return item.date;
      });

      let valueList1;
      if (this.data1.length > 0) {
        const k1 = 1 / this.data1[0].close;
        valueList1 = this.data1.map(function (item) {
          return Number.parseFloat(item.close * k1).toPrecision(4);
        });
      }

      let valueList2;
      if (this.data2.length > 0) {
        const k2 = 1 / this.data2[0].close;
        valueList2 = this.data2.map(function (item) {
          return Number.parseFloat(item.close * k2).toPrecision(4);
        });
      }

      const option = {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400,
          },
        ],

        tooltip: {
          trigger: 'axis',
        },

        xAxis: [
          {
            data: dateList,
          },
        ],

        yAxis: [{}],

        series: [
          {
            name: 'SP500',
            type: 'line',
            showSymbol: false,
            data: valueList1,
          },
          {
            name: 'AAPL',
            type: 'line',
            showSymbol: false,
            data: valueList2,
          },
        ],
      };

      option && this.chartRef.setOption(option);
    },
  },

  watch: {
    data1() {
      this.fillWithData();
    },
    data2() {
      this.fillWithData();
    },
  },
};
</script>
