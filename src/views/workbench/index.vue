<template>
  <div>
    <div style="background-color: #ffffff; border-radius: 4px">
      <div class="title-container">
        <div class="title-text">我的任务</div>
      </div>
      <div>
        <el-button
          type="primary"
          :plain="query.statusFlag != 'auditCount'"
          @click="click(2)"
          >待处理任务</el-button
        >
        <el-button
          type="primary"
          :plain="query.statusFlag != '1'"
          @click="click(1)"
          >进行中任务</el-button
        >
        <el-button
          type="primary"
          :plain="query.statusFlag != 'waitReceiveCount'"
          @click="click(5)"
          >待领取任务</el-button
        >
        <el-button
          type="primary"
          :plain="query.statusFlag != 'perfectCount'"
          @click="click(6)"
          >完善任务</el-button
        >
        <el-button
          type="primary"
          :plain="query.statusFlag != 'taskCount'"
          @click="click(0)"
          >全部任务</el-button
        >
        <el-button
          type="primary"
          :plain="query.statusFlag != 'waitAuditCount'"
          @click="click(3)"
          >待审核任务</el-button
        >
        <el-button
          type="primary"
          :plain="query.statusFlag != 'reviewedCount'"
          @click="click(4)"
          >已审核任务</el-button
        >
      </div>
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <!-- <el-table-column label="序号">
              <template slot-scope="scope">
                <span> {{ scope }}</span>
              </template>
            </el-table-column> -->
        <el-table-column
          prop="taskName"
          label="任务/清单名称"
        ></el-table-column>
        <el-table-column prop="archivesName" label="题名"> </el-table-column>
        <el-table-column prop="companyDeptName" label="单位"> </el-table-column>
        <el-table-column prop="responsibleDept" label="责任者">
        </el-table-column>
        <el-table-column prop="formTime" label="形成时间"> </el-table-column>
        <el-table-column prop="status" label="审核类型">
          <template slot-scope="scope">
            <span>{{
              selectDictLabel(dict.type.task_audit_type, scope.row.status)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyUserName" label="申请人"> </el-table-column>
        <el-table-column prop="applyRemark" label="申请理由"> </el-table-column>
        <!-- TODO: 新接口，找辜鹏拿 -->
        <el-table-column prop="materialType" label="档案类型">
          <template slot-scope="scope">
            <span>{{
              selectDictLabel(dict.type.task_type, scope.row.materialType)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="科室"> </el-table-column>
        <el-table-column prop="liableName" label="归集人"> </el-table-column>
        <!-- TODO: 新接口，找辜鹏拿 -->
        <el-table-column prop="type" label="归集类型">
          <template slot-scope="scope">
            <span>{{
              selectDictLabel(dict.type.task_type, scope.row.type)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="任务类型">
          <template slot-scope="scope">
            <span>{{
              selectDictLabel(dict.type.task_type, scope.row.type)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="任务循环"> </el-table-column>
        <el-table-column prop="pageStatus" label="任务状态">
          <template slot-scope="scope">
            <span>{{
              selectDictLabel(dict.type.task_page_status, scope.row.pageStatus)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间"> </el-table-column>
        <el-table-column prop="creteTime " label="创建日期"> </el-table-column>
        <el-table-column prop="endTime" label="截止日期"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <div style="background-color: #ffffff; border-radius: 4px">
      <div class="title-container">
        <div class="title-text">通知消息</div>
        <el-button type="text" style="font-size: 14px">更多</el-button>
      </div>
      <default-page :index="1" :show="!noticeList.length > 0"></default-page>
      <div class="notice-item" v-for="(item, index) in noticeList" :key="index">
        <!-- <div class="notice-item-title"> -->
        <text-tooltip
          :content="item.noticeTitle"
          class="notice-item-title"
        ></text-tooltip>
        <!-- </div> -->

        <!-- <el-tooltip
              effect="dark"
              :content="item.noticeTitle"
              placement="top-start"
            > -->
        <!-- <div class="notice-item-title">{{ item.noticeTitle }}</div> -->
        <!-- </el-tooltip> -->
        <text-tooltip
          :content="timeInterval(item.createTime)"
          class="notice-item-time"
        ></text-tooltip>
        <!-- <div class="notice-item-time">
              1小时前
              {{ item.updateTime }}
            </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { timeInterval } from "@/utils/index";
import { getlist, getTaskCount } from "@/api/workbench";
import { listNotice } from "@/api/system/notice";
import request from "@/utils/request";
export default {
  name: "Workbench",
  dicts: ["task_type", "task_page_status", "task_audit_type"],
  components: {},
  computed: {
    ...mapGetters(["noticeList"]),
  },
  data() {
    return {
      fileList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      query: {
        statusFlag: 0,
      },
      loading: true,
      tableData: [],
    };
  },
  watch: {
    query: {
      handler(newName, oldName) {
        this.getList(newName);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    timeInterval,
    change(e) {
      let files = e.target.files;

      // 上传部分
      let url = "/file/upload"; //你的后台上传地址
      let data = new FormData();
      data.append("file", files[0]);
      request({
        url,
        method: "post",
        timeout: 10000000,
        data,
        headers: {},
        //原生获取上传进度的事件
        onUploadProgress: function (progressEvent) {
          let complete =
            (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
          console.log("上传 " + complete);
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    init() {
      console.log(this.noticeList);
      this.getTaskCount();
      this.getList();
    },
    getTaskCount() {
      getTaskCount().then((res) => {
        // console.log(res);
      });
    },
    getList(query) {
      this.loading = true;
      getlist(query).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
          this.loading = false;
        }
      });
    },
    handleSizeChange() {
      console.log("handleSizeChange");
    },
    handleCurrentChange() {
      console.log("handleCurrentChange");
    },
    click(index) {
      this.query.statusFlag = index;
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
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
.title-container {
  padding: 16px 20px;
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
  margin: 0 20px;
  border-bottom: 1px solid #eeeeee;
  .notice-item-title {
    min-width: 0;
    flex: 1;
    line-height: 64px;
    font-size: 16px;
    color: #333333;
  }
  .notice-item-time {
    text-align: right;
    width: 80px;
    padding-left: 12px;
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
