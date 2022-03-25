<template>
  <basic-container style="background-color: #0b1667">
    <el-row :gutter="20" type="flex" style="flex: 1.3">
      <el-col :span="10" style="height: 100%"
        ><div class="content">
          <data-screen-title title="档案室情况"></data-screen-title>
          <div style="height: calc(100% - 44px); width: 80%; margin-left: 10%">
            <FunnelCharts
              enum="COCKPIT_DATA_DBQK"
              file-type="isStandard"
              :chart-data="[
                { value: 25, name: '规范化档案数量', num: deptTeam.gfhdaNum },
                { value: 50, name: '数字化档案室', num: deptTeam.szhdaNum },
                { value: 75, name: '现有档案数量', num: deptTeam.xydaNum },
                { value: 100, name: '应有档案总数', num: deptTeam.yydaNum },
              ]"
            ></FunnelCharts>
            <!-- <div style="position: relative;height:100%;width:100%">
              <div class="pyramid-num" style="top: -5%; right: 13%">
                {{ deptTeam.gfhdaNum }}
              </div>
              <div class="pyramid-num" style="top: 8%; left: 10%">
                {{ deptTeam.szhdaNum }}
              </div>
              <div class="pyramid-num" style="top: 30%; right: 5%">
                {{ deptTeam.xydaNum }}
              </div>
              <div class="pyramid-num" style="top: 52%; left: 5%">
                {{ deptTeam.yydaNum }}
              </div>
            </div> -->
          </div>
          <!-- <div style="width:25%;height:25%;transform: rotate3d(1, 0, 1, -10deg);background:red"></div> -->
        </div>
      </el-col>
      <el-col :span="14" style="height: 100%"
        ><div class="content">
          <data-screen-title title="队伍建设"></data-screen-title>
          <div class="team">
            <div
              class="team-item"
              v-for="(item, index) in roleTeam"
              :key="index"
            >
              <div class="item-title">
                <div class="item-title-text"></div>
                {{ item.title }}
              </div>
              <div class="item-charts">
                <PieCharts
                  enum="COCKPIT_DATA_DBQK"
                  file-type="isStandard"
                  :chart-data="item.value"
                ></PieCharts>
              </div>
            </div>
            <!-- <div class="team-item">
              <div class="item-title">
                <div class="item-title-text"></div>
                归集员配置情况
              </div>
              <div class="item-charts">
                <PieCharts
                  enum="COCKPIT_DATA_DBQK"
                  file-type="isStandard"
                  :chart-data="[
                    { name: '已配置单位', value: 18 },
                    { name: '未配置单位', value: 16 },
                  ]"
                ></PieCharts>
              </div>
            </div>
            <div class="team-item">
              <div class="item-title">
                <div class="item-title-text"></div>
                科室归集负责人配置情况
              </div>
              <div class="item-charts">
                <PieCharts
                  enum="COCKPIT_DATA_DBQK"
                  file-type="isStandard"
                  :chart-data="[
                    { name: '已配置单位', value: 18 },
                    { name: '未配置单位', value: 16 },
                  ]"
                ></PieCharts>
              </div>
            </div>
            <div class="team-item">
              <div class="item-title">
                <div class="item-title-text"></div>
                分管领导配置情况
              </div>
              <div class="item-charts">
                <PieCharts
                  enum="COCKPIT_DATA_DBQK"
                  file-type="isStandard"
                  :chart-data="[
                    { name: '已配置单位', value: 18 },
                    { name: '未配置单位', value: 16 },
                  ]"
                ></PieCharts>
              </div>
            </div> -->
          </div>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20" style="padding-top: 20px; flex: 1">
      <el-col :span="10" style="height: 100%"
        ><div class="content">
          <data-screen-title title="归集任务完成情况"></data-screen-title>
          <div style="height: calc(100% - 44px); display: flex">
            <div
              style="
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <div style="position: relative">
                <img
                  src="@/assets/images/quanquwenjian_bj@2x.png"
                  style="width: 90%; margin-left: 5%; margin-top: -5%"
                />
                <span
                  @click="handleClick"
                  style="
                    font-size: 29px;
                    position: absolute;
                    line-height: 34px;
                    font-weight: bold;
                    color: #fff;
                    top: 43%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    cursor: pointer;
                  "
                  >{{ taskNum.qnwjNum }}</span
                >

                <div
                  style="
                    position: absolute;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    color: #99cbf9;
                    width: 140px;
                    bottom: -20px;
                    left: 50%;
                    transform: translate(-50%, 0);
                  "
                >
                  全区当年度应有文件数
                </div>
              </div>
            </div>
            <div style="flex: 1.6; height: calc(100% - 44px)">
              <div class="filed">
                <div class="filed-item" @click="handleClick">
                  <div class="filed-item-num">{{ taskNum.yggdNum }}</div>
                  <div class="filed-item-title">应归档数量</div>
                </div>
                <div class="filed-item" @click="handleClick">
                  <div class="filed-item-num">{{ taskNum.yjgdNum }}</div>
                  <div class="filed-item-title">已归档数量</div>
                </div>
                <div class="filed-item" @click="handleClick">
                  <div class="filed-item-num">{{ taskNum.wgdNum }}</div>
                  <div class="filed-item-title">未归档数量</div>
                </div>
                <div class="filed-item" @click="handleClick">
                  <div class="filed-item-num">{{ taskNum.dqdgdNum }}</div>
                  <div class="filed-item-title">待确定数量</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8" style="height: 100%"
        ><div class="content">
          <data-screen-title title="任务完成情况"></data-screen-title>
          <div style="height: calc(100% - 44px); width: 100%">
            <PieCharts
              enum="COCKPIT_DATA_DBQK"
              file-type="isStandard"
              rose
              :chart-data="taskMsg"
            ></PieCharts>
          </div></div
      ></el-col>
      <el-col :span="6" style="height: 100%"
        ><div class="content">
          <data-screen-title title="OA在线归档情况"> </data-screen-title>
          <div style="height: calc(100% - 44px)">
            <div class="filed">
              <div class="filed-item" @click="handleClick">
                <div class="filed-item-num">{{ oaMsg.yingguidang }}</div>
                <div class="filed-item-title">应归档数量</div>
              </div>
              <div class="filed-item" @click="handleClick">
                <div class="filed-item-num">{{ oaMsg.yiguidang }}</div>
                <div class="filed-item-title">已归档数量</div>
              </div>
              <div class="filed-item" @click="handleClick">
                <div class="filed-item-num">{{ oaMsg.weiguidang }}</div>
                <div class="filed-item-title">未归档数量</div>
              </div>
              <div class="filed-item" @click="handleClick">
                <div class="filed-item-num">{{ oaMsg.daiqueding }}</div>
                <div class="filed-item-title">待确定数量</div>
              </div>
            </div>
          </div>
        </div></el-col
      >
    </el-row>
  </basic-container>
