<template>
  <v-chart :option="option"></v-chart>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    option() {
      const chartData = this.chartData
      let xAxisData = []
      for (let i = 0; i < chartData.length; i++) {
        xAxisData.push(chartData[i].name)
      }
      return {
        grid: {
          top: 8,
          left: 9,
          right: 9,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#DDDDDD",
            }
          },
          axisLabel: {
            margin: 11,
            color: "#999999"
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            symbol: ["none", "arrow"],
            symbolSize: [7, 10],
            lineStyle: {
              color: "#DDDDDD",
            }
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false,
          },
          name: "人数",
          nameGap: 0,
          nameTextStyle: {
            align: "left",
            lineHeight: 18,
            fontSize: 12,
            color: "#999999",
            padding: [0, 0, -24, 8]
          },
          max: function (value) {
            return value.max * 1.1
          }
        },
        series: [
          {
            data: chartData,
            type: "bar",
            barWidth: "24",
            barCategoryGap: 21,
            barGap: 21
          },
        ],
        tooltip: {
          show: true,
        },
      };
    },
  },
};
</script>

<style lang="" scoped>
</style>
