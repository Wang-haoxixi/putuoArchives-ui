<template>
  <div class="container">
    <div class="header">
      <span>普陀区档案归集智能监管服务平台数据大屏</span>
      <Time class="time"></Time>
    </div>
    <div class="list">
      <div class="item">
        <div class="title">监管对象档案工作</div>
        <el-scrollbar class="content" wrap-class="scrollbar-wrapper">
          <archives></archives>
        </el-scrollbar>
      </div>
      <div class="item">
        <div class="title">监管对象归集队伍建设情况</div>
        <el-scrollbar class="content" wrap-class="scrollbar-wrapper">
          <team></team>
        </el-scrollbar>
      </div>
      <div class="item">
        <div class="title">监管对象归集工作开展情况</div>
        <el-scrollbar class="content" wrap-class="scrollbar-wrapper">
          <work></work>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "@/views/components/Time/index"
import archives from "./archives/index"
import team from "./team/index"
import work from "./work/index"

export default {
  name: 'Index',
  components: {
    Time,
    archives,
    team,
    work
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 112px);
}
.header {
  flex: 30px 0 0;
  position: relative;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 22px;
  .time {
    position: absolute;
    right: 0;
    bottom: 0;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    color: #666;
    font-size: 14px;
  }
}
.list {
  margin-top: 20px;
  flex: 100px 1 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // grid-template-rows: 1fr;
  grid-column-gap: 20px;
  .item {
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .title {
      flex: 56px 0 0;
      height: 56px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      background-color: #59AAF5;
      font-size: 18px;
      color: #fff;
      &:before {
        content: "";
        display: block;
        height: 8px;
        width: 8px;
        margin-right: 8px;
        background-color: #fff;
      }
    }
    .content {
      flex: 100px 1 1;
    }
  }
}

::v-deep .scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
