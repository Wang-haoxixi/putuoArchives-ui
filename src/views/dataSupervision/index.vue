<template>
  <basic-container>
    <content-box title="监管数据管理">
      <hc-crud
        ref="hcCrud"
        :search-query="searchQuery"
        :option="tableOption"
        :operations="operations"
        :fetchListFun="fetchListFun"
      >
        <template v-slot:menu="scope">
          <template v-if="scope.row.taskId">
            <el-button type="text" @click="taskDetail(scope.row)"
              >查看任务</el-button
            >
          </template>
        </template>
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import {
  getPage,
  getRole,
  removeRoleBatch,
  superLogExport,
} from "@/api/system/superLog";
import { downLoadBlob } from "@/utils/file";
import { roleMenuTreeselect } from "@/api/system/menu";
import { roleDeptTreeselect } from "@/api/system/dept";
import HcCrud from "@/views/components/HcCrud/index";
import ContentBox from "@/views/components/ContentBox/index";

export default {
  name: "Role",
  components: { HcCrud, ContentBox },
  dicts: ["system_name"],
  data() {
    return {
      operations: [
        {
          type: "primary",
          label: "导出",
          fun: () => {
            superLogExport().then(({ headers, data }) => {
              let disposition = headers["content-disposition"];
              let fileName = decodeURIComponent(
                disposition.split("fileName=")[1]
              );
              downLoadBlob(data, fileName);
            });
          },
        },
      ],
    };
  },
  created() {},
  computed: {
    searchQuery(){
      return [
        {
          label: "归集日期",
          prop: "collectionTime",
          type: "daterange",
          valueFormat: "yyyy-MM-dd",
        },
        {
          label: "归集系统",
          prop: "systemName",
          type: "select",
          dicData: this.dict.type.system_name,
        },
        {
          label: "归集人",
          prop: "collectionBy",
        },
        {
          label: "题名",
          prop: "title",
        },
        {
          label: "系统归档判断",
          prop: "isArchive",
          type: "select",
          dicData: [
            { label: "应归档", value: "0" },
            { label: "不归档", value: "1" },
          ],
        },
        {
          label: "归档状态",
          prop: "archiveStatus",
          type: "select",
          dicData: [
            { label: "已归档", value: "0" },
            { label: "未归档", value: "1" },
          ],
        },
        {
          label: "归档任务",
          prop: "isTask",
          type: "select",
          dicData: [
            { label: "是", value: "0" },
            { label: "否", value: "1" },
          ],
        },
      ]
    },
    tableOption() {
      return {
        columns: [
          {
            label: "题名",
            prop: "title",
          },
          {
            label: "形成时间",
            prop: "formTime",
          },
          {
            label: "责任者",
            prop: "by",
          },
          {
            label: "归集系统",
            prop: "systemName",
            type: "select",
            dicData: this.dict.type.system_name,
          },
          {
            label: "归集单位",
            prop: "deptName",
          },
          {
            label: "归集科室",
            prop: "department",
          },
          {
            label: "归集人",
            prop: "collectionBy",
          },
          {
            label: "归集日期",
            prop: "collectionTime",
          },
          {
            label: "系统归档判断",
            prop: "isArchive",
            type: "select",
            dicData: [
              { label: "应归档", value: "0" },
              { label: "不归档", value: "1" },
            ],
          },
          {
            label: "归档状态",
            prop: "archiveStatus",
            type: "select",
            dicData: [
              { label: "已归档", value: "0" },
              { label: "未归档", value: "1" },
            ],
          },
          {
            label: "归档任务",
            prop: "isTask",
            type: "select",
            dicData: [
              { label: "是", value: "0" },
              { label: "否", value: "1" },
            ],
          },
          {
            label: "操作",
            prop: "menu",
            slot: true,
          },
        ],
        // menu: [
        //   {
        //     label: "查看任务",
        //     fun: (row) => {
        //       this.taskDetail(row);
        //     },
        //   },
        // ],
      };
    },
  },
  methods: {
    // toExport () {
    //   console.log("toExport")
    //   superLogExport().then(({ headers, data }) => {
    //     let disposition = headers['content-disposition']
    //     let fileName = decodeURIComponent(disposition.split("fileName=")[1])
    //     downLoadBlob(data, fileName)
    //   })
    // },
    taskDetail(row) {
      console.log(row);
      if (row.taskId) {
        this.$router.push({ path: "/taskDetail", query: { id: row.taskId } });
      } else {
        this.$message.error("缺少该任务，无法查看详情");
      }
    },
    fetchListFun(params) {
      let collectionTime = params.collectionTime;
      if (collectionTime && collectionTime.length == 2) {
        params.startTime = collectionTime[0];
        params.endTime = collectionTime[1];
        delete params.collectionTime;
      }
      return new Promise((resolve, reject) => {
        getPage(params).then(({ data }) => {
          resolve({
            records: data.records,
            page: {
              total: data.total,
            },
          });
        });
      });
    },
    toEdit({ roleId }) {
      const roleMenu = this.getRoleMenuTreeselect(roleId);
      getRole(roleId).then((response) => {
        const row = response.data;
        roleMenu.then((res) => {
          let checkedKeys = res.checkedKeys;
          this.$refs.form.open(row, checkedKeys, true);
        });
      });
    },
    getRoleMenuTreeselect(roleId) {
      return roleMenuTreeselect(roleId).then((response) => {
        return response;
      });
    },
    toEditDataScope({ roleId }) {
      const roleDeptTreeselect = this.getRoleDeptTreeselect(roleId);
      getRole(roleId).then((response) => {
        const row = response.data;
        roleDeptTreeselect.then((res) => {
          let checkedKeys = res.checkedKeys;
          this.$refs.dataScopeForm.open(row, checkedKeys, true);
        });
      });
    },
    toEditAuthUser({ roleId }) {
      this.$router.push({
        path: "./role/authUser",
        query: {
          roleId,
        },
      });
    },
    getRoleDeptTreeselect(roleId) {
      return roleDeptTreeselect(roleId).then((response) => {
        return response;
      });
    },
    toDeleteRole(row) {
      this.$modal
        .confirm("是否确认删除该角色？")
        .then(() => {
          return removeRoleBatch([row.roleId]);
        })
        .then(() => {
          this.$modal.msgSuccess("删除成功");
          this.$refs.hcCrud.refresh();
        })
        .catch(() => {});
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleDataScope":
          this.toEditDataScope(row);
          break;
        case "handleAuthUser":
          this.toEditAuthUser(row);
          break;
        case "handleDelete":
          this.toDeleteRole(row);
          break;
        default:
          break;
      }
    },
    pageRefresh() {
      this.$refs.hcCrud.refresh();
    },
  },
};
</script>

