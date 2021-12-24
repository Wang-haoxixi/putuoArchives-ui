<template>
  <div>
    <div class="container">
      <div class="title">
        <div class="title-text">0521年中讨论会议</div>
        <el-button type="primary" @click="taskListDetail">查看任务清单</el-button>
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
          <div class="value">{{ data.keywordTag }}</div>
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
          <div class="key">关联材料</div>
          <div
            class="key"
            style="line-height: 20px;"
            v-for="(item, index) in data.fileRelationList"
            :key="index"
          >
            {{ item.fileName }}
            <el-button type="text" style="margin-left: 16px; padding: 2px 0"
              >在线预览</el-button
            >
            <el-button type="text" style="margin-left: 16px; padding: 2px 0"
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
          <div class="value">{{selectDictLabel(dict.type.task_page_status, data.status)}}</div>
        </div>
        <div>
          <div class="key">任务完成时间</div>
          <div class="value">{{ data.finishTime }}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="subtitle">子任务状态</div>
      <div>{{ selectDictLabel(dict.type.task_page_status, data.status)}}</div>
      <div class="subtitle">任务生命周期</div>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:status="scope">
          <color-tag :value="scope.row.status" :tags="statusTags"></color-tag>
        </template>
      </hc-crud>
    </div>
  </div>
</template>

<script>
import { getTaskDetails, getTaskLifeCycle } from "@/api/workbench";
import HcCrud from "@/views/components/HcCrud/index";
export default {
  components: { HcCrud },
  dicts: ["keyword_type","task_page_status"],
  data() {
    return { id: 0, data: {} };
  },
  computed: {
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
    fetchListFun(params) {
      return new Promise((resolve, reject) => {
        getTaskLifeCycle(params).then(({ data }) => {
          resolve({
            records: data.records,
            page: {
              total: data.total,
            },
          });
        });
      });
    },
    taskListDetail(){
      this.$router.push({path: 'taskListDetail', query:{id:this.data.taskListId}})
    }
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