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
          <template v-if="scope.row.type == 1">
            <el-button type="text" @click="toEditAuthUser(scope.row)">分配用户</el-button>
          </template>
          <template v-if="scope.row.type == 2">
            <el-button type="text" @click="toEdit(scope.row)">修改</el-button>
            <el-dropdown size="medium"
              @command="(command) => handleCommand(command, scope.row)"
              v-hasPermi="['system:role:edit']"
            >
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="handleDataScope"
                  >数据权限</el-dropdown-item
                >
                <el-dropdown-item command="handleAuthUser">分配用户</el-dropdown-item>
                <el-dropdown-item command="handleDelete" v-if="scope.row.isCustom">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import { getPage, getRole, removeRoleBatch } from "@/api/system/superLog";
import { roleMenuTreeselect } from "@/api/system/menu";
import { roleDeptTreeselect } from "@/api/system/dept";
import HcCrud from "@/views/components/HcCrud/index";
import ContentBox from "@/views/components/ContentBox/index";

export default {
  name: "Role",
  components: { HcCrud, ContentBox },
  dicts: ["sys_oper_type", "sys_common_status"],
  data() {
    return {
      searchQuery: [
        {
          label: "归集日期",
          prop: "creteTime",
          type: "date",
        },
        {
          label: "归集系统",
          prop: "system",
        },
        {
          label: "归集人",
          prop: "user",
        },
        {
          label: "题名",
          prop: "name",
        },
        {
          label: "系统归档判断",
          prop: "user",
        },
        {
          label: "归档状态",
          prop: "user",
        },
        {
          label: "归档任务",
          prop: "user",
        },
      ],
      operations: [
        {
          type: "primary",
          label: "导出",
          fun: () => {
            this.toExport();
          },
        },
      ],
    };
  },
  created () {
  },
  computed: {
    tableOption() {
      return {
        columns: [
          {
            label: "流水号",
            prop: "roleName",
          },
          {
            label: "题名",
            prop: "createTime",
          },
          {
            label: "形成时间",
            prop: "createByName",
          },
          {
            label: "责任人",
            prop: "userNum",
          },
          {
            label: "归集系统",
            prop: "statusStr",
          },
          {
            label: "归集部门",
            prop: "updateTime",
          },
          {
            label: "归集科室",
            prop: "updateByName",
          },
        ],
        menu: true,
      };
    },
  },
  methods: {
    fetchListFun(params) {
      let createTime = params.createTime;
      if (createTime && createTime.length == 2) {
        params.startDate = createTime[0];
        params.endDate = createTime[1];
        delete params.createTime;
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
    toExport() {
      this.$refs.form.open();
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
        path: './role/authUser',
        query: {
          roleId
        }
      })
    },
    getRoleDeptTreeselect(roleId) {
      return roleDeptTreeselect(roleId).then((response) => {
        return response;
      });
    },
    toDeleteRole (row) {
      this.$modal.confirm('是否确认删除该角色？').then(() => {
        return removeRoleBatch([row.roleId])
      }).then(() => {
        this.$modal.msgSuccess("删除成功");
        this.$refs.hcCrud.refresh();
      }).catch(() => {});
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

