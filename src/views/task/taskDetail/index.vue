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
              >在线预览</el-button
            >
            <el-button
              type="text"
              style="margin-left: 16px; padding: 2px 0; font-size: 14px"
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
            {{ selectDictLabel(dict.type.task_page_status, data.status) }}
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
          {{ selectDictLabel(dict.type.task_page_status, data.status) }}
        </div>
      </div>
      <div class="subtitle" style="margin-top: 20px">任务生命周期</div>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:status="scope">
          <color-tag :value="scope.row.status" :tags="statusTags"></color-tag>
        </template>
      </hc-crud>
    </div>
    <div
      class="bottom"
      v-if="data.perfectUserId == userId && data.status == 15"
    >
      <el-button type="primary" @click="taskReceive">领取任务</el-button>
    </div>
  </div>
</template>

<script>
import { getTaskDetails, getTaskLifeCycle, taskReceive } from "@/api/workbench";
import { mapState } from "vuex";
import HcCrud from "@/views/components/HcCrud/index";
export default {
  components: { HcCrud },
  dicts: ["keyword_type", "task_page_status"],
  data() {
    return { id: 0, data: {} };
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
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
            prop: "type",
            type: "select",
            dicData: this.dict.type.keyword_type,
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
    taskReceive() {
      taskReceive([this.id]).then((res) => {
        if (res.code === 200) {
          this.$modal.msgSuccess("领取成功！");
          getTaskDetails({ taskId: this.id }).then((res) => {
            this.data = res.data;
          });
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