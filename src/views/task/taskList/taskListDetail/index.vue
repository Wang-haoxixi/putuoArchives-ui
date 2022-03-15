<template>
  <div>
    <div class="container">
      <div class="title">
        <div class="title-text">基本信息</div>
        <el-button type="primary" @click="exportExcel">导出Excel</el-button>
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
          <div class="info">{{ data.createTime }}</div></el-col
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
          <div class="info">{{ data.deptName }}</div></el-col
        >
      </el-row>
      <div class="data-container">
        <div class="data-container-item">
          <div class="title">{{ data.taskNum }}</div>
          <div class="text">子任务总数</div>
        </div>
        <div class="data-container-item">
          <div class="title">{{ data.taskCompleteNum }}</div>
          <div class="text">已完成任务数</div>
        </div>
        <div class="data-container-item">
          <div class="title">
            {{
              Math.round((data.taskCompleteNum / data.taskNum) * 10000) / 100
            }}%
          </div>
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
          <span style="font-size: 20px; padding-left: 16px">{{
            selectDictLabel(dict.type.task_page_status, data.status)
          }}</span
          ><span class="subtitle" style="padding-left: 80px"
            >{{ status.createTime }} </span
          ><span class="subtitle" style="padding-left: 40px">{{
            status.content
          }}</span>
        </div>
        <el-button type="text" @click="taskListLog">查看状态详情</el-button>
      </div>
    </div>
    <div class="container">
      <div class="title"><div class="title-text">任务列表</div></div>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:status="scope">
          <color-tag :value="scope.row.status" :tags="statusTags"></color-tag>
        </template>
        <template v-slot:fun="scope">
          <el-button
            size="medium"
            style="font-size: 14px"
            type="text"
            @click="detail(scope.row)"
            >查看</el-button
          >
          <el-button
            size="medium"
            style="font-size: 14px"
            type="text"
            v-if="
              (scope.row.pageStatus == 1 || scope.row.pageStatus == 14) && currentWorkbench.identity == 3
            "
            @click="sendMessage(scope.row)"
            >提醒
          </el-button>
        </template>
      </hc-crud>
    </div>
  </div>
</template>

<script>
import {
  getTaskListDetail,
  getList,
  getTaskLifeCycle,
  exportExcel,
  sendMessage,
} from "@/api/workbench";
import { mapGetters } from "vuex";
import HcCrud from "@/views/components/HcCrud/index";

export default {
  components: { HcCrud },
  dicts: ["task_material_type", "loop_type", "task_page_status"],
  computed: {
    ...mapGetters(["currentWorkbench"]),
    tableOption() {
      return {
        index: false,
        columns: [
          {
            label: "题名",
            prop: "taskName",
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
            prop: "pageStatus",
            type: "select",
            dicData: this.dict.type.task_page_status,
          },
          {
            label: "领取时间",
            prop: "receiveTime",
          },
          {
            label: "完成时间",
            prop: "finishTime",
          },
          {
            label: "档案系统题名",
            prop: "subjectName",
          },
          {
            label: "操作",
            prop: "fun",
            slot: true,
          },
        ],
      };
    },
  },
  data() {
    return { id: 0, data: "", status: "" };
  },
  methods: {
    sendMessage(item) {
      console.log(item)
      //提醒
      let messageFlag;
      if (item.pageStatus == 1) {
        messageFlag = 1;
      }
      if (item.pageStatus == 14) {
        messageFlag = 2;
      }
      sendMessage({ messageFlag: messageFlag, taskId: item.taskId }).then((res) => {
        if (res.code === 200) {
          this.$message.success("成功");
        }
      });
    },
    detail(data) {
      this.$router.push({ path: "/taskDetail", query: { id: data.taskId } });
    },
    exportExcel() {
      exportExcel(this.id).then((res) => {
        console.log(res);
        let blob = new Blob([res], {
          type: "application/vnd.ms-excel",
        });
        // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        let a = document.createElement("a");
        a.href = url;
        a.download = this.data.taskListName + ".xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
        this.diaShow = !this.diaShow;
      });
    },
    taskListLog() {
      this.$router.push({ path: "/taskListLog", query: { id: this.id } });
    },
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
    getTaskLifeCycle({ dataId: id, dataType: 1 }).then((res) => {
      this.status = res.data.records[0];
    });
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