</template>

<script >
import DataScreenTitle from "./DataScreenTitle";
import FunnelCharts from "./funnelCharts";
import PieCharts from "./pieCharts";
import {
  getDeptTeam,
  getRoleTeam,
  getCollectionTask,
  getTaskMsg,
  getOaMsg,
} from "@/api/dataScreen";
export default {
  components: { DataScreenTitle, PieCharts, FunnelCharts },
  data() {
    return {
      deptTeam: { yydaNum: 0, gfhdaNum: 0, xydaNum: 0, szhdaNum: 0 },
      roleTeam: [
        {
          title: "档案员配置情况",
          type: "day",
          value: [
            { name: "未配置单位", value: 0 },
            { name: "已配置单位", value: 0 },
          ],
        },
        {
          title: "归集员配置情况",
          type: "gjy",
          value: [
            { name: "未配置单位", value: 0 },
            { name: "已配置单位", value: 0 },
          ],
        },
        {
          title: "科室归集负责人配置情况",
          type: "ksgj",
          value: [
            { name: "未配置单位", value: 0 },
            { name: "已配置单位", value: 0 },
          ],
        },
        {
          title: "分管领导配置情况",
          type: "fgld",
          value: [
            { name: "未配置单位", value: 0 },
            { name: "已配置单位", value: 0 },
          ],
        },
      ],
      taskNum: { dqdgdNum: 0, qnwjNum: 0, wgdNum: 0, yggdNum: 0, yjgdNum: 0 },
      taskMsg: [
        { name: "任务总数", value: 0 },
        { name: "未开始", value: 0 },
        { name: "进行中", value: 0 },
        { name: "已完成", value: 0 },
      ],
      oaMsg: { yingguidang: 0, yiguidang: 0, weiguidang: 0, daiqueding: 0 },
    };
  },
  mounted() {},
  methods: {
    handleClick(){
      this.$router.push({
        path: "/dataScreen/taskGroup", // 任务归集完成情况详情页
      });
    }
  },
  created() {
    getDeptTeam().then((res) => {
      if (res.code === 200) {
        this.deptTeam = res.data;
      }
    });
    getRoleTeam().then((res) => {
      this.roleTeam = res.data;
    });
    getCollectionTask().then((res) => {
      this.taskNum = res.data;
    });
    getTaskMsg().then((res) => {
      this.taskMsg = res.data;
    });
    getOaMsg().then((res) => {
      this.oaMsg = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.basic-container {
  background-color: #0b1667;
  height: calc(100vh - 144px);
  display: flex;
  flex-direction: column;
}
.content {
  height: 100%;
  border: 1px solid rgba(0, 74, 193, 0.9882352941176471);
  color: white;
  box-shadow: 0 0 31px #037de673 inset;
  background-image: url("../../assets/images/icon_dataScreen_1.png"),
    url("../../assets/images/icon_dataScreen_2.png"),
    url("../../assets/images/icon_dataScreen_3.png"),
    url("../../assets/images/icon_dataScreen_4.png");
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-position: top left, top right, bottom left, bottom right;
  background-color: linear-gradient(
    359deg,
    rgba(0, 100, 186, 0.25) 0%,
    rgba(3, 125, 230, 0.06) 100%
  );
  .title {
    // margin: 0 44px;
    text-align: center;
    font-weight: 500;
    line-height: 25px;
    color: #3ce7fd;
    .title-container {
      justify-content: center;
      display: flex;
      align-items: flex-end;
      .title-border {
        width: 80px;
        height: 23px;
      }
      .title-bg {
        margin: 0 8px;
        width: 26px;
        height: 9px;
      }
    }
  }
  .title-bottom {
    height: 1px;
    background: linear-gradient(270deg, #0071e2 0%, #ffffff 50%, #0071e2 100%);
  }
  .team {
    display: flex;
    height: calc(100% - 44px);
    padding: 20px;
    .team-item {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      &:not(:last-child) {
        border-right: 1px dotted #0c52d6;
      }
      .item-title {
        padding-left: 10px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 20px;
        color: #ffffff;
        display: flex;
        align-items: center;
        .item-title-text {
          height: 5px;
          width: 5px;
          border-radius: 50%;
          background-color: #1492ff;
          margin-right: 7px;
        }
      }
      .item-charts {
        flex: 1;
      }
    }
  }
  .filed {
    padding: 35px;
    flex: 1;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    .filed-item {
      padding: 8px 0 10px;
      border: 1px solid #209fef73;
      border-radius: 4px;
      box-shadow: 0 3px 6px #34c1ff4d inset;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .filed-item-num {
      font-size: 29px;
      font-family: DIN Alternate;
      font-weight: bold;
      line-height: 32px;
      color: #ffffff;
    }
    .filed-item-title {
      font-weight: 400;
      line-height: 25px;
      color: #99cbf9;
      padding-top: 6px;
    }
  }
  .pyramid-num {
    position: absolute;
    font-size: 29px;
    font-weight: bold;
    line-height: 34px;
    color: #ffffff;
  }
}
</style>
