<template>
  <basic-container>
    <content-box title="归档队伍管理">
      <template v-slot:operations>
        <search-input @search="toSearch"></search-input>
        <el-button style="margin-left: 10px;" type="primary" @click="toRecords">变更记录</el-button>
      </template>
      <div class="content">
        <div class="dept-tree">
          <el-tree
            ref="dept"
            class="dept-tree"
            :data="deptTree"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
            @node-click="deptClick"
          >
            <template v-slot="{node, data}">
              <div class="dept-item">
                <div class="dept-name">{{data.label}}</div>
                <div v-if="data.qzhNumber" class="dept-number">{{data.qzhNumber}}</div>
              </div>
            </template>
          </el-tree>
        </div>
        <div class="user-list">
          <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun" not-out>
          </hc-crud>
        </div>
      </div>
    </content-box>
    <el-dialog
      title="管理角色"
      :visible.sync="dialogVisible"
      width="500px"
      append-to-body
    >
      <el-checkbox-group v-model="roleSelect">
        <el-row style="line-height: 24px;">
          <el-col v-for="(item, index) in roleList" :key="index" :span="12">
            <el-checkbox :label="item.roleId">{{item.roleName}}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="modifyRole">确定</el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getUserPage, updateUserRole } from "@/api/system/user"
import { getDeptTree } from "@/api/system/dept";
import { getRoleList } from "@/api/system/role"
import HcCrud from "@/views/components/HcCrud/index"
import ContentBox from "@/views/components/ContentBox/index"
import SearchInput from "@/views/components/SearchInput/index"

export default {
  components: { ContentBox, SearchInput, HcCrud },
  data() {
    return {
      deptTree: [],
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "leaf"
      },
      deptId: undefined,
      roleList: [],
      roleSelect: [],
      handleUser: {},
      dialogVisible: false,
    };
  },
  computed: {
    tableOption () {
      return {
        index: false,
        columns: [
          {
            label: "姓名",
            prop: "nickName"
          },
          {
            label: "手机号",
            prop: "phonenumber"
          },
          {
            label: "单位",
            prop: "unitName"
          },
          {
            label: "科室",
            prop: "deptName"
          },
          {
            label: "职务",
            prop: "govEmpPosJob"
          },
          {
            label: "角色",
            prop: "roleName"
          }
        ],
        menu: [
          {
            label: "管理角色",
            fun: (row) => {
              this.dialogVisible = true
              this.handleUser = row
              let roleSelect = []
              for (let i = 0; i < row.roles.length; i++) {
                roleSelect.push(row.roles[i].roleId)
              }
              this.roleSelect = roleSelect
            }
          }
        ],
        menuWidth: 100
      }
    }
  },
  created () {
    getDeptTree().then(({ data }) => {
      this.deptTree = data
    });
    getRoleList().then(({ data }) => {
      this.roleList = data
    })
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getUserPage({
          ...params,
          deptId: this.deptId
        }).then(({data}) => {
          resolve({
            records: data.records,
            page: {
              total: data.total
            }
          })
        })
      })
    },
    toSearch (nickName) {
      this.$refs.hcCrud.refresh({}, {
        nickName
      })
    },
    toRecords (row) {
      this.$router.push({
        path: "/organization/team/records"
      })
    },
    deptClick (data, node) {
      if (node.isLeaf && this.deptId != data.deptId) {
        this.deptId = data.deptId
        this.$refs.hcCrud.refresh({
          currentPage: 1
        })
      }
    },
    modifyRole () {
      const { userId, deptId } = this.handleUser
      updateUserRole({
        userId,
        deptId,
        roles: this.roleSelect
      }).then(({data}) => {
        this.dialogVisible = false
        this.$modal.msgSuccess("修改成功！")
        this.$refs.hcCrud.refresh()
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .dept-tree {
    margin-top: 20px;
    flex: 284px 0 0;
    border-right: 1px solid #eee;
  }
  .user-list {
    overflow: hidden;
    flex: 284px 1 1;
    margin: 0 -20px 0 20px;
  }

}
.dept-tree {
  ::v-deep .el-tree-node__content {
    height: 56px;
  }
  .dept-name {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #333;
  }
  .dept-number {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #999;
  }
}
</style>
