<template>
  <div>
    <div class="container">
      <div class="title">
        <div class="title-text">基本信息</div>
        <el-button type="primary">导出Excel</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="subtitle">清单名称</div>
          <div class="info">{{ data.taskListName }}</div>
          <div class="subtitle">创建单位</div>
          <div class="info">{{ data.companyDeptName }}</div>
        </el-col>
        <el-col :span="6"
          ><div class="subtitle">任务开始日期</div>
          <div class="info">{{ data.startTime }}</div>
          <div class="subtitle">创建日期</div>
          <div class="info">{{ data.creteTime }}</div></el-col
        >
        <el-col :span="6"
          ><div class="subtitle">任务截止日期</div>
          <div class="info">{{ data.endTime }}</div>
          <div class="subtitle">创建人</div>
          <div class="info">{{ data.createName }}</div></el-col
        >
        <el-col :span="6"
          ><div class="subtitle">归集周期</div>
          <div class="info">每天循环，第5次，共6次</div>
          <div class="subtitle">创建科室</div>
          <div class="info">办公室</div></el-col
        >
      </el-row>
    </div>
    <div class="container">
      <div class="title">
        <div class="title-text">清单状态</div>
      </div>
      <div class="status">
        <div class="subtitle">
          当前状态
          <span style="color: #15be50; font-size: 20px; padding-left: 16px"
            >已完成</span
          ><span class="subtitle" style="padding-left: 80px"
            >2021-09-12 12:00:09 </span
          ><span class="subtitle" style="padding-left: 40px"
            >子任务2完成（13/13）</span
          >
        </div>
        <el-button type="text">查看状态详情</el-button>
      </div>
    </div>
    <div class="container">
      <div class="title"><div class="title-text">任务列表</div></div>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:status="scope">
          <color-tag :value="scope.row.status" :tags="statusTags"></color-tag>
        </template>
      </hc-crud>
    </div>
  </div>
</template>

<script>
import { getTaskListDetail, getList } from "@/api/workbench";
import HcCrud from "@/views/components/HcCrud/index";

export default {
  components: { HcCrud },
  dicts: ["task_material_type"],
  computed: {
    tableOption() {
      return {
        index: false,
        columns: [
          {
            label: "题名",
            prop: "archivesName",
          },
          {
            label: "材料类型",
            prop: "materialType",
            type: "select",
            dicData: this.dict.type.task_material_type,
          },
          {
            label: "归集档案员",
            prop: "liableName",
          },
          {
            label: "截止日期",
            prop: "endTime",
          },
          {
            label: "状态",
            prop: "remark",
          },
          {
            label: "领取时间",
            prop: "remark",
          },
          {
            label: "完成时间",
            prop: "remark",
          },
        ],
      };
    },
  },
  data() {
    return { id: 0, data: "" };
  },
  methods: {
    fetchListFun(params) {
      return new Promise((resolve, reject) => {
        getList({ taskListId: this.id, ...params }).then(({ data }) => {
          resolve({
            records: data.records,
            page: {
              total: data.total,
            },
          });
        });
      });
    },
  },
  created() {
    let id = this.$route.query.id;
    console.log(this.$route);
    this.id = id;
    getTaskListDetail({ taskListId: id }).then((res) => {
      this.data = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 12px 20px 20px;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-text {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      color: #333333;
    }
  }
  .subtitle {
    padding-top: 20px;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    color: #666666;
  }
  .info {
    line-height: 44px;
    font-size: 18px;
    color: #333333;
  }
  .status {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .subtitle {
      padding: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>