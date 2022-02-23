<template>
  <basic-container>
    <div style="background-color: #ffffff; border-radius: 4px">
      <div class="title-container">
        <div class="title-text">我的任务</div>
        <el-button
          @click="create()"
          v-if="currentWorkbench.identity == 3"
          type="primary"
          >制发任务清单</el-button
        >
      </div>
      <div>
        <el-button
          type="primary"
          v-if="currentWorkbench.identity == 3"
          :plain="statusFlag != '2'"
          @click="click(2)"
          >待处理任务{{
            count.waitHandleCount > 0 ? "(" + count.waitHandleCount + ")" : ""
          }}</el-button
        >
        <el-button
          type="primary"
          v-if="
            currentWorkbench.identity == 2 || currentWorkbench.identity == 3
          "
          :plain="statusFlag != '1'"
          @click="click(1)"
          >进行中任务
          {{
            count.conductCount > 0 ? "(" + count.conductCount + ")" : ""
          }}</el-button
        >
        <el-button
          type="primary"
          v-if="currentWorkbench.identity == 2"
          :plain="statusFlag != '5'"
          @click="click(5)"
          >待领取任务
          {{
            count.waitReceiveCount > 0 ? "(" + count.waitReceiveCount + ")" : ""
          }}</el-button
        >
        <el-button
          type="primary"
          v-if="currentWorkbench.identity == 2"
          :plain="statusFlag != '6'"
          @click="click(6)"
          >完善任务{{
            count.perfectCount > 0 ? "(" + count.perfectCount + ")" : ""
          }}</el-button
        >
        <!-- <el-button
          type="primary"
          v-if="
            currentWorkbench.identity == 2 || currentWorkbench.identity == 3
          "
          :plain="statusFlag != '0'"
          @click="click(0)"
          >全部任务{{
            count.taskCount > 0 ? "(" + count.taskCount + ")" : ""
          }}</el-button
        > -->
        <el-button type="primary" :plain="statusFlag != '0'" @click="click(0)"
          >全部任务{{
            count.taskCount > 0 ? "(" + count.taskCount + ")" : ""
          }}</el-button
        >
        <el-button
          type="primary"
          v-if="currentWorkbench.identity == 4"
          :plain="statusFlag != '3'"
          @click="click(3)"
          >待审核任务{{
            count.waitAuditCount > 0 ? "(" + count.waitAuditCount + ")" : ""
          }}</el-button
        >
        <el-button
          type="primary"
          v-if="currentWorkbench.identity == 4"
          :plain="statusFlag != '4'"
          @click="click(4)"
          >已审核任务{{
            count.reviewedCount > 0 ? "(" + count.reviewedCount + ")" : ""
          }}</el-button
        >
      </div>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:taskName="scope">
          <div>{{ scope.row.taskName }}</div>
          <div style="color: #999999; font-size: 12px; line-height: 17px">
            所属清单：{{ scope.row.taskListName }}
          </div>
        </template>
        <template v-slot:loop="scope">
          <span>{{
            selectDictLabel(dict.type.loop_type, scope.row.nextLoopType)
          }}</span
          ><span v-if="scope.row.nextLoopType > 1"
            >循环 {{ scope.row.currentLoopNum }}/{{ scope.row.nextLoopNum }}
          </span>
        </template>
        <template v-slot:fun="scope">
          <div>
            <el-button
              size="medium"
              style="font-size: 14px"
              type="text"
              v-if="currentWorkbench.identity == 2 && scope.row.pageStatus == 1"
              @click="taskReceive(scope.row.taskId)"
              >领取</el-button
            >
            <el-button
              size="medium"
              style="font-size: 14px"
              type="text"
              v-if="currentWorkbench.identity == 2 && scope.row.pageStatus == 15"
              @click="taskCompleteReceive(scope.row.taskId)"
              >领取</el-button
            >
            <el-button
              size="medium"
              style="font-size: 14px"
              type="text"
              v-if="scope.row.pageStatus == 0"
              @click="edit(scope.row.taskId)"
              >编辑</el-button
            >
            <el-button
              size="medium"
              style="font-size: 14px"
              type="text"
              v-if="scope.row.pageStatus == 0"
              @click="del(scope.row.taskId)"
              >删除</el-button
            >
            <el-button
              size="medium"
              style="font-size: 14px"
              type="text"
              v-if="currentWorkbench.identity == 4 && scope.row.statusFlag == 3"
              @click="agree(scope.row.taskId)"
              >通过</el-button
            >
            <el-button
              size="medium"
              style="font-size: 14px"
              type="text"
              v-if="scope.row.taskId"
              @click="detail(scope.row.taskId)"
              >查看</el-button
            >
          </div>
        </template>
      </hc-crud>
    </div>
    <div style="background-color: #ffffff; border-radius: 4px">
      <div class="title-container">
        <div class="title-text">通知消息</div>
        <el-button type="text" style="font-size: 14px" @click="goNoticeList"
          >更多</el-button
        >
      </div>
      <default-page :index="1" :show="!noticeList.length > 0"></default-page>
      <div
        class="notice-item"
        v-for="(item, index) in noticeList"
        :key="index"
        @click="goNoticeDetail(item.id)"
      >
        <text-tooltip
          :content="item.noticeTitle"
          class="notice-item-title"
        ></text-tooltip>
        <text-tooltip
          :content="timeInterval(item.createTime)"
          class="notice-item-time"
        ></text-tooltip>
      </div>
    </div>
    <el-dialog
      title="领取任务"
      :visible.sync="receiveDialogVisible"
      width="484px"
    >
      <span
        >您可以设置时间节点来提醒完成任务，默认在任务结束前1天会提醒您检查任务是否完成。</span
      >
      <el-form :model="receiveForm" label-position="top" ref="receiveForm">
        <el-form-item label="设置提醒时间">
          <el-date-picker
            style="width: 100%"
            v-model="receiveForm.remindTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="taskReceiveFinish">完成</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import { timeInterval } from "@/utils/index";
