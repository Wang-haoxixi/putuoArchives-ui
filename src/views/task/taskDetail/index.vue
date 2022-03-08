<template>
  <div class="page">
    <div class="container">
      <div class="title">
        <div class="title-text">{{ data.taskName }}</div>
        <el-button type="primary" @click="taskListDetail"
          >查看任务清单</el-button
        >
      </div>
      <div class="key-value" style="padding-top: 24px">
        <div>
          <div class="key">所属清单名称</div>
          <div class="value">{{ data.taskListName }}</div>
        </div>
        <div>
          <div class="key">子任务开始日期</div>
          <div class="value">{{ data.startTime }}</div>
        </div>
        <div>
          <div class="key">子任务截止日期</div>
          <div class="value">{{ data.endTime }}</div>
        </div>
        <div>
          <div class="key">材料类型</div>
          <div class="value">{{ data.materialTypeName }}</div>
        </div>
      </div>
      <div class="subtitle" style="padding-top: 37px">任务文件信息</div>
      <div class="key-value" style="padding-top: 20px">
        <div>
          <div class="key">题名</div>
          <div class="value">{{ data.taskName }}</div>
        </div>
        <div>
          <div class="key">题名关键词</div>
          <div class="value">
            <el-tag
              v-for="(tag, index) in data.keywordTagList"
              :key="index"
              class="tags"
              size="mini"
              >{{ tag }}</el-tag
            >
          </div>
        </div>
        <div>
          <div class="key">形成时间</div>
          <div class="value">{{ data.formTime }}</div>
        </div>
        <div>
          <div class="key">责任者</div>
          <div class="value">{{ data.responsibleDept }}</div>
        </div>
        <div>
          <div class="key">
            关联材料
            <el-button
              type="primary"
              size="mini"
              plain
              style="margin-left: 20px"
              @click="dialogVisible = true"
              >编辑关联材料</el-button
            >
          </div>
          <div
            class="key"
            style="line-height: 20px; font-size: 14px"
            v-for="(item, index) in data.fileRelationList"
            :key="index"
          >
            {{ item.fileName }}
            <el-button
              type="text"
              style="margin-left: 16px; padding: 2px 0; font-size: 14px"
              @click="toPreview(item.fileUrl)"
              >在线预览</el-button
            >
            <el-button
              type="text"
              style="margin-left: 16px; padding: 2px 0; font-size: 14px"
              @click="toDownLoad(item.fileUrl)"
              >下载</el-button
            >
          </div>
        </div>
        <div>
          <div class="key">任务领取时间</div>
          <div class="value">{{ data.receiveTime }}</div>
        </div>
        <div>
          <div class="key">状态</div>
          <div class="value">
            {{ selectDictLabel(dict.type.task_page_status, data.pageStatus) }}
          </div>
        </div>
        <div>
          <div class="key">任务完成时间</div>
          <div class="value">{{ data.finishTime }}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="subtitle">子任务状态</div>
      <div class="status">
        <div class="status-title">当前状态</div>
        <div class="status-text">
          {{ selectDictLabel(dict.type.task_page_status, data.pageStatus) }}
        </div>
      </div>
      <div class="subtitle" style="margin-top: 20px">任务生命周期</div>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:status="scope">
          <color-tag :value="scope.row.status" :tags="statusTags"></color-tag>
        </template>
      </hc-crud>
    </div>
    <div class="bottom">
      <el-button
        type="primary"
        @click="taskReceive"
        v-if="data.liable == userId && this.currentWorkbench.identity == 2"
        >领取任务</el-button
      >
      <el-button
        type="primary"
        @click="taskCompleteReceive"
        v-else-if="
          data.perfectUserId == userId &&
          data.pageStatus == 15 &&
          this.currentWorkbench.identity == 2
        "
        >领取任务</el-button
      >
      <el-button
        type="primary"
        @click="taskReceive"
        v-else-if="data.pageStatus == 1 && this.currentWorkbench.identity == 3"
        >催一下</el-button
      >
      <div
        v-else-if="
          (data.pageStatus == 2 || data.pageStatus == 5) &&
          this.currentWorkbench.identity == 3
        "
      >
        <el-button type="primary" @click="apply(2)">延期</el-button>
        <el-button type="primary" @click="apply(3)">申请取消</el-button>
        <el-button type="primary" @click="apply(1)">申请完成</el-button>
      </div>
      <el-button div v-else type="primary" disabled
        >{{ selectDictLabel(dict.type.task_page_status, data.pageStatus) }}
      </el-button>
    </div>
    <el-dialog title="编辑关联材料" :visible.sync="dialogVisible" width="484px">
      <div class="materialList">
        <div
          class="material"
          v-for="(item, index) in data.fileRelationList"
          :key="index"
        >
          <div class="materialName">{{ item.fileName }}</div>
          <el-button type="text" @click="materialDel(index)">删除</el-button>
          <!-- <div class="materialDel"></div> -->
        </div>
      </div>
      <el-form :model="materialForm" ref="materialForm">
        <el-form-item prop="file">
          <el-select
            v-model="materialForm.fileList"
            filterable
            remote
            value-key="fileUrl"
            reserve-keyword
            placeholder="请选择关联材料"
            :remote-method="materialRemote"
            :loading="fileLoading"
          >
            <el-option
              v-for="item in fileOptions"
              :key="item.id"
              :label="item.fileTitle"
              :value="{
                fileName: item.fileTitle,
                fileUrl: item.id,
              }"
            >
            </el-option>
          </el-select>
          <el-button type="primary" plain style="" @click="materialAdd"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="applyInfo[applyForm.applyFlag - 1].title"
      :visible.sync="applyDialogVisible"
      destroy-on-close
      width="484px"
    >
      <div class="applyInfo">
        {{ applyInfo[applyForm.applyFlag - 1].info }}
      </div>
      <el-form
        :model="applyForm"
        label-position="top"
        :rules="applyFormRules"
        ref="applyForm"
      >
        <el-form-item label="审批人">
          <el-select
            style="width: 100%"
            v-model="applyForm.auditUserId"
            placeholder="请选择审批人"
          >
            <el-option
              :label="item.nickName"
              :value="item.userId"
              v-for="item in unitAdmin"
              :key="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请理由">
          <el-input
            type="textarea"
            v-model="applyForm.remark"
            max-length="100"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex-direction: row-reverse">
        <el-button type="primary" style="" @click="applySubmit"
          >提交申请</el-button
        >
        <el-button
          type="primary"
          plain
          style="margin-right: 12px"
          @click="applyCancel"
          >取消</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="领取任务"
      :visible.sync="receiveDialogVisible"
      destroy-on-close
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
  </div>
