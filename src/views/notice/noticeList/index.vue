<template>
  <basic-container>
    <content-box title="消息中心">
      <template v-slot:operations>
        <search-input @search="toSearch"></search-input>
        <el-button style="margin-left: 10px" type="primary">全部已读</el-button>
      </template>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:readStatus="scope">
          <span
            :class="scope.row.readStatus === 0 ? 'read' : 'unread'"
            >{{ scope.row.readStatus === 0 ? "已读" : "未读" }}</span
          >
        </template>
        <template v-slot:noticeTitle="scope">
          <div
            class="overflow"
            :class="scope.row.readStatus === 0 ? 'read' : 'unread'"
            @click="detail(scope.row.id)"
          >
            {{ scope.row.noticeTitle }}
          </div>
        </template>
        <template v-slot:createTime="scope">
          <span
            style="color: #999999; font-size: 14px"
            >{{ timeInterval(scope.row.createTime) }}</span
          >
        </template>
        <template v-slot:fun="scope">
          <div
            style="
              display: flex;
              flex-direction: row-reverse;
              justify-content: space-between;
            "
          >
            <el-button size="medium" style="font-size: 14px" type="text" @click="del(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="medium"
              type="text"
              style="font-size: 14px"
              v-if="scope.row.readStatus === 1"
              @click="read(scope.row.id)"
              >标记已读</el-button
            >
          </div>
        </template>
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import { getNoticeList, delNotice, getNotice } from "@/api/system/notice";
import HcCrud from "@/views/components/HcCrud/index";
import { timeInterval } from "@/utils/index";
import ContentBox from "@/views/components/ContentBox/index";
import SearchInput from "@/views/components/SearchInput/index";

export default {
  name: "noticeList",
  components: { ContentBox, SearchInput, HcCrud },
  dicts: ["sys_oper_type", "sys_common_status"],
  data() {
    return {
      statusTags: [
        {
          value: "0",
          color: "#15BE50",
          label: "启用",
        },
        {
          value: "1",
          color: "#D40000",
          label: "禁用",
        },
      ],
    };
  },
  computed: {
    tableOption() {
      return {
        showHeader: false,
        index: false,
        pageAlign: "center",
        rowStyle: { height: "65px" },
        columns: [
          {
            label: "未读状态",
            prop: "readStatus",
            width: 80,
            slot: true,
          },
          {
            label: "内容",
            prop: "noticeTitle",
            slot: true,
            showOverflowTooltip: true,
          },
          {
            label: "时间",
            width: 160,
            prop: "createTime",
            slot: true,
          },
          {
            label: "操作",
            width: 140,
            prop: "fun",
            slot: true,
          },
        ],
        // menu: [
        //   {
        //     label: "标记已读",
        //     fun: (row) => {
        //       this.toEdit(row);
        //     },
        //   },
        //   {
        //     label: "删除",
        //     fun: () => {},
        //   },
        // ],
        // menuWidth: 180,
      };
    },
  },
  methods: {
    detail(id){
      this.$router.push({ path: "noticeDetail",query:{id:id}})
    },
    read(id) {
      getNotice(id)
        .then((res) => {
          console.log(res);
          this.$modal.msgSuccess("标记成功");
          this.$refs.hcCrud.refresh();
        })
        .catch(() => {});
    },
    del(id) {
      this.$modal
        .confirm("是否确认删除该条消息？")
        .then(function () {})
        .then(() => {
          delNotice(id).then((res) => {
            console.log(res);
            this.$modal.msgSuccess("删除成功");
            this.$refs.hcCrud.refresh();
          });
        })
        .catch(() => {});
    },
    timeInterval,
    fetchListFun(params) {
      return new Promise((resolve, reject) => {
        getNoticeList(params).then(({ data }) => {
          resolve({
            records: data.data.records,
            page: {
              total: data.data.total,
            },
          });
        });
      });
    },
    toSearch(name) {
      this.$refs.hcCrud.refresh(
        {},
        {
          name,
        }
      );
    },
    startBatch() {
      let select = this.$refs.hcCrud.multipleSelection;
      if (select.length > 0) {
        this.$modal
          .confirm("是否确认启用所选关键词？")
          .then(function () {
            let ids = [];
            for (let i = 0; i < select.length; i++) {
              ids.push(select[i].id);
            }
            return startData(ids);
          })
          .then(() => {
            this.$modal.msgSuccess("启用成功");
            this.$refs.hcCrud.refresh();
          })
          .catch(() => {});
      } else {
        this.$modal.msgWarning("请先勾选需要启用的关键词");
      }
    },
    stopBatch() {
      let select = this.$refs.hcCrud.multipleSelection;
      if (select.length > 0) {
        this.$modal
          .confirm("是否确认禁用所选关键词？")
          .then(function () {
            let ids = [];
            for (let i = 0; i < select.length; i++) {
              ids.push(select[i].id);
            }
            return stopData(ids);
          })
          .then(() => {
            this.$modal.msgSuccess("禁用成功");
            this.$refs.hcCrud.refresh();
          })
          .catch(() => {});
      } else {
        this.$modal.msgWarning("请先勾选需要禁用的关键词");
      }
    },
    toEdit(row) {
      this.$router.push({
        path: "/keyword/dedicatedkey/edit",
      });
    },
  },
};
</script>
<style scoped lang="scss">
.read {
  font-size: 16px;
  color: #999999;
}
.unread {
  font-size: 16px;
  color: #333333;
}
.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
    color: #1492ff;
  }
}
</style>