import {
  getList,
  getTaskCount,
  getArchiveList,
  taskReceive,
  taskCompleteReceive
} from "@/api/workbench";
import HcCrud from "@/views/components/HcCrud/index";
export default {
  name: "Workbench",
  dicts: [
    "task_type",
    "task_page_status",
    "task_audit_type",
    "get_file_type",
    "imputation_type",
    "loop_type",
  ],
  components: { HcCrud },
  computed: {
    ...mapGetters(["noticeList", "currentWorkbench"]),
    searchQuery() {
      return [
        {
          label: "任务/清单名称",
          prop: "taskName",
        },
        {
          label: "任务类型",
          prop: "type",
          type: "select",
          dicData: this.dict.type.task_type,
        },
        {
          label: "任务状态",
          prop: "pageStatus",
          type: "select",
          dicData: this.dict.type.task_page_status,
        },
        {
          label: "截止日期",
          prop: "endTime",
          type: "daterange",
          valueFormat: "yyyy-MM-dd",
        },
      ];
    },
    tableOption() {
      return {
        index: true,
        indexLabel: "序号",
        pageAlign: "center",
        columns: [
          {
            label: "任务/清单名称",
            prop: "taskName",
            slot: true,
            hidden:
              this.currentWorkbench.identity != 2 &&
              this.currentWorkbench.identity != 3 &&
              this.currentWorkbench.identity != 4 &&
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7,
          },
          {
            label: "题名",
            prop: "archivesName",
            hidden: this.currentWorkbench.identity != 1,
          },
          {
            label: "单位",
            prop: "companyDeptName",
            hidden:
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7,
          },
          {
            label: "责任者",
            prop: "responsibleDept",
            hidden: this.currentWorkbench.identity != 1,
          },
          {
            label: "形成时间",
            prop: "formTime",
            hidden: this.currentWorkbench.identity != 1,
          },
          {
            label: "审核类型",
            prop: "status",
            type: "select",
            dicData: this.dict.type.task_audit_type,
            hidden: this.currentWorkbench.identity != 4 || this.statusFlag == 0,
          },
          {
            label: "申请人",
            prop: "applyUserName",
            hidden: this.currentWorkbench.identity != 4 || this.statusFlag == 0,
          },
          {
            label: "申请理由",
            prop: "applyRemark",
            hidden: this.currentWorkbench.identity != 4 || this.statusFlag == 0,
          },
          // TODO:辜鹏
          {
            label: "档案类型",
            prop: "materialType",
            type: "select",
            dicData: this.dict.type.get_file_type,
            hidden: this.currentWorkbench.identity != 1,
          },
          {
            label: "科室",
            prop: "deptName",
            hidden:
              this.currentWorkbench.identity != 1 &&
              this.currentWorkbench.identity != 3 &&
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7 &&
              (this.currentWorkbench.identity != 4 || this.statusFlag != 0),
          },
          {
            label: "归集人",
            prop: "liableName",
            hidden:
              this.currentWorkbench.identity != 1 &&
              this.currentWorkbench.identity != 3 &&
              (this.currentWorkbench.identity != 4 || this.statusFlag != 0),
          },
          // TODO:辜鹏
          {
            label: "归集类型",
            prop: "liableType",
            type: "select",
            dicData: this.dict.type.imputation_type,
            hidden: this.currentWorkbench.identity != 1,
          },
          {
            label: "任务类型",
            prop: "type",
            type: "select",
            dicData: this.dict.type.task_type,
            hidden:
              this.currentWorkbench.identity != 2 &&
              this.currentWorkbench.identity != 3 &&
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7 &&
              (this.currentWorkbench.identity != 4 || this.statusFlag != 0),
          },
          {
            label: "任务循环",
            prop: "loop",
            slot: true,
            hidden:
              this.currentWorkbench.identity != 3 &&
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7 &&
              (this.currentWorkbench.identity != 4 || this.statusFlag != 0),
          },
          {
            label: "任务状态",
            prop: "pageStatus",
            type: "select",
            dicData: this.dict.type.task_page_status,
            hidden:
              this.currentWorkbench.identity != 2 &&
              this.currentWorkbench.identity != 3 &&
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7 &&
              (this.currentWorkbench.identity != 4 || this.statusFlag != 0),
          },
          {
            label: "申请时间",
            prop: "applyTime",
            hidden: this.currentWorkbench.identity != 4 || this.statusFlag == 0,
          },
          {
            label: "创建日期",
            prop: "creteTime",
            hidden:
              this.currentWorkbench.identity != 3 &&
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7 &&
              (this.currentWorkbench.identity != 4 || this.statusFlag != 0),
          },
          {
            label: "截止日期",
            prop: "endTime",
            hidden:
              this.currentWorkbench.identity != 2 &&
              this.currentWorkbench.identity != 3 &&
              this.currentWorkbench.identity != 5 &&
              this.currentWorkbench.identity != 7 &&
              (this.currentWorkbench.identity != 4 || this.statusFlag != 0),
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
    return {
      // page: {
      //   current: 1,
      //   size: 10,
      //   total: 0,
      // },
      count: {},
      statusFlag: 0,
      receiveDialogVisible: false,
      receiveForm: {
        taskId: "",
        remindTime: "",
      },
    };
  },
  // watch: {
  //   query: {
  //     handler(newName, oldName) {
  //       // this.getList(newName);
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  methods: {
    goNoticeList() {
      this.$router.push({ path: "noticeList" });
    },
    goNoticeDetail(id) {
      this.$router.push({ path: "noticeDetail", query: { id: id } });
    },
    //制发任务清单
    create() {
      this.$router.push({ path: "createTask" });
    },
    //领取任务
    taskReceive(taskId) {
      this.receiveDialogVisible = true;
      this.receiveForm.taskId = taskId;
    },
    del() {},
    edit() {},
    detail(id) {
      this.$router.push({ path: "taskDetail", query: { id: id } });
    },
    agree() {},
    timeInterval,
    fetchListFun(params) {
      return new Promise((resolve, reject) => {
        if (this.currentWorkbench.identity === 1) {
          getArchiveList(params).then(({ data }) => {
            resolve({
              records: data.records,
              page: {
                total: data.total,
              },
            });
          });
        } else {
          getList({
            statusFlag: this.statusFlag,
            ...params,
          }).then(({ data }) => {
            resolve({
              records: data.records,
              page: {
                total: data.total,
              },
            });
          });
        }
      });
    },
    init() {
      this.getTaskCount();
    },
    getTaskCount() {
      getTaskCount().then((res) => {
        // console.log(res);
      });
    },
    // getList(query) {
    //   this.loading = true;
    //   getlist(query).then((res) => {
    //     if (res.code == 200) {
    //       this.tableData = res.data.records;
    //       this.total = res.data.total;
    //       this.loading = false;
    //     }
    //   });
    // },
    handleSizeChange() {
      console.log("handleSizeChange");
    },
    handleCurrentChange() {
      console.log("handleCurrentChange");
    },
    click(index) {
      this.statusFlag = index;
      this.$refs.hcCrud.refresh();
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    //领取完善任务
    taskCompleteReceive(taskId) {
      taskCompleteReceive([taskId]).then((res) => {
        if (res.code === 200) {
          this.$message.success("领取成功!");
          this.$refs.hcCrud.refresh();
        }
      });
    },
    taskReceiveFinish() {
      taskReceive(this.receiveForm).then((res) => {
        if (res.code == 200) {
          this.$message.success("领取成功!");
          this.receiveDialogVisible = false;
          this.$refs.hcCrud.refresh();
        }
      });
    },
  },
  created() {
    // console.log(formatTime(this.dayjs("2021-11-15 10:59:42")));
    // console.log(this.dayjs("2021-11-15 10:59:42").unix);
    this.init();
    // this.getList();
  },
};
</script>

<style lang="scss" scoped>
.notice-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
    background-color: #edf4ff;
    .notice-item-title {
      color: #1492ff;
    }
  }
}
.title-container {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-text {
  font-size: 24px;
  line-height: 33px;
  color: #333333;
  font-weight: 500;
}
// .title-more-text {
//   font-size: 24px;
//   line-height: 33px;
//   color: #333333;
//   font-weight: 500;
// }
.dashboard-editor-container {
  // padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.notice-item {
  display: flex;
  flex-direction: space-between;
  align-items: center;
  line-height: 64px;
  height: 64px;
  padding: 0 20px;
  border-bottom: 1px solid #eeeeee;
  .notice-item-title {
    min-width: 0;
    flex: 1;
    line-height: 64px;
    font-size: 16px;
    color: #333333;
  }
  .notice-item-time {
    text-align: left;
    width: 160px;
    margin-left: 12px;
    font-size: 14px;
    color: #999999;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
