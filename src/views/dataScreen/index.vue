<template>
  <basic-container>
    <el-row :gutter="20" type="flex" style="flex: 1.3">
      <el-col :span="10" style="height: 100%"
        ><div class="content">
          <data-screen-title title="档案室情况"></data-screen-title>
        </div>
      </el-col>
      <el-col :span="14" style="height: 100%"
        ><div class="content">
          <data-screen-title title="队伍建设"></data-screen-title></div
      ></el-col>
    </el-row>
    <el-row :gutter="20" style="padding-top: 20px; flex: 1">
      <el-col :span="10" style="height: 100%"
        ><div class="content">
          <data-screen-title title="归集任务完成情况"></data-screen-title>
        </div>
      </el-col>
      <el-col :span="8" style="height: 100%"
        ><div class="content">
          <data-screen-title title="任务完成情况"></data-screen-title></div
      ></el-col>
      <el-col :span="6" style="height: 100%"
        ><div class="content">
          <data-screen-title title="OA在线归档情况"></data-screen-title></div
      ></el-col>
    </el-row>
  </basic-container>
</template>

<script >
import DataScreenTitle from "./DataScreenTitle";
export default {
  components: { DataScreenTitle },
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
}
</style>