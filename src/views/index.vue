<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div style="background-color: #ffffff; border-radius: 4px">
          <div>我的任务</div>
          <div>
            <el-button type="primary" :plain="curret != 0" @click="click(0)"
              >进行中任务</el-button
            >
            <el-button type="primary" :plain="curret != 1" @click="click(1)"
              >待领取任务</el-button
            >
            <el-button type="primary" :plain="curret != 2" @click="click(2)"
              >完善任务</el-button
            >
            <el-button type="primary" :plain="curret != 3" @click="click(3)"
              >全部任务</el-button
            >
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="序号"> </el-table-column>
            <el-table-column prop="name" label="任务/清单名称">
            </el-table-column>
            <el-table-column prop="address" label="任务类型"> </el-table-column>
            <el-table-column prop="address" label="任务状态"> </el-table-column>
            <el-table-column prop="address" label="截止日期"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="background-color: #ffffff; border-radius: 4px">
          通知消息
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
      curret: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "清单任务",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "清单任务",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "清单任务",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    click(index) {
      this.curret = index;
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
  },
};
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

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
