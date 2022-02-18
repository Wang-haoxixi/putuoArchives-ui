<template>
  <v-chart :option="option" @click="handleClick"></v-chart>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    enum: {
      type: String,
      // required: true,
    },
    fileType: {
      type: String,
    }
  },
  created() {
    console.log(this.enum, this.fileType);
  },
  computed: {
    option() {
      const chartData = this.chartData;
      let xAxisData = [];
      for (let i = 0; i < chartData.length; i++) {
        xAxisData.push(chartData[i].name);
      }
      return {
        // color:['#6DD993', '#F95D60'],
        grid: {
          top: 8,
          left: 9,
          right: 9,
          bottom: 0,
          containLabel: true,
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
            },
          },
          axisLabel: {
            margin: 11,
            color: "#999999",
          },
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
            },
          },
          axisLabel: {
            show: false,
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
            padding: [0, 0, -24, 8],
          },
          max: function (value) {
            return value.max * 1.1;
          },
        },
        series: [
          {
            data: chartData,
            type: "bar",
            barWidth: "24",
            barCategoryGap: 21,
            barGap: 21,
            itemStyle: {
              normal: {
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ["#6DD993", "#F95D60", '#749f83', '#ca8622'];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
        tooltip: {
          show: true,
        },
      };
    },
  },
  methods: {
    handleClick(data) {
      // console.log(data, this.enum);
      console.log(this.enum, this.fileType);
      this.$router.push({
        path: "/datacockpit/collectionCan",
        query: {
          enums: this.enum,
          fileType: this.fileType,
        }
      });
    },
  }
};
</script>

<style lang="" scoped>
</style>
