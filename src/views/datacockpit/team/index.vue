<template>
  <div>
    <div class="data-wrapper">
      <div class="title">队伍人员登记情况</div>
      <div class="content">
        <div style="height: 150px; width: 600px">
          <PieCharts v-if="bigData.is_dispose" :enum='teamData.is_dispose.key' file-type='isDispose' :chart-data="bigData.is_dispose"></PieCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title">队伍开展工作情况</div>
        <div class="btn-list">
          <el-button style="font-size: 14px" type="text" @click="prePage"
            >上一页</el-button
          >
          <el-button style="font-size: 14px" type="text" @click="nextPage"
            >下一页</el-button
          >
        </div>
      </div>
      <div class="content">
        <el-table :data="launchTableData">
          <el-table-column label="序号" width="60" prop="orderNum"></el-table-column>
          <el-table-column label="全宗号" width="100" prop="qzh"></el-table-column>
          <el-table-column label="单位名称" width="100" prop="unitName"></el-table-column>
          <el-table-column label="有无档案室" width="100" prop="isArchives"></el-table-column>
          <el-table-column label="有无队伍" width="100" prop="isArmy"></el-table-column>
          <el-table-column label="有无开展工作" width="110" prop="isWork"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #59aaf5; border-color: #59aaf5"
            >业务学习</span
          >
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts v-if="bigData.yw_study" :enum='teamData.yw_study.key' file-type='ywStudy' :chart-data="bigData.yw_study"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #f1924e; border-color: #f1924e"
            >工作年限</span
          >
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts v-if="bigData.work_year" :enum='teamData.work_year.key' file-type='workYear' :chart-data="bigData.work_year"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #6dd993; border-color: #6dd993"
            >学历</span
          >
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts v-if="bigData.education" :enum='teamData.education.key' file-type='education' :chart-data="bigData.education"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #fc5c5c; border-color: #fc5c5c"
            >职称</span
          >
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts v-if="bigData.post" :enum='teamData.post.key' file-type='post' :chart-data="bigData.post"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #59aaf5; border-color: #59aaf5"
            >培训情况</span
          >
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts v-if="bigData.training" :enum='teamData.training.key' file-type='training' :chart-data="bigData.training"></BarCharts>
        </div>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="title-btn">
        <div class="title mini">
          <span>归集人员能力：</span>
          <span class="tag" style="color: #f1924e; border-color: #f1924e"
            >奖惩荣誉</span
          >
        </div>
      </div>
      <div class="content">
        <div style="height: 130px; width: 600px">
          <BarCharts v-if="bigData.reward_punish" :enum='teamData.reward_punish.key' file-type='rewardPunish' :chart-data="bigData.reward_punish"></BarCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeam, getLaunch } from "@/api/datacockpit";
import PieCharts from "./pieCharts";
import BarCharts from "./barCharts";
export default {
  components: { PieCharts, BarCharts },
  data() {
    return {
      // chartData: [
      //   {
      //     value: 30,
      //     name: "配备齐全",
      //     itemStyle: {
      //       color: "#6DD993",
      //     },
      //   },
      //   {
      //     value: 100,
      //     name: "配备不齐",
      //     itemStyle: {
      //       color: "#F95D60",
      //     },
      //   },
      // ],
      // chartDataBar: [
      //   {
      //     value: 20,
      //     name: "完成",
      //     itemStyle: {
      //       color: "#6DD993",
      //     },
      //   },

      //   {
      //     value: 50,
      //     name: "未完成",
      //     itemStyle: {
      //       color: "#FC5C5C",
      //     },
      //   },
      // ],
      // 图表数据
      bigData: {},
      // team数据
      teamData: {},
      // 开展情况列表参数
      paramsLaunch: {
        current: 1,
        size: 5,
      },
      // 开展情况表格数据
      launchTableData: [],
      // 总页数
      pages: undefined,
    };
  },
  created() {
    this.getTeam();
    this.getLaunch();
  },
  methods: {
    // 上一页
    prePage() {
      if(this.paramsLaunch.current > 1){
        this.paramsLaunch.current -= 1
        this.getLaunch()
      }
    },
    // 下一页
    nextPage() {
      if(this.paramsLaunch.current < this.pages){
        this.paramsLaunch.current += 1
        this.getLaunch()
      }
    },
    // 获取监管对象归集队伍建设情况数据
    getTeam() {
      getTeam().then(({ data }) => {
        this.teamData = data
        for (const key in data) {
          this.$set(this.bigData, key, data[key].data);
          // data[key].data.push({ key: data[key].key });
        }
      });
    },
    /** 监管对象归集队伍建设情况--队伍开展情况表 **/
    getLaunch(){
      getLaunch(this.paramsLaunch).then(({data})=>{
        this.launchTableData = data.records
        this.pages = data.pages
        this.paramsLaunch.current = data.current
      })
    }
  },
};
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
