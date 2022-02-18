<template>
  <div class="basic-container">
    <div style="background-color: #ffffff; border-radius: 4px;padding-bottom:40px;">
      <div style="display:flex;flex-wrap:wrap;margin: 0 20px 0 -20px">
      <div class="nav-item" v-for="(item, index) in navigation" :key="index">
        <div class="nav-icon"></div>
        <div class="nav-text">{{item.menuName}}</div>
      </div>
      </div>
    </div>
    <div
      style="
        background-color: #ffffff;
        border-radius: 4px;
        margin-top: 20px;
        padding: 0 20px;
      "
    >
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { timeInterval } from "@/utils/index";
import { getList, getArchiveList, getNavigation } from "@/api/workbench";
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
  },
  data() {
    return {
      navigation: [],
    };
  },
  methods: {
    goNoticeList() {
      this.$router.push({ path: "noticeList" });
    },
    goNoticeDetail(id) {
      this.$router.push({ path: "noticeDetail", query: { id: id } });
    },
    //制发任务清单
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
      getNavigation().then((res) => {
        this.navigation = res.data;
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.basic-container {
  min-height: calc(100vh - 144px);
  // padding: 20px;
  border-radius: 4px;
}

.nav-item {
  width: 108px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-left: 60px;
  .nav-icon {
    background-color: #edf4ff;
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
  .nav-text {
    padding-top: 16px;
    font-size: 18px;
    line-height: 25px;
    color: #333333;
  }
}

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
