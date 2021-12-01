<template>
  <basic-container>
    <content-box title="立档单位管理">
      <template v-slot:operations>
        <el-button style="margin-left: 10px;" type="primary" @click="toRecords">变更记录</el-button>
      </template>
      <hc-crud ref="hcCrud" :option="tableOption" :searchQuery="searchQuery" :fetchListFun="fetchListFun" :before-open="beforeOpen" :updateFun="updateFun">
        <template v-slot:qzhNumberForm="scope">
          <div>
            <div v-for="(item, index) in scope.formData.qzhList" :key="index" class="qzh-item">
              <el-input class="input" v-model="scope.formData.qzhList[index]"></el-input>
              <el-button class="icon" icon="el-icon-minus" circle size="mini" @click="removeQzh(scope.formData.qzhList,index)"></el-button>
            </div>
            <el-button @click="addQzh(scope.formData.qzhList)" size="mini">增加全宗号</el-button>
          </div>
        </template>
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import { getDeptPage, updateQzh } from "@/api/system/dept"
import HcCrud from "@/views/components/HcCrud/index"
import ContentBox from "@/views/components/ContentBox/index"

export default {
  components: { ContentBox, HcCrud },
  dicts: ["sys_dept_status"],
  data() {
    return {

    };
  },
  computed: {
    searchQuery () {
      return [
        {
          label: "状态",
          prop: "status",
          type: "select",
          dicData: this.dict.type.sys_dept_status
        },
        {
          label: "立档单位名称",
          prop: "deptName",
        },
        {
          label: "全宗号",
          prop: "qzhNumber"
        }
      ]
    },
    tableOption () {
      return {
        indexLabel: "序号",
        labelPosition: "top",
        columns: [
          {
            label: "立档单位名称",
            prop: "deptName",
            editDisabled: true,
          },
          {
            label: "全宗号",
            prop: "qzhNumber",
            formSlot: true,
          },
          {
            label: "状态",
            prop: "status",
            type: "select",
            formHidden: true,
            dicData: this.dict.type.sys_dept_status
          },
          {
            label: "最后修改时间",
            prop: "updateTime",
            formHidden: true
          },
          {
            label: "最后修改人",
            prop: "userName",
            formHidden: true
          }
        ],
        menu: [
          "edit"
        ],
        menuWidth: 60
      }
    }
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getDeptPage(params).then(({data}) => {
          resolve({
            records: data.records,
            page: {
              total: data.total
            }
          })
        })
      })
    },
    toRecords (row) {
      this.$router.push({
        path: "/organization/ministry/records"
      })
    },
    beforeOpen (next, data, type) {
      let { deptId, deptName, qzhNumber } = data
      let qzhList = ['']
      if (qzhNumber) {
        qzhList = qzhNumber.split(',')
      }
      next({
        deptId,
        deptName,
        qzhList
      })
    },
    updateFun (data, next) {

      updateQzh({
        deptId: data.deptId,
        deptName: data.deptName,
        qzhNumber: data.qzhList.join(',')
      }).then(({data}) => {
        this.$modal.msgSuccess('修改成功！')
        next()
      })
    },
    addQzh (list) {
      list.push("")
    },
    removeQzh (list, index) {
      list.splice(index, 1)
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
.qzh-item {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  .input {
    flex: 100px 1 1;
  }
  .icon {
    flex: 30px 0 0;
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }
}
</style>
