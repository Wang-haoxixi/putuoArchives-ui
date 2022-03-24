<template>
  <basic-container>
    <content-box title="归档队伍管理">
      <template v-slot:operations>
        <search-input @search="toSearch"></search-input>
        <el-button style="margin-left: 10px;" type="primary" @click="dialogCreate = true">新增队伍</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="toRecords">变更记录</el-button>
      </template>
      <div class="content">
        <div class="dept-tree">
          <el-tree
            ref="dept"
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
            <template v-slot:roles="scope">
              <template v-if="scope.row.roles && scope.row.roles.length > 1">
                <el-tooltip :content="getRoles(scope.row.roles)" placement="top">
                  <span>{{scope.row.roles[0].roleName}}（{{scope.row.roles.length}}）</span>
                </el-tooltip>
              </template>
              <template v-else-if="scope.row.roles && scope.row.roles.length == 1">
                {{scope.row.roles[0].roleName}}
              </template>
            </template>
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

    <!-- 新增队伍对话框 -->
    <el-dialog
      title="新增队伍"
      :visible.sync="dialogCreate"
      @open= "openDialogCreate"
      @close="closeDialogCreate"
      width="30%">
      <el-form :model="createForm">
        <el-form-item label="选择用户" prop="">
          <el-select v-model="createForm.selectObj.label" placeholder="请选择归集档案员">
            <el-option :value="createForm.selectObj"  style="height: 100%; padding: 0">
              <el-tree
                :data="data"
                :props="defaultCreateProps"
                @node-click="handleNodeClick"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="createForm.roles" placeholder="请选择角色">
            <el-option v-for="(item, index) in roleList" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCreate = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getUserPage, updateUserRole } from "@/api/system/user"
import { getDeptTree, getNewDeptTree } from "@/api/system/dept";
import { getRoleList, deleteUser } from "@/api/system/role"
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

      dialogCreate: false, // 新增队伍对话框状态
      createForm: { // 新增请求参数
        selectObj: "",
        deptId: "",
        userId: "",
        roles: "",
      },
      data: [], // 用户数据
      defaultCreateProps: { // 配置选项
        children: "children",
        label: "label",
      },
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
            label: "任职类型",
            prop: "jobAttributes"
          },
          {
            label: "职务",
            prop: "govEmpPosJob"
          },
          {
            label: "角色",
            prop: "roles",
            slot: true,
            width: 150
          }
        ],
        menu: [
          {
            label: "管理角色",
            permissions: ["team:role"],
            fun: (row) => {
              this.dialogVisible = true
              this.handleUser = row
              let roleSelect = []
              for (let i = 0; i < row.roles.length; i++) {
                roleSelect.push(row.roles[i].roleId)
              }
              this.roleSelect = roleSelect
            }
          },
          {
            label: "删除",
            permissions: ["team:role"],
            fun: (row) => {
              this.deleteUser(row);
            }
          }
        ],
        menuWidth: 120,
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
    getNewDeptTree(){
      // 新增队伍用户树
      getNewDeptTree().then(({ data }) => {
        this.data = data;
      })
    },
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getUserPage({
          ...params,
          haveRole: true, // 过滤掉没有角色的数据
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
    // 节点被点击时的回调
    handleNodeClick(data, node){
      if(node.isLeaf){ // 找到用户的节点
        this.createForm.selectObj = data;
        this.createForm.deptId = node.parent.data.value; // 取到用户对应的部门ID
        this.createForm.userId = data.value; // 取到用户ID
      }
    },
    // 新增确定按钮
    submit(){
      let requestData = {
        deptId: this.createForm.deptId,
        userId: this.createForm.userId,
        roles: this.createForm.roles.split(),
      }
      if( !this.createForm.deptId || !this.createForm.userId ) return this.$message.error("请选择用户");
      if( !this.createForm.roles ) return this.$message.error("请选择角色");
      updateUserRole(requestData).then(({ code })=>{
        if(code == 200){
          this.$message.success("新增成功");
          this.dialogCreate = false;
          this.createForm.selectObj = "";
          this.createForm.deptId = "";
          this.createForm.roles = "";
          this.$refs.hcCrud.refresh();
        }
      })
    },
    openDialogCreate(){
      this.getNewDeptTree();
    },
    // 关闭对话框时触发
    closeDialogCreate(){
      this.createForm.selectObj = "";
      this.createForm.deptId = "";
      this.createForm.roles = "";
    },
    // 删除：将用户移出归档队伍列表
    deleteUser (data) {
      deleteUser({
        userId: data.userId,
        deptId: data.deptId,
      }).then(({ code }) => {
        if(code == 200){
          this.$message.success("删除成功");
          this.getNewDeptTree();
          this.$refs.hcCrud.refresh();
        }
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
    },
    getRoles (roles) {
      let content = []
      for (let i = 0; i < roles.length; i++) {
        content.push(roles[i].roleName)
      }
      return content.join(",")
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
