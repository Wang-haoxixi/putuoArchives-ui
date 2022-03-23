<template>
  <basic-container>
    <content-box title="立档单位管理">
      <template v-slot:operations>
        <el-button type="primary" @click="toCreate">新增立档单位</el-button>
        <el-button style="margin-left: 10px;" type="primary" @click="toRecords">变更记录</el-button>
      </template>
      <hc-crud ref="hcCrud" :option="tableOption" :searchQuery="searchQuery" :fetchListFun="fetchListFun" :before-open="beforeOpen" :updateFun="updateFun">
        <template v-slot:qzhNumberForm="scope">
          <div>
            <div v-for="(item, index) in scope.formData.qzhList" :key="index" class="qzh-item">
              <el-input class="input" v-model="scope.formData.qzhList[index]"></el-input>
              <el-button class="icon" icon="el-icon-minus" circle size="mini" @click="removeQzh(scope.formData.qzhList,index)"></el-button>
            </div>
            <el-button @click="addQzh(scope.formData.qzhList)" size="mini">+ 增加全宗号</el-button>
            <div class="unit-type-box" v-for="item in unitTypes" :key="item.value">
              <template v-if="item.value == 'unit_type_a'">
                <el-checkbox v-model="scope.formData.unitTypeA">{{ item.label }}</el-checkbox>
              </template>
              <template v-if="item.value == 'unit_type_b'">
                <el-checkbox v-model="scope.formData.unitTypeB">{{ item.label }}</el-checkbox>
              </template>
              <template v-if="item.value == 'unit_type_c'">
                <el-checkbox v-model="scope.formData.unitTypeC">{{ item.label }}</el-checkbox>
              </template>
              <template v-if="item.value == 'unit_type_d'">
                <el-checkbox v-model="scope.formData.unitTypeD">{{ item.label }}</el-checkbox>
              </template>
            </div>
          </div>
        </template>
      </hc-crud>
      <el-dialog title="新 增" :visible.sync="dialogAddVisible">
        <el-form :model="addForm" label-position="top">
          <el-form-item label="选择单位：">
            <el-select v-model="addForm.deptId" placeholder="请选择单位" filterable @change="changeUnit">
              <el-option v-for="(item, index) in unitOpts" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位全宗号：" class="qzh-form-item">
            <div class="inp-minus" v-for="(item, index) in addForm.qzhNumber" :key="index">
              <el-input v-model="addForm.qzhNumber[index]"></el-input>
              <el-button class="icon" icon="el-icon-minus" circle size="mini" @click="deleteQzh(index)"></el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-button size="mini" @click="createQzh" :disabled="disableFlag">+ 增加全宗号</el-button>
        <div class="unit-type-box" v-for="item in unitTypes" :key="item.value">
          <template v-if="item.value == 'unit_type_a'">
            <el-checkbox v-model="addForm.unitTypeA" :disabled="disableFlag">{{ item.label }}</el-checkbox>
          </template>
          <template v-if="item.value == 'unit_type_b'">
            <el-checkbox v-model="addForm.unitTypeB" :disabled="disableFlag">{{ item.label }}</el-checkbox>
          </template>
          <template v-if="item.value == 'unit_type_c'">
            <el-checkbox v-model="addForm.unitTypeC" :disabled="disableFlag">{{ item.label }}</el-checkbox>
          </template>
          <template v-if="item.value == 'unit_type_d'">
            <el-checkbox v-model="addForm.unitTypeD" :disabled="disableFlag">{{ item.label }}</el-checkbox>
          </template>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save" :loading="saveLoading">保 存</el-button>
          <el-button @click="dialogAddVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </content-box>
  </basic-container>
</template>

<script>
import { getDeptPage, updateQzh, notFilingUnits } from "@/api/system/dept"
import HcCrud from "@/views/components/HcCrud/index"
import ContentBox from "@/views/components/ContentBox/index"

export default {
  components: { ContentBox, HcCrud },
  dicts: ["sys_dept_status", "unit_type"],
  data() {
    return {
      dialogAddVisible: false,
      // 控制屏蔽
      disableFlag: true,
      // 保存按钮加载
      saveLoading: false,
      // 选中的单位ID
      deptId: "",
      // 新增表单
      addForm: {},
      // 非立档单位数据
      unitOpts: [],
    };
  },
  created(){ this.getNotFilingUnits(); },
  watch: {
    // 侦听addForm
    addForm(val){
      if(val){
        this.disableFlag = false; // 当addForm的值发生变更时，将内容变为可输入
      }
    }
  },
  computed: {
    unitTypes() {
      return this.dict.type.unit_type
    },
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
    toCreate(){ this.dialogAddVisible = true; this.getNotFilingUnits() },
    // 获取非立档单位数据
    getNotFilingUnits(){
      notFilingUnits().then(res => {
        res.data.forEach(item => {
          if(item.qzhNumber){
            item.qzhNumber = item.qzhNumber.split(",");
          } else {
            item.qzhNumber = [];
          }
        })
        this.unitOpts = res.data;
      })
    },
    // 单位变更时触发
    changeUnit(data){
      this.unitOpts.forEach(element => {
        if(element.deptId == data){
          this.addForm = JSON.parse(JSON.stringify(element));
        }
      });
    },
    // 新增立档单位-新增全宗号
    createQzh(){ this.addForm.qzhNumber.push(""); },
    // 删除全宗号
    deleteQzh(index){
      this.addForm.qzhNumber.splice(index, 1);
    },
    // 保存
    save(){
      this.saveLoading = true;
      let form = JSON.parse(JSON.stringify(this.addForm));
      if(!form.deptId) {
        this.saveLoading = false;
        this.$message.error("请选择单位");
        return
      }
      form.qzhNumber = form.qzhNumber.join(",");
      let { deptId, deptName, qzhNumber, unitTypeA, unitTypeB, unitTypeC, unitTypeD } = form
      updateQzh({
        deptId, deptName, qzhNumber, unitTypeA, unitTypeB, unitTypeC, unitTypeD
      }).then(res => {
        if(res.code == 200){
          this.$message.success("新增成功");
          this.disableFlag = true;
          this.saveLoading = false;
          this.dialogAddVisible = false;
          this.$refs.hcCrud.refresh();

          this.addForm.deptId= ""
          this.addForm.qzhNumber= []
          this.addForm.unitTypeA= false
          this.addForm.unitTypeB= false
          this.addForm.unitTypeC= false
          this.addForm.unitTypeD= false
        }
      }).catch(()=>{
        this.saveLoading = false;
      })
    },
    fetchListFun (params) {
      params.unitTypeA = true; // 表格只展示属于立档单位的数据
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
      let { deptId, deptName, qzhNumber,unitTypeA, unitTypeB, unitTypeC, unitTypeD } = data
      let qzhList = ['']
      if (qzhNumber) {
        qzhList = qzhNumber.split(',')
      }
      next({
        deptId,
        deptName,
        qzhList,
        unitTypeA,
        unitTypeB,
        unitTypeC,
        unitTypeD
      })
    },
    updateFun (data, next) {
      updateQzh({
        // deptId: data.deptId,
        // deptName: data.deptName,
        ...data,
        qzhNumber: data.qzhList.join(','),
      }).then(({data}) => {
        this.$modal.msgSuccess('修改成功！');
        this.getNotFilingUnits();
        next();
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
.unit-type-box{
  margin-top: 10px;
  line-height: 40px;
}
.qzh-form-item{
  margin-bottom: 0;
  .inp-minus{
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .el-button{
      width: 30px;
      height: 30px;
      margin-left: 20px;
    }
  }
}
</style>
