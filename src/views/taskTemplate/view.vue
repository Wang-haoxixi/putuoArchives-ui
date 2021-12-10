<template>
  <basic-container>
    <content-box title="清单模板详情">
      <template v-slot:operations>
        <el-button style="margin-left: 10px;" @click="goBack">返回</el-button>
      </template>
      <h3>基本信息</h3>
      <el-form >
        <el-form-item label="模板名称" prop="taskListName">
          <span style="font-size: 18px;">
            {{formData.taskListName}}
          </span>
        </el-form-item>
        <h3>任务管理</h3>
        <div style="margin: 0 -20px;">
          <el-table :data="formData.taskList" :header-cell-style="{backgroundColor: '#FAFAFA', color: '#333333'}">
            <el-table-column label="子任务" width="70">
              <span style="padding-left: 10px;" slot-scope="scope">{{scope.$index + 1}}</span>
            </el-table-column>
            <el-table-column label="题名" width="250">
              <template v-slot="scope">
                {{scope.row.taskName}}
              </template>
            </el-table-column>
            <el-table-column label="题名关键词">
              <template v-slot="scope">
                <el-tag v-for="(item, index) in scope.row.keyword" :key="index">{{item}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="材料类型" width="140">
              <template v-slot="scope">
                {{scope.row.materialTypeName}}
              </template>
            </el-table-column>
            <el-table-column label="关联材料或标准" width="200">
              <template v-slot="scope">
                {{scope.row.fileList.join(",")}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </content-box>
  </basic-container>
</template>

<script>
import { getTemplateDetail } from "@/api/task/template";
import HcCrud from "@/views/components/HcCrud/index"
import ContentBox from "@/views/components/ContentBox/index"

export default {
  components: { ContentBox, HcCrud },
  data() {
    return {
      formData: {
        taskListName: "",
        taskList: []
      }
    };
  },
  created () {
    let taskListTemplateId = this.$route.query?.id
    if (taskListTemplateId) {
      getTemplateDetail({taskListTemplateId}).then(({data}) => {
        let taskList = []
        for (let i = 0; i < data.taskTemplateList.length; i++) {
          let fileList = []
          for (let j = 0; j < data.taskTemplateList[i].fileRelationList.length; j++) {
            fileList.push(data.taskTemplateList[i].fileRelationList[j].fileName)
          }
          taskList.push({
            taskName: data.taskTemplateList[i].taskName,
            keyword: data.taskTemplateList[i].keywordTag ? data.taskTemplateList[i].keywordTag.split(",") : [],
            materialTypeName: data.taskTemplateList[i].materialTypeName,
            fileList
          })
        }
        this.formData = {
          taskListTemplateId: data.taskListTemplateId,
          taskListName: data.taskListName,
          taskList
        }
      })
    } else {
      this.formData = {
        taskListName: "",
        taskList: []
      }
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

