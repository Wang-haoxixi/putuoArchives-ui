<template>
  <el-dialog
    title="转发消息"
    :visible.sync="dialogVisible"
    width="484px"
    append-to-body
  >
    请选择接收人
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
      <template v-slot="{ node, data }">
        <div v-if="data.leaf">
          <el-checkbox
            :disabled="data.disabled"
            :label="node.label"
            @change="userClick(data, $event)"
          ></el-checkbox>
        </div>
        <div v-else>{{ node.label }}</div>
      </template>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submitForm">发送</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCurrentDeptTree, getDeptUser } from "@/api/system/dept";
import { forwardNotice } from "@/api/system/notice";

export default {
  props: {
    noticeId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialogVisible: false,
      deptTree: null,
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "leaf",
      },
      userList: [],
      checkedList: [],
    };
  },
  created() {
    getCurrentDeptTree().then(({ data }) => {
      this.deptTree = data;
    });
  },
  methods: {
    open() {
      this.userList = [];
      this.checkedList = [];
      this.dialogVisible = true;
    },
    treeLoad(node, resolve) {
      if (node.level === 0) {
        if (this.deptTree) {
          resolve(this.deptTree);
        } else {
          getCurrentDeptTree().then(({ data }) => {
            this.deptTree = data;
            resolve(data);
          });
        }
      } else {
        let children = node.data.children || [];
        if (children.length > 0) {
          resolve(children);
        } else {
          getDeptUser({
            deptId: node.data.id,
            roleId: this.$route.query?.roleId,
          }).then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
              children.push({
                label: data[i].nickName,
                id: data[i].userId,
                deptId: data[i].deptId,
                leaf: true,
                disabled: !!data[i].roleId,
              });
              if (data[i].roleId) {
                this.checkedList.push({
                  userId: data[i].userId,
                  deptId: data[i].deptId,
                });
              }
            }
            resolve(children);
          });
        }
      }
    },
    userClick(user, isChecked) {
      let userList = this.userList;
      if (isChecked) {
        for (let i = 0; i < userList.length; i++) {
          if (
            user.id == userList[i].userId &&
            user.deptId == userList[i].deptId
          ) {
            return;
          }
        }
        this.userList.push({
          userId: user.id,
          deptId: user.deptId,
        });
      } else {
        for (let i = 0; i < userList.length; i++) {
          if (
            user.id == userList[i].userId &&
            user.deptId == userList[i].deptId
          ) {
            this.userList.splice(i, 1);
            return;
          }
        }
      }
    },
    submitForm() {
      let formData = {
        users: this.userList,
        roleId: this.noticeId,
      };
      forwardNotice(formData).then(({ data }) => {
        if (data.code === 200) {
          this.$modal.msgSuccess("转发成功！");
          this.$emit("refresh");
          this.dialogVisible = false;
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 4px;
  border: 1px solid #eeeeee;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #333333;
  &:hover {
    color: #1492ff;
  }
}
::v-deep .el-dialog__header {
  padding: 16px 24px 12px !important;
  border-bottom: 1px solid #eeeeee;
}
::v-deep .el-dialog__headerbtn {
  font-size: 20px;
  top: 20px;
  right: 24px;
  // width:20px;
  // height:20px;
}
::v-deep .el-dialog__footer {
  padding: 6px 24px 18px;
}
.el-dialog__title {
  font-weight: 500;
  line-height: 28px;
  color: #333333;
}
</style>
