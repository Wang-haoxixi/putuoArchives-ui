<template>
  <div>
    <div class="card-list">
      <div class="card-item">
        <span class="name">区属单位总数</span>
        <span class="number">887</span>
      </div>
      <div class="card-item">
        <span class="name">纳入监管单位总数</span>
        <span class="number">23345</span>
      </div>
      <div class="card-item">
        <span class="name">建成档案室总数</span>
        <span class="number">887</span>
      </div>
    </div>
    <div class="chart-list">
      <div class="chart-wrapper">
        <div class="title">档案室达标数占比</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts :chart-data="chartData"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：大事记</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts :chart-data="chartData"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：年鉴</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts :chart-data="chartData"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：归档范围和保管期限表</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts :chart-data="chartData"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：组织变革</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts :chart-data="chartData"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：全宗介绍</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts :chart-data="chartData"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：分类方案</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts :chart-data="chartData"></PieCharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieCharts from "./pieCharts";
export default {
  components: { PieCharts },
  data() {
    return {
      chartData: [
        {
          value: 30,
          name: "已建设",
          itemStyle: {
            color: "#6DD993",
          },
        },
        {
          value: 100,
          name: "未建设",
          itemStyle: {
            color: "#F95D60",
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  .card-item {
    display: flex;
    padding: 0 30px;
    height: 58px;
    border: 1px solid #ddd;
    align-items: center;
    &:not(:first-child) {
      margin-top: 32px;
    }
    .name {
      flex: 100px 1 1;
      font-size: 14px;
    }
    .number {
      padding-left: 10px;
      flex: 100px 1 1;
      font-size: 32px;
      font-weight: bold;
    }
  }
}

.chart-wrapper {
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
  }
  .content {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
