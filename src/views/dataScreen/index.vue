<template>
  <basic-container>
    <el-row :gutter="20" type="flex" style="flex: 1.3">
      <el-col :span="10" style="height: 100%"
        ><div class="content">
          <data-screen-title title="档案室情况"></data-screen-title>
          <div
            style="
              height: calc(100% - 44px);
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <div style="text-align: center; position: relative">
              <img
                style="width: 90%"
                src="@/assets/images/dataScreen_pyramid@2x.png"
              />
              <div class="pyramid-num" style="top: -2%; right: 13%">38</div>
              <div class="pyramid-num" style="top: 10%; left: 10%">76</div>
              <div class="pyramid-num" style="top: 32%; right: 5%">102</div>
              <div class="pyramid-num" style="top: 55%; left: 5%">368</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14" style="height: 100%"
        ><div class="content">
          <data-screen-title title="队伍建设"></data-screen-title>
          <div class="team">
            <div class="team-item">
              <div class="item-title">
                <div class="item-title-text"></div>
                档案员配置情况
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
                档案员配置情况
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
                档案员配置情况
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
                档案员配置情况
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
          </div></div
      ></el-col>
    </el-row>
    <el-row :gutter="20" style="padding-top: 20px; flex: 1">
      <el-col :span="10" style="height: 100%"
        ><div class="content">
          <data-screen-title title="归集任务完成情况"></data-screen-title>
          <div style="height: calc(100% - 44px); display: flex">
            <div style="flex: 1; text-align: center; position: relative">
              <span
                style="
                  font-size: 29px;
                  position: absolute;
                  line-height: 34px;
                  font-weight: bold;
                  color: #fff;
                  top: 40%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
                >18960</span
              >
              <img
                src="@/assets/images/quanquwenjian_bj@2x.png"
                style="width: 90%"
              />
              <div
                style="
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 20px;
                  color: #99cbf9;
                "
              >
                全区当年度应有文件数
              </div>
            </div>
            <div style="flex: 1.6; height: calc(100% - 44px)">
              <div class="filed">
                <div class="filed-item">
                  <div class="filed-item-num">1288</div>
                  <div class="filed-item-title">应归档数量</div>
                </div>
                <div class="filed-item">
                  <div class="filed-item-num">1288</div>
                  <div class="filed-item-title">已归档数量</div>
                </div>
                <div class="filed-item">
                  <div class="filed-item-num">1288</div>
                  <div class="filed-item-title">未归档数量</div>
                </div>
                <div class="filed-item">
                  <div class="filed-item-num">1288</div>
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
          <div style="height: calc(100% - 44px)">
            <PieCharts
              enum="COCKPIT_DATA_DBQK"
              file-type="isStandard"
              rose
              :chart-data="[
                { name: '已完成', value: 1055 },
                { name: '进行中', value: 1499 },
                { name: '未开始', value: 386 },
              ]"
            ></PieCharts>
          </div></div
      ></el-col>
      <el-col :span="6" style="height: 100%"
        ><div class="content">
          <data-screen-title title="OA在线归档情况"> </data-screen-title>
          <div style="height: calc(100% - 44px)">
            <div class="filed">
              <div class="filed-item">
                <div class="filed-item-num">1288</div>
                <div class="filed-item-title">应归档数量</div>
              </div>
              <div class="filed-item">
                <div class="filed-item-num">1288</div>
                <div class="filed-item-title">已归档数量</div>
              </div>
              <div class="filed-item">
                <div class="filed-item-num">1288</div>
                <div class="filed-item-title">未归档数量</div>
              </div>
              <div class="filed-item">
                <div class="filed-item-num">1288</div>
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
import PieCharts from "./pieCharts";
export default {
  components: { DataScreenTitle, PieCharts },
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