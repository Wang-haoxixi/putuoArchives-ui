<template>
  <basic-container>
    <content-box :title="title">
      <template v-slot:operations>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button style="margin-left: 10px;" @click="cancel">取消</el-button>
      </template>

      <h3>基本信息</h3>
      <el-form ref="form" :model="formData" :rules="rules">
        <el-form-item label="模板名称" prop="taskListName">
          <el-input v-model="formData.taskListName"></el-input>
        </el-form-item>
        <h3>任务管理</h3>
        <div style="margin: 0 -20px;">
          <el-table :data="formData.taskList" :header-cell-style="{backgroundColor: '#FAFAFA', color: '#333333'}">
            <el-table-column label="子任务" width="70">
              <span style="padding-left: 10px;" slot-scope="scope">{{scope.$index + 1}}</span>
            </el-table-column>
            <el-table-column label="题名" width="250">
              <el-input slot-scope="scope" v-model="scope.row.taskName"></el-input>
            </el-table-column>
            <el-table-column label="题名关键词">
              <template v-slot="scope">
                <tags-input style="width: 100%;" v-model="scope.row.keyword" @input-empty="inputEmpty" @exceed="exceed"></tags-input>
              </template>
            </el-table-column>
            <el-table-column label="材料类型" width="140">
              <el-select slot-scope="scope" v-model="scope.row.materialType" :validate-event="false">
                <el-option v-for="(option, index) in dict.type.task_material_type" :key="index" :value="option.value" :label="option.label">{{option.label}}</el-option>
              </el-select>
            </el-table-column>
            <el-table-column label="关联材料或标准" width="200">
              <template v-slot="scope">
                <HcRemoteSelect :key="scope.row.key" :ref="`material` + scope.$index" :remote-fun="getAllMaterial" v-model="scope.row.fileList" value-key="fileUrl" label-key="fileName" is-object multiple></HcRemoteSelect>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <el-button slot-scope="scope" type="text" @click="removeTask(scope.$index)">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
        <div class="add" @click="addTask">
          <i class="el-icon-plus" style="margin-right: 8px" />
          新增
        </div>
        <el-form-item prop="taskList">
        </el-form-item>
      </el-form>

    </content-box>
  </basic-container>
</template>

<script>
import { addTemplate, updateTemplate, getTemplateDetail } from "@/api/task/template";
import { getMaterials } from "@/api/workbench/index"
import HcCrud from "@/views/components/HcCrud/index"
import ContentBox from "@/views/components/ContentBox/index"
import SearchInput from "@/views/components/SearchInput/index"
import TagsInput from "@/views/components/HcForm/TagsInput/index"
import HcRemoteSelect from "@/views/components/HcForm/HcRemoteSelect/index"
import { mapGetters } from "vuex"
import { v4 as uuid } from "uuid"

export default {
  components: { ContentBox, SearchInput, HcCrud, TagsInput, HcRemoteSelect },
  dicts: ["task_material_type"],
  data() {
    var taskListNameValidator = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error("模板名称不能为空！"))
      }
    }
    var taskListValidator = (rule, value, callback) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].taskName) {
            callback(new Error("子任务题名不能为空！"))
          }
        }
        callback()
      } else {
        callback(new Error("子任务不能为空！"))
      }
    }
    return {
      formData: {
        taskListName: "",
        taskList: []
      },
      rules: {
        taskListName: [
          { validator: taskListNameValidator }
        ],
        taskList: [
          { validator: taskListValidator, trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      "currentWorkbench",
    ]),
    title () {
      return this.$route.query?.id ? "编辑清单模板" : "新增清单模板"
    }
  },
  created () {
    let taskListTemplateId = this.$route.query?.id
    if (taskListTemplateId) {
      getTemplateDetail({taskListTemplateId}).then(({data}) => {
        let taskList = []
        for (let i = 0; i < data.taskTemplateList.length; i++) {
          let fileList = []
          for (let j = 0; j < data.taskTemplateList[i].fileRelationList.length; j++) {
            fileList.push({
              fileUrl: data.taskTemplateList[i].fileRelationList[j].fileUrl,
              fileName: data.taskTemplateList[i].fileRelationList[j].fileName
            })
          }
          taskList.push({
            key: uuid(),
            taskName: data.taskTemplateList[i].taskName,
            keyword: data.taskTemplateList[i].keywordTag ? data.taskTemplateList[i].keywordTag.split(",") : [],
            materialType: data.taskTemplateList[i].materialType,
            fileList
          })
        }
        this.formData = {
          taskListTemplateId: data.taskListTemplateId,
          taskListName: data.taskListName,
          taskList
        }
        this.$nextTick(() => {
          for (let i = 0; i < taskList.length; i++) {
            this.$refs['material' + i].initData(taskList[i].fileList, taskList[i].fileList)
          }
        })
      })
    } else {
      this.formData = {
        taskListName: "",
        taskList: []
      }
    }
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getTemplatePage(params).then(({data}) => {
          resolve({
            records: data.records,
            page: {
              total: data.total
            }
          })
        })
      })
    },
    toSearch (name) {
      this.$refs.hcCrud.refresh({}, {
        name
      })
    },
    inputEmpty () {
      this.$modal.msgWarning('添加的关键词不能为空！')
    },
    exceed () {
      this.$modal.msgWarning('每项子任务最多添加5个关键词！')
    },
    getAllMaterial (fileTitle) {
      return new Promise((resolve, reject) => {
        getMaterials({fileTitle}).then(({data}) => {
          let list = []
          for (let i = 0; i < data.records.length; i++) {
            list.push({
              fileName: data.records[i].fileTitle,
              fileUrl: data.records[i].id
            })
          }
          resolve(list)
        }, () => {
          reject(new Error("数据获取失败！"))
        })
      })
    },
    addTask () {
      this.formData.taskList.push({
        key: uuid()
      })
    },
    removeTask (index) {
      this.formData.taskList.splice(index, 1)
      let taskList = this.formData.taskList
      this.$nextTick(() => {
        for (let i = 0; i < taskList.length; i++) {
          this.$refs['material' + i].initData(taskList[i].fileList, taskList[i].fileList)
        }
      })
    },
    submit () {
      // return
      this.$refs.form.validate(valid => {
        if (valid) {
          const fun =  this.formData.taskListTemplateId ? updateTemplate : addTemplate
          let formData = JSON.parse(JSON.stringify(this.formData))
          let taskList = formData.taskList
          for (let i = 0; i < taskList.length; i++) {
            taskList[i].keywordTag = taskList[i].keyword && taskList[i].keyword.length > 0 ? taskList[i].keyword.join(",") : ""
            delete taskList[i].keyword
          }
          fun(formData).then(res => {
            this.$modal.msgSuccess("保存成功！")
            this.$router.back()
          })
        }
      })
    },
    cancel () {
      this.$router.back()
    },
    getKey (fileList) {
      if (fileList && fileList.length > 0) {
        let key = []
        for (let i = 0; i < fileList.length; i++) {
          key.push(fileList[i].fileUrl)
        }
        return key.join('-')
      } else {
        return ""
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.add {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  text-align: center;
  color: #1492ff;
  border: 1px dashed #dddddd;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
    border-color: #1492ff;
  }
}
</style>

