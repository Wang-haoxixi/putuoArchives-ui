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
    }
  },
  methods:{
    handleClick(data){
      console.log(data,this.enum)
      this.$router.push({ path: "/datacockpit/detail" });
    }
  },
  computed: {
    option () {
      return {
        color:['#6DD993', '#F95D60'],
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
          orient: 'vertical',
          bottom: 10,
          right: 10,
          textStyle: {
            color: "#999999",
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            startAngle: 180,
            type: "pie",
            left: 0,
            radius: "52",
            label: {
              formatter: function(param) {
                console.log(param)
                return [
                    `{a|${param.name}}{b|${Math.round(param.percent)}%}`,
                    `{c|${param.value}家}`,
                  ].join("\n");
              },
              rich: {
                a: {
                  color: "#999999"
                },
                b: {
                  color: "#6DD993"
                },
                c: {
                  padding: [6, 0, 0, 0],
                  color: "#999999",
                  align: "left"
                }
              },
              fontSize: "12",
              color: "red",
              padding: [0, -80, 3, -80]
            },
            labelLine: {
              show: true,
              length: 6,
              length2: 80,
              lineStyle: {
                color: "#DDDDDD"
              },
              minTurnAngle: "60",
              maxSurfaceAngle: "60"
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            },
            data: this.chartData,
          },
        ],
      }
    }
  }
}
</script>

<style lang="" scoped>
</style>
