<template>
  <basic-container>
    <content-box title="分配用户" back>
      <hc-crud
        ref="hcCrud"
        :option="tableOption"
        :operations="operations"
        :fetchListFun="fetchListFun"
        :deleteFun="deleteFun"
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
                <el-dropdown-item command="handleAuthUser"
                  >分配用户</el-dropdown-item
                >
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </hc-crud>
    </content-box>
    <Form ref="form" @refresh="refresh"></Form>
  </basic-container>
</template>

<script>
import { getAuthUserPage, removeRoleUserBatch } from "@/api/system/role";
import HcCrud from "@/views/components/HcCrud/index";
import ContentBox from "@/views/components/ContentBox/index";
import Form from "./form"

export default {
  name: "Role",
  components: { HcCrud, ContentBox, Form },
  data() {
    return {
      searchQuery: [
        {
          label: "姓名",
          prop: "roleName",
          type: "text",
        },
        {
          label: "单位",
          prop: "status",
        },
        {
          label: "科室",
          prop: "createTime",
        },
        {
          label: "职务",
          prop: "createTime",
        },
      ],
      operations: [
        {
          type: "primary",
          label: "添加用户",
          icon: "el-icon-plus",
          fun: () => {
            this.toAdd();
          },
        },
      ],
    };
  },
  computed: {
    tableOption() {
      return {
        indexLabel: "序号",
        columns: [
          {
            label: "姓名",
            prop: "nickName",
          },
          {
            label: "单位",
            prop: "unitName",
          },
          {
            label: "科室",
            prop: "deptName",
          },
          {
            label: "职务",
            prop: "govEmpPosJob",
          },
        ],
        menu: [
          'delete'
        ],
        menuWidth: 60
      };
    },
    roleId () {
      return this.$route.query?.roleId
    }
  },
  methods: {
    fetchListFun(params) {
      return new Promise((resolve, reject) => {
        getAuthUserPage({
          roleId: this.roleId,
          ...params
        }).then(({ data }) => {
          resolve({
            records: data.records,
            page: {
              total: data.total,
            },
          });
        });
      });
    },
    deleteFun (row, next) {
      this.$modal.confirm('是否确认删除该用户角色？').then(() => {
        return removeRoleUserBatch({
          roleId: this.roleId,
          users: [{
            userId: row.userId,
            deptId: row.deptId,
          }]
        })
      }).then(() => {
        this.$modal.msgSuccess("删除成功");
        this.$refs.hcCrud.refresh();
      }).catch(() => {});
    },
    toAdd() {
      this.$refs.form.open();
    },
    refresh () {
      this.$refs.hcCrud.refresh();
    }
  },
};
</script>
