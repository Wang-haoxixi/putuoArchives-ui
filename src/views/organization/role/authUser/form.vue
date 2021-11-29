<template>
  <el-dialog
    title="选择用户"
    :visible.sync="dialogVisible"
    width="500px"
    append-to-body
  >
    <el-tree
      v-if="dialogVisible"
      class="tree-border"
      :load="treeLoad"
      ref="dept"
      node-key="id"
      lazy
      empty-text="加载中，请稍后"
      :props="defaultProps"
    >
      <template v-slot="{node, data}">
        <div v-if="data.leaf">
          <el-checkbox :disabled="data.disabled" :label="node.label" @change="userClick(data, $event)"></el-checkbox>
        </div>
        <div v-else>{{node.label}}</div>
      </template>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDeptTree, getDeptUser } from "@/api/system/dept";
import { addRoleUserBatch } from "@/api/system/role"


export default {
  data() {
    return {
      dialogVisible: false,
      deptTree: null,
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "leaf"
      },
      userList: [],
      checkedList: []
    };
  },
  created() {
    getDeptTree().then(({ data }) => {
      this.deptTree = data
    });
  },
  methods: {
    open() {
      this.userList = []
      this.checkedList = []
      this.dialogVisible = true;
    },
    treeLoad (node, resolve) {
      if (node.level === 0) {
        if (this.deptTree) {
          resolve(this.deptTree)
        } else {
          getDeptTree().then(({ data }) => {
            this.deptTree = data
            resolve(data)
          });
        }
      } else {
        let children = node.data.children || []
        if (children.length > 0) {
          resolve(children)
        } else {
          getDeptUser({
            deptId: node.data.id,
            roleId: this.$route.query?.roleId
          }).then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
              children.push({
                label: data[i].nickName,
                id: data[i].userId,
                deptId: data[i].deptId,
                leaf: true,
                disabled: !!data[i].roleId
              })
              if (data[i].roleId) {
                this.checkedList.push({
                  userId: data[i].userId,
                  deptId: data[i].deptId,
                })
              }
            }
            resolve(children)
          })
        }
      }
    },
    userClick (user, isChecked) {
      let userList = this.userList
      if (isChecked) {
        for (let i = 0; i < userList.length; i++) {
          if (user.id == userList[i].userId && user.deptId == userList[i].deptId) {
            return
          }
        }
        this.userList.push({
          userId: user.id,
          deptId: user.deptId,
        })
      } else {
        for (let i = 0; i < userList.length; i++) {
          if (user.id == userList[i].userId && user.deptId == userList[i].deptId) {
            this.userList.splice(i, 1)
            return
          }
        }
      }
    },
    submitForm () {
      let formData = {
        users: this.userList,
        roleId: this.$route.query?.roleId
      }
      addRoleUserBatch(formData).then(({data}) => {
        this.$modal.msgSuccess("添加成功！")
        this.$emit("refresh")
        this.dialogVisible = false
      })
    },
    cancel() {
      this.dialogVisible = false
    }
  },
};
</script>

<style lang="" scoped>
</style>
