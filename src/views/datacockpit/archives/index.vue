<template>
  <div>
    <div class="card-list">
      <div class="card-item">
        <span class="name">应有档案室总数</span>
        <span class="number">{{ archivesRoomData.yydaNum }}</span>
      </div>
      <div class="card-item">
        <span class="name">现有档案室数量</span>
        <span class="number">{{ archivesRoomData.xydaNum }}</span>
      </div>
      <div class="card-item">
        <span class="name">数字化档案室数量</span>
        <span class="number">{{ archivesRoomData.szhdaNum }}</span>
      </div>
      <div class="card-item">
        <span class="name">规范化档案室数量</span>
        <span class="number">{{ archivesRoomData.gfhdaNum }}</span>
      </div>
    </div>
    <div class="chart-list">
      <!-- <div class="chart-wrapper">
        <div class="title">档案室达标数占比</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.db_num" :enum='bigData.db_num[2].key' file-type='isStandard' :chart-data="bigData.db_num"></PieCharts>
          </div>
        </div>
      </div> -->
      <div class="chart-wrapper">
        <div class="title">规范化档案室达标数</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.guifanhua_num" :enum='bigData.guifanhua_num[2].key' archivesRoom="GFH" file-type='isStandard' :chart-data="bigData.guifanhua_num"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">数字档案室达标数</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.shuzihua_num" :enum='bigData.shuzihua_num[2].key' archivesRoom="SZH" file-type='isStandard' :chart-data="bigData.shuzihua_num"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：大事记</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.dsj_num" :enum='bigData.dsj_num[2].key' file-type='bigEvent' :chart-data="bigData.dsj_num"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：年鉴</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.nj_num" :enum='bigData.nj_num[2].key' file-type='yearBook' :chart-data="bigData.nj_num"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：归档范围和保管期限表</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.gdfw_bgqx_num" :enum='bigData.gdfw_bgqx_num[2].key' file-type='scopePeriod' :chart-data="bigData.gdfw_bgqx_num"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：组织变革</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.zzyg_num" :enum='bigData.zzyg_num[2].key' file-type='administrativeHistory' :chart-data="bigData.zzyg_num"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：全宗介绍</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.qzjs_num" :enum='bigData.qzjs_num[2].key' file-type='qzIntroduce' :chart-data="bigData.qzjs_num"></PieCharts>
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="title">全宗建设情况：分类方案</div>
        <div class="content">
          <div style="height: 150px; width: 500px">
            <PieCharts v-if="bigData.flfa_num" :enum='bigData.flfa_num[2].key' file-type='schemeType' :chart-data="bigData.flfa_num"></PieCharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieCharts from "./pieCharts";
import { getArchives, getCount } from "@/api/datacockpit";
export default {
  components: { PieCharts },
  data() {
    return {
      // chartData: [
      //   {
      //     value: 30,
      //     name: "已建设",
      //     itemStyle: {
      //       color: "#6DD993",
      //     },
      //   },
      //   {
      //     value: 100,
      //     name: "未建设",
      //     itemStyle: {
      //       color: "#F95D60",
      //     },
      //   },
      // ],
      // 监管对象档案工作数据
      bigData: {},
      // 前四个档案室数量
      archivesRoomData: "",
    };
  },
  created() {
    this.getArchives();
    this.getCount();
  },
  methods: {
    // 获取前四个数据
    getCount(){
      getCount().then(({ data }) => {
        this.archivesRoomData = data;
       })
    },
    // 获取监管对象档案工作数据
    getArchives() {
      getArchives().then(({ data }) => {
        for (const key in data) {
          if (key !== "dwzs_num" && key !== "nrjg_num" && key !== "jcda_num") {
            this.$nextTick(() => {
              data[key].data.push({ key: data[key].key }) // 向数据项中添加key枚举
              this.$set(this.bigData, key, data[key].data); // 向bigData对象中添加key对应的数据项
            });
          }
          // else{
          //   if(key === 'dwzs_num'){
          //     this.$set(this.bigData, "dwzs_num", data[key]);
          //   }else if(key === 'nrjg_num'){
          //     this.$set(this.bigData, "nrjg_num", data[key]);
          //   }else if(key === 'jcda_num'){
          //     this.$set(this.bigData, "jcda_num", data[key]);
          //   }
          // }
        }
      });
    },
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
