<template>
  <div>
    <div class="data-wrapper">
      <div class="title">档案归集各门类总数</div>
      <div class="content">
        <div style="height: 150px; width: 600px">
          <PieCharts :chart-data="chartData"></PieCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title">队伍开展工作情况</div>
        <div class="btn-list">
          <el-button style="font-size: 14px" type="text" @click="prePage">上一页</el-button>
          <el-button style="font-size: 14px" type="text" @click="nextPage">下一页</el-button>
        </div>
      </div>
      <div class="content">
        <el-table>
          <el-table-column label="序号" width="60"></el-table-column>
          <el-table-column label="全宗号" width="100"></el-table-column>
          <el-table-column label="单位名称" width="100"></el-table-column>
          <el-table-column label="有无档案室" width="100"></el-table-column>
          <el-table-column label="有无队伍" width="100"></el-table-column>
          <el-table-column label="有无开展工作" width="110"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #59AAF5;border-color: #59AAF5">业务学习</span>
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts :chart-data="chartDataBar"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #F1924E;border-color: #F1924E">工作年限</span>
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts :chart-data="chartDataBar"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #6DD993;border-color: #6DD993">学历</span>
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts :chart-data="chartDataBar"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #FC5C5C;border-color: #FC5C5C">职称</span>
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts :chart-data="chartDataBar"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #59AAF5;border-color: #59AAF5">培训情况</span>
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts :chart-data="chartDataBar"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #F1924E;border-color: #F1924E">奖惩荣誉</span>
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts :chart-data="chartDataBar"></BarCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieCharts from "./pieCharts";
import BarCharts from "./barCharts";
export default {
  components: { PieCharts, BarCharts },
  data () {
    return {
      chartData: [
        {
          value: 30,
          name: "配备齐全",
          itemStyle: {
            color: "#6DD993",
          },
        },
        {
          value: 100,
          name: "配备不齐",
          itemStyle: {
            color: "#F95D60",
          },
        },
      ],
      chartDataBar: [
        {
          value: 20,
          name: "完成",
          itemStyle: {
            color: "#6DD993"
          }
        },

        {
          value: 50,
          name: "未完成",
          itemStyle: {
            color: "#FC5C5C"
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.data-wrapper {
  padding: 16px 20px;
  &:not(:first-child) {
    border-top: 1px solid #ddd;
  }
  .title {
    height: 22px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    &:before {
      display: block;
      content: "";
      margin-right: 8px;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      background-color: #1492ff;
    }
    &.mini {
      font-size: 14px;
    }
    .tag {
      border: 1px solid red;
      border-radius: 2px;
      padding: 0 2px;
    }
  }
  .content {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.title-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
