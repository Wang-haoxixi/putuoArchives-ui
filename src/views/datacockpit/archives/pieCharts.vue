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
    // 档案室类型
    archivesRoom: {
      type: String,
    }
  },
  created() {
  },
  methods: {
    handleClick(data) {
      this.$router.push({
        path: "/datacockpit/detail",
        query: {
          enums: this.enum,
          fileType: this.fileType,
          archivesRoom: this.archivesRoom,
        }
      });
    },
  },
  computed: {
    option() {
      return {
        color: ["#6DD993", "#F95D60", '#749f83', '#ca8622'],
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
          right: 10,
          textStyle: {
            color: "#999999",
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
            radius: ["26", "52"],
            label: {
              formatter: function (param) {
                return `{a|${param.name}}{b|${Math.round(param.percent)}%}`;
              },
              rich: {
                a: {
                  color: "#999999",
                },
                b: {
                  color: "#6DD993",
                },
              },
              fontSize: "12",
              color: "red",
              padding: [0, -70, 20, -70],
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