</template>

<script>
import {
  getTaskDetails,
  getTaskLifeCycle,
  taskReceive,
  taskCompleteReceive,
  getMaterials,
  fileUpdate,
  getUnitAdmin,
  taskApply,
} from "@/api/workbench";
import { trainDownloadUrl, trainPreviewUrl } from "@/api/file/index";
import { mapState, mapGetters } from "vuex";
import HcCrud from "@/views/components/HcCrud/index";
export default {
  components: { HcCrud },
  dicts: ["keyword_type", "task_page_status"],
  data() {
    return {
      id: 0,
      data: {},
      dialogVisible: false,
      applyDialogVisible: false,
      receiveDialogVisible: false,
      applyForm: {
        applyFlag: 1,
        auditUserId: undefined,
        remark: undefined,
        taskId: undefined,
      },
      receiveForm: {
        taskId: "",
        remindTime: "",
      },
      applyInfo: [
        {
          title: "申请完成",
          info: "如果任务已经完成而系统没有识别到，或其他情形，您可以向单位分管领导申请将任务直接完成。",
        },
        {
          title: "申请延期",
          info: "如果任务未能按时完成，或者已经不能按时完成，您可以向单位分管领导申请将任务延期。",
        },
        {
          title: "申请取消",
          info: "如果任务已无法完成，或者有误，您可以向单位分管领导申请将任务取消。",
        },
      ],
      materialForm: {},
      fileOptions: [],
      unitAdmin: [],
      fileLoading: false,
      applyFormRules: {
        auditUserId: [
          { required: true, message: "请选择审批人", trigger: "change" },
        ],
        remark: [
          { required: true, message: "请输入申请理由", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
    ...mapGetters(["currentWorkbench"]),
    tableOption() {
      return {
        index: false,
        columns: [
          {
            label: "日期",
            prop: "createTime",
          },
          {
            label: "用户",
            prop: "createName",
          },
          {
            label: "操作",
            prop: "content",
            // type: "select",
            // dicData: this.dict.type.keyword_type,
          },
          {
            label: "留言",
            prop: "remark",
          },
        ],
      };
    },
  },
  methods: {
    applyCancel() {
      this.applyDialogVisible = false;
    },
    applySubmit() {
      this.$refs["applyForm"].validate((valid) => {
        if (valid) {
          taskApply(this.applyForm).then((res) => {
            if (res.code === 200) {
              this.$message.success("成功");
              this.applyDialogVisible = false;
            }
          });
        } else {
          this.$message.error("请检查输入内容");
          return false;
        }
      });
    },
    applyDetail(applyFlag) {
      this.applyForm.applyFlag = applyFlag;
      this.applyDialogVisible = true;
    },
    toDownLoad(id) {
      trainDownloadUrl({ id }).then(({ data }) => {
        const a = document.createElement("a");
        a.href = `${process.env.VUE_APP_BASE_API}${data}`;
        a.click();
      });
    },
    toPreview(id) {
      trainPreviewUrl({ id }).then(({ data }) => {
        if (data) {
          window.open(data);
        }
      });
    },
    materialDel(index) {
      let list = JSON.parse(JSON.stringify(this.data.fileRelationList));
      list.splice(index, 1);
      this.fileUpdateFun(list);
    },
    materialAdd() {
      //repeat去重字段初始化
      let repeat = false;
      console.log(this.materialForm.fileList);
      //判断添加的材料是否已经存在
      if (this.materialForm.fileList) {
        for (let i = 0; i < this.data.fileRelationList.length; i++) {
          if (
            //注意：因为后台接口设计问题，fileUrl其实是关联材料的id。
            this.data.fileRelationList[i].fileUrl ==
            this.materialForm.fileList.fileUrl
          ) {
            repeat = true;
          }
        }
        if (repeat) {
          this.$modal.msgError("您添加的材料已存在");
        } else {
          let list = JSON.parse(JSON.stringify(this.data.fileRelationList));
          list.push(this.materialForm.fileList);
          this.fileUpdateFun(list);
        }
      }
    },
    fileUpdateFun(list) {
      fileUpdate({ taskId: this.id, fileList: list }).then((res) => {
        if (res.data === true) {
          this.$modal.msgSuccess("操作成功");
          this.data.fileRelationList = list;
        }
      });
    },
    materialRemote(query) {
      this.fileLoading = true;
      getMaterials({ fileTitle: query }).then((res) => {
        this.fileLoading = false;
        this.fileOptions = res.data.records;
      });
    },
    // remoteMethod(query) {
    //   this.fileLoading = true;
    //   getMaterials({ fileTitle: query }).then((res) => {
    //     this.fileLoading = false;
    //     this.fileOptions = res.data.records;
    //   });
    // },
    taskReceive() {
      this.receiveDialogVisible = true;
    },
    taskReceiveFinish() {
      taskReceive(this.receiveForm).then((res) => {
        if (res.code === 200) {
          this.$modal.msgSuccess("领取成功！");
          this.receiveDialogVisible = false;
          this.receiveForm = {
            taskId: "",
            remindTime: "",
          };
          getTaskDetails({ taskId: this.id }).then((res) => {
            this.data = res.data;
          });
        }
      });
    },
    taskCompleteReceive() {
      taskCompleteReceive([this.id]).then((res) => {
        if (res.code === 200) {
          this.$modal.msgSuccess("领取成功！");
          getTaskDetails({ taskId: this.id }).then((res) => {
            this.data = res.data;
          });
          this.$refs.hcCrud.refresh();
        }
      });
    },
    fetchListFun(params) {
      return new Promise((resolve, reject) => {
        getTaskLifeCycle({ ...params, dataId: this.id, dataType: 2 }).then(
          ({ data }) => {
            resolve({
              records: data.records,
              page: {
                total: data.total,
              },
            });
          }
        );
      });
    },
    taskListDetail() {
      this.$router.push({
        path: "taskListDetail",
        query: { id: this.data.taskListId },
      });
    },
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.applyForm.taskId = id;
    this.receiveForm.taskId = id;
    getUnitAdmin().then((res) => {
      this.unitAdmin = res.data;
    });
    getTaskDetails({ taskId: id }).then((res) => {
      this.data = res.data;
    });
    // getTaskLifeCycle({ dataId: id, dataType: 2 }).then((res) => {
    //   this.list = res.data.records;
    // });
  },
};
</script>

<style lang="scss" scoped>
.applyInfo {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 24px;
  color: #666666;
}
.materialList {
  .material {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    .materialName {
      padding-right: 32px;
      color: #333333;
    }
  }
}
.tags {
  height: 22px;
  line-height: 22px;
  border-radius: 2px;
  &:not(:first-child) {
    margin-left: 4px;
  }
}
.page {
  padding-bottom: 64px;
}
.bottom {
  position: fixed;
  z-index: 99;
  width: 100%;
  right: 0;
  bottom: 0;
  padding: 10px 20px;
  background-color: #ffffff;
  height: 64px;
  text-align: right;
}
.container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  &:last-child {
    margin-top: 20px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-text {
      font-size: 24px;
      font-weight: 500;
      line-height: 33px;
      color: #333333;
    }
  }
  .subtitle {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    color: #333333;
  }
  .status {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .status-title {
      color: #666666;
      font-size: 16px;
      line-height: 22px;
    }
    .status-text {
      padding-left: 20px;
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      color: #333333;
    }
  }
  .key-value {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 25px 20px;
    .key {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: #666666;
      padding-bottom: 10px;
    }
    .value {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      color: #333333;
    }
  }
}
</style>
