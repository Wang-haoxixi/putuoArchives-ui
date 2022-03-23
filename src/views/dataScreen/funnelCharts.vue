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
    enum: {
      type: String,
      // required: true,
    },
    fileType: {
      type: String,
    },
  },
  created() {},
  methods: {
    // handleClick(data) {
    //   this.$router.push({
    //     path: "/datacockpit/detail",
    //     query: {
    //       enums: this.enum,
    //       fileType: this.fileType,
    //     },
    //   });
    // },
  },
  computed: {
    option() {
      return {
        color: ["#3EE6E3", "#3BBCD9", "#378BCC", "#345EBF"],
        avoidLabelOverlap: false,
        // legend: {
        //   padding: 0,
        //   type: "plain",
        //   icon: "rect",
        //   temGap: 4,
        //   itemWidth: 9,
        //   itemHeight: 9,
        //   borderRadius: 0,
        //   borderWidth: 0,
        //   selectedMode: true,
        //   orient: "vertical",
        //   bottom: 10,
        //   left: 22,
        //   textStyle: {
        //     color: "#99CBF9",
        //     fontSize: 12,
        //   },
        // },
        tooltip: {
          trigger: "item",
          formatter(params) {
              return params.data.name +"："+ params.data.num
          },
        },
        series: [
          {
            startAngle: 180,
            type: "funnel",
            left: 0,
            sort: "ascending",
            itemStyle: {
              borderColor: "#0b1667",
            },
            label: {
              show: true,
              color: "#FFFFFF",
              formatter: "{b}",
            },
            labelLine: {
              show: true,
              length: 20,
              length2: 70,
              lineStyle: {
                color: "#DDDDDD",
              },
              minTurnAngle: "60",
              maxSurfaceAngle: "60",
            },
            data: this.chartData,
          },
        ],
      };
    },
  },
};
</script>

<style lang="" scoped>
</style>
