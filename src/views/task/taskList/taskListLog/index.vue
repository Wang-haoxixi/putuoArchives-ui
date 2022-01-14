<template>
  <basic-container>
    <content-box title="任务清单日志"> </content-box>
    <div>当前状态 已完成</div>
    <div class="radio">
      <el-radio-group v-model="reverse">
        <el-radio-button :label="false">时间正序</el-radio-button>
        <el-radio-button :label="true">时间倒序</el-radio-button>
      </el-radio-group>
    </div>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in data.records"
        :key="index"
        :color="activity.color"
        :timestamp="activity.createTime"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </basic-container>
</template>

<script>
import ContentBox from "@/views/components/ContentBox/index";
import { getTaskLifeCycle } from "@/api/workbench";

export default {
  components: { ContentBox },
  data() {
    return {
      id: 0,
      data: { records: [] },
      status: "",
      reverse: false,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
    };
  },
  created() {
    let id = this.$route.query.id;
    getTaskLifeCycle({ dataId: id, dataType: 1 }).then((res) => {
      this.data = res.data;
      this.data.records[0].color='#0bbd87' 
    });
  },
};
</script>

<style lang="scss" scoped>
.page {
  background-color: #ffffff;
}
.radio{
  padding: 24px 0 32px;
}
</style>