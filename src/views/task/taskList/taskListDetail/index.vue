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
          <div class="info">
            <span>{{
            selectDictLabel(dict.type.loop_type, data.nextLoopType)
          }}</span
          ><span v-if="data.nextLoopType > 1"
            >循环，第{{ data.currentLoopNum }}次，共{{ data.nextLoopNum }}次
          </span>
          </div>
          <div class="subtitle">创建科室</div>
          <div class="info">办公室</div></el-col
        >
      </el-row>
      <div class="data-container">
        <div class="data-container-item">
          <div class="title">{{data.taskNum}}</div>
          <div class="text">子任务总数</div>
        </div>
        <div class="data-container-item">
          <div class="title">{{data.taskCompleteNum}}</div>
          <div class="text">已完成任务数</div>
        </div>
        <div class="data-container-item">
          <div class="title">{{Math.round(data.taskCompleteNum/data.taskNum *10000) / 100}}%</div>
          <div class="text">完成率</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="title">
        <div class="title-text">清单状态</div>
      </div>
      <div class="status">
        <div class="subtitle">
          当前状态
          <span style="font-size: 20px; padding-left: 16px"
            >{{ selectDictLabel(dict.type.task_page_status, data.status)}}</span
          ><span class="subtitle" style="padding-left: 80px"
            >{{status.createTime}} </span
          ><span class="subtitle" style="padding-left: 40px"
            >{{status.content}}</span
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
import { getTaskListDetail, getList,getTaskLifeCycle } from "@/api/workbench";
import HcCrud from "@/views/components/HcCrud/index";

export default {
  components: { HcCrud },
  dicts: ["task_material_type", "loop_type","task_page_status"],
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
    return { id: 0, data: "",status:"" };
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
    getTaskLifeCycle({dataId:id,dataType: 1}).then(res => {
      this.status = res.data.records[0];
    })
  },
};
</script>
<style lang="scss" scoped>
.data-container {
  margin-top: 13px;
  height: 105px;
  display: flex;
  .data-container-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: #f2f3f5 1px solid;
    &:not(:last-child) {
      border-right: #f2f3f5 1px solid;
    }
    .title {
      font-size: 30px;
      font-weight: 600;
      line-height: 42px;
    }
    .text {
      padding-top: 3px;
      font-size: 14px;
      line-height: 20px;
      color: #999999;
    }
  }
}
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