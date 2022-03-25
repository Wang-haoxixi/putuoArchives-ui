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
    },
    rose: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.rose) {
      this.option.series[0].roseType = "area";
      this.option.series[0].radius = ["15%", "80%"];
      this.option.series[0].label = {
        show: true,
        color: "#FFFFFF",
        formatter: "{c}",
      };
      this.option.series[0].labelLine = { length: 20 };
    } else {
      this.option.series[0].label = {
        show: true,
        color: "#FFFFFF",
        position: "inner",
        formatter: "{c}",
      };
    }
  },
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
    handleClick(data){
      console.log(222, data);
      this.$router.push({
        path: "/dataScreen/teamCreate", // 队伍建设详情页
      });
    }
  },
  computed: {
    option() {
      return {
        color: ["#28EDED", "#2395FC", "#FEC02C", "#ca8622"],
        avoidLabelOverlap: false,
        legend: {
          padding: 0,
          type: "plain",
          icon: "rect",
          temGap: 4,
          itemWidth: 9,
          itemHeight: 9,
          borderRadius: 0,
          borderWidth: 0,
          selectedMode: true,
          orient: "vertical",
          bottom: 10,
          left: 22,
          textStyle: {
            color: "#99CBF9",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            startAngle: 180,
            type: "pie",
            left: 0,
            radius: ["35%", "70%"],
            itemStyle: {
              borderRadius: 5,
              borderWidth: 5,
              borderColor: "#0b1667",
            },
            labelLine: {
              show: true,
              length: 6,
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
