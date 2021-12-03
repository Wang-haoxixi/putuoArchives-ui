<template>
  <div>
    <div class="title">制发任务清单</div>
    <div class="form">
      <div class="form-title">基本信息</div>
      <el-form ref="form" :model="form" label-position="top">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="清单名称">
              <div class="el-form-label-slot" slot="label">
                <div style="margin-right: 4px">清单名称</div>
                <svg-icon
                  style="font-size: 20px; color: #333"
                  icon-class="icon_beizhu"
                />
              </div>
              <el-input
                v-model="form.taskListName"
                placeholder="请输入清单名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归档周期">
              <div class="el-form-label-slot" slot="label">
                <div style="margin-right: 4px">归档周期</div>
                <svg-icon
                  style="font-size: 20px; color: #333"
                  icon-class="icon_beizhu"
                />
              </div>
              <el-select
                v-model="form.nextLoopType"
                placeholder="请选择归档周期"
                style="width: 100%"
              >
                <el-option
                  v-for="dict in dict.type.loop_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="循环次数">
              <div class="el-form-label-slot" slot="label">
                <div style="margin-right: 4px">循环次数</div>
              </div>
              <el-input
                v-model="form.nextLoopNum"
                placeholder="请输入循环次数"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="任务开始日期">
              <div class="el-form-label-slot" slot="label">
                <div style="margin-right: 4px">任务开始日期</div>
                <svg-icon
                  style="font-size: 20px; color: #333"
                  icon-class="icon_beizhu"
                />
              </div>
              <el-date-picker
                v-model="form.startTime"
                type="date"
                placeholder="请选择任务开始日期"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务截止日期">
              <div class="el-form-label-slot" slot="label">
                <div style="margin-right: 4px">任务截止日期</div>
                <svg-icon
                  style="font-size: 20px; color: #333"
                  icon-class="icon_beizhu"
                />
              </div>
              <el-date-picker
                v-model="form.endTime"
                type="date"
                placeholder="请选择任务截止日期"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <div class="table-title">
        <div class="table-title-text">子任务管理</div>
        <el-button type="">从模板选择</el-button>
        <el-button style="margin-left: 12px" type="primary"
          >将本清单添加为模版</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="index" label="子任务"></el-table-column>
        <el-table-column prop="subjectName" label="题名"></el-table-column>
        <el-table-column prop="keywordTag" label="题名关键词">
        </el-table-column>
        <el-table-column prop="materialType" label="材料类型">
        </el-table-column>
        <el-table-column prop="responsibleDept" label="责任者">
        </el-table-column>
        <el-table-column prop="formationTime" label="形成时间">
        </el-table-column>
        <el-table-column prop="liable" label="归集档案员"> </el-table-column>
        <el-table-column prop="endTime" label="截止时间"> </el-table-column>
        <el-table-column prop="fileList" label="关联材料"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="fun" label="操作"> </el-table-column>
      </el-table>
      <div class="add" @click="dialogFormVisible = true">
        <i class="el-icon-plus" style="margin-right: 8px" />
        新增任务
      </div>
    </div>
    <el-dialog title="新增/编辑任务" :visible.sync="dialogFormVisible">
      <el-form :model="subform">
        <el-form-item label="题名" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="subform.subjectName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
            @blur="newTag"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="题名关键词" :label-width="formLabelWidth">
          <el-select
            v-model="subform.keywordTag"
            multiple
            filterable
            allow-create
            default-first-option
            clearable
            placeholder="请输入题名关键词"
          >
            <el-option
              v-for="item in keywordTagOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="subform.keywordTag" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="责任者" :label-width="formLabelWidth">
          <el-select
            v-model="subform.responsibleDept"
            placeholder="选择活动区域"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="形成时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="subform.formationTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="归集档案员" :label-width="formLabelWidth">
          <el-select v-model="subform.liable" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="材料类型" :label-width="formLabelWidth">
          <el-select
            v-model="subform.materialType"
            placeholder="请选择活动区域"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="subform.startTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="subform.endTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关联材料" :label-width="formLabelWidth">
          <el-select
            v-model="subform.fileList"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="fileLoading"
          >
            <el-option
              v-for="item in fileOptions"
              :key="item.id"
              :label="item.fileTitle"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createTask, keywordLike, getMaterials } from "@/api/workbench/index";
export default {
  dicts: ["loop_type"],
  data() {
    return {
      form: {
        name: "",
      },
      subform: {
        subjectName: "",
        keywordTag: "",
        responsibleDept: "",
        formationTime: "",
        liable: "",
        materialType: "",
        startTime: "",
        endTime: "",
        fileList: [],
      },
      fileOptions: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      tableData: [],
      keywordTagOptions: [],
      fileLoading: false,
    };
  },
  created() {
    getMaterials().then((res) => {
      this.fileOptions = res.data.records;
    });
    // createTask();
    // console.log(this.dict.type.loop_type)
  },
  methods: {
    remoteMethod(query) {
      this.fileLoading = true;
      getMaterials({ fileTitle: query }).then((res) => {
        this.fileLoading = false;
        this.fileOptions = res.data.records;
      });
    },
    newTag(e) {
      this.keywordTagOptions = [];
      this.keywordTagOptions.push(e.target.value);
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryString, cb) {
      console.log(queryString, cb);
      keywordLike({ name: queryString }).then((res) => {
        let array = [];
        res.data.forEach((item) => {
          array.push({ value: item });
        });
        cb(array);
      });
    },
    createTask() {
      createTask();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 16px 20px;
  font-size: 24px;
  font-weight: 500;
  line-height: 33px;
}
.form {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 20px 20px 32px;
  .form-title {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    color: #333333;
  }
  ::v-deep .el-form-item__label {
    padding-bottom: 12px;
  }
  .el-form-item {
    padding-top: 20px;
    margin-bottom: 0 !important;
  }
  .el-form-label-slot {
    color: #333;
    display: flex;
    line-height: 22px;
    font-size: 16px;
  }
}
.table {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0 0 20px;
}
.add {
  width: calc(100% - 40px);
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  text-align: center;
  color: #1492ff;
  border: 1px dashed #dddddd;
  margin: 20px 20px 0;
  &:hover {
    cursor: pointer;
    border-color: #1492ff;
  }
}
.table-title {
  display: flex;
  align-items: center;
  height: 68px;
  line-height: 68px;
  padding: 0 20px;
  font-size: 20px;
  color: #333333;
  font-weight: 500;
  line-height: 28px;
  .table-title-text {
    padding-right: 16px;
  }
}
</style>
