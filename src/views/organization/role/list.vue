<template>
  <basic-container>
    <content-box title="角色权限管理">
      <hc-crud
        ref="hcCrud"
        :search-query="searchQuery"
        :option="tableOption"
        :operations="operations"
        :fetchListFun="fetchListFun"
      >
        <template v-slot:menu="scope">
          <template v-if="scope.row.type == 1">
            <el-button type="text">分配用户</el-button>
          </template>
          <template v-if="scope.row.type == 2">
            <el-button type="text" @click="toEdit(scope.row)">修改</el-button>
            <el-dropdown
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
                <el-dropdown-item command="handleDelete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </hc-crud>
    </content-box>
    <Form ref="form" @refresh="pageRefresh"></Form>
    <DataScopeForm ref="dataScopeForm" @refresh="pageRefresh"></DataScopeForm>
  </basic-container>
</template>

<script>
import { getRolePage, getRole, removeRoleBatch } from "@/api/system/role";
import { roleMenuTreeselect } from "@/api/system/menu";
import { roleDeptTreeselect } from "@/api/system/dept";
import HcCrud from "@/views/components/HcCrud/index";
import ContentBox from "@/views/components/ContentBox/index";
import Form from "./form";
import DataScopeForm from "./dataScopeForm";

export default {
  name: "Role",
  components: { HcCrud, ContentBox, Form, DataScopeForm },
  dicts: ["sys_oper_type", "sys_common_status"],
  data() {
    return {
      searchQuery: [
        {
          label: "角色名称",
          prop: "roleName",
          type: "text",
        },
        {
          label: "状态",
          prop: "status",
          type: "select",
          dicData: [
            {
              label: "启用",
              value: "0",
            },
            {
              label: "禁用",
              value: "1",
            },
          ],
        },
        {
          label: "创建时间",
          prop: "createTime",
          type: "daterange",
          valueFormat: "yyyy-MM-dd",
        },
      ],
      operations: [
        {
          type: "primary",
          label: "新增角色",
          icon: "el-icon-plus",
          fun: () => {
            this.toAdd();
          },
        },
      ],
    };
  },
  created () {
    setTimeout(() => {
      console.log(this.$router)
      console.log(this.$route)
    }, 10000)
  },
  computed: {
    tableOption() {
      return {
        columns: [
          {
            label: "角色名称",
            prop: "roleName",
          },
          {
            label: "创建时间",
            prop: "createTime",
          },
          {
            label: "创建人",
            prop: "createByName",
          },
          {
            label: "用户数量",
            prop: "userNum",
          },
          {
            label: "状态",
            prop: "statusStr",
          },
          {
            label: "最后修改时间",
            prop: "updateTime",
          },
          {
            label: "最后修改人",
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
        getRolePage(params).then(({ data }) => {
          resolve({
            records: data.records,
            page: {
              total: data.total,
            },
          });
        });
      });
    },
    toAdd() {
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

