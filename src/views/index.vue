<template>
  <div>我的任务
    <div>
      <el-button type="primary" :plain="curret !=0" @click="click(0)">进行中任务</el-button>
      <el-button type="primary" :plain="curret !=1" @click="click(1)">待领取任务</el-button>
      <el-button type="primary" :plain="curret !=2" @click="click(2)">完善任务</el-button>
      <el-button type="primary" :plain="curret !=3" @click="click(3)">全部任务</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    
  },
  data() {
    return {
      curret: 0,
    }
  },
  methods: {
    click(index){
      this.curret = index;
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  // padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
