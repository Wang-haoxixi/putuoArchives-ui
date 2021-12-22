<template>
  <div class="container">
    <div class="title">制发任务清单</div>
    <div class="form">
      <div class="form-title">基本信息</div>
      <el-form ref="form" :model="form" label-position="top" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="清单名称" prop="taskListName">
              <div class="el-form-label-slot" slot="label">
                <span style="margin-right: 4px">清单名称</span>
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
            <el-form-item label="归档周期" prop="nextLoopType">
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
                @change="nextLoopTypeChange"
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
            <el-form-item label="循环次数" prop="nextLoopNum">
              <div class="el-form-label-slot" slot="label">
                <div style="margin-right: 4px">循环次数</div>
              </div>
              <el-input
                :disabled="form.nextLoopType == 1"
                v-model.number="form.nextLoopNum"
                placeholder="请输入循环次数"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="任务开始日期" prop="startTime">
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
                value-format="yyyy-MM-dd"
                placeholder="请选择任务开始日期"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务截止日期" prop="">
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
                value-format="yyyy-MM-dd"
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
      <el-table :data="form.taskList" style="width: 100%">
        <el-table-column prop="index" label="子任务">
          <template slot-scope="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="题名"></el-table-column>
        <el-table-column prop="keywordTagList" label="题名关键词">
        </el-table-column>
        <el-table-column prop="materialType" label="材料类型">
          <template slot-scope="scope">
            <div>
              {{
                selectDictLabel(
                  dict.type.task_material_type,
                  scope.row.materialType
                )
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="responsibleDeptList" label="责任者">
          <template slot-scope="scope">
            <div
              v-for="item in scope.row.responsibleDeptList"
              :key="item.value"
            >
              {{ item.label }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="formTime" label="形成时间"> </el-table-column>
        <el-table-column prop="liableObj" label="归集档案员">
          <template slot-scope="scope">
            <div>
              {{ scope.row.liableObj.label }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="截止时间"> </el-table-column>
        <el-table-column prop="fileList" label="关联材料">
          <template slot-scope="scope">
            <div v-for="item in scope.row.fileList" :key="item.value">
              {{ item.fileName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="fun" label="操作"> </el-table-column>
      </el-table>
      <div class="add" @click="dialogFormVisible = true">
        <i class="el-icon-plus" style="margin-right: 8px" />
        新增任务
      </div>
    </div>
    <el-dialog title="新增/编辑任务" :visible.sync="dialogFormVisible">
      <el-form
        :model="subform"
        class="taskForm"
        ref="subForm"
        :rules="subformRules"
      >
        <el-form-item
          label="题名"
          :label-width="formLabelWidth"
          prop="taskName"
        >
          <el-input
            v-model="subform.taskName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="题名关键词"
          :label-width="formLabelWidth"
          prop="keywordTagList"
        >
          <tags-input
            :autocomplete="true"
            v-model="subform.keywordTagList"
            style="width: 600px"
            @change="tagsChange"
          ></tags-input>
        </el-form-item>
        <el-form-item
          label="责任者"
          :label-width="formLabelWidth"
          prop="responsibleDeptList"
        >
          <el-select
            v-model="subform.responsibleDeptList"
            filterable
            remote
            multiple
            value-key="value"
            reserve-keyword
            placeholder="请选择责任者"
            :remote-method="unitRemote"
            :loading="unitLoading"
          >
            <el-option
              v-for="item in unitOptions"
              :key="item.unitId"
              :label="item.unitName"
              :value="{ label: item.unitName, value: item.unitId }"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="形成时间"
          :label-width="formLabelWidth"
          prop="formTime"
        >
          <el-date-picker
            v-model="subform.formTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="归集档案员"
          :label-width="formLabelWidth"
          prop="liableObj"
        >
          <el-select :value="subform.liableObj.label">
            <el-option style="height: auto;padding: 0" :value="subform.liableObj">
              <el-tree
                :data="liableList"
                @node-click="handleNodeClick"
                :props="defaultProps"
              >
              </el-tree>
            </el-option>
          </el-select>
          <!-- <el-select
            v-model="subform.liableObj"
            filterable
            remote
            value-key="value"
            reserve-keyword
            placeholder="请选择归集档案员"
            :remote-method="liableRemote"
            :loading="liableLoading"
          >
            <el-option-group
              v-for="group in liableOptions"
              :key="group.value"
              :label="group.label"
            >
              <el-option
                v-for="item in group.children"
                :key="item.value"
                :label="item.label"
                :value="{ label: item.nickName, value: item.userId }"
              >
              </el-option>
            </el-option-group>
          </el-select> -->
        </el-form-item>
        <el-form-item
          label="材料类型"
          :label-width="formLabelWidth"
          prop="materialType"
        >
          <el-select
            v-model="subform.materialType"
            placeholder="请选择材料类型"
          >
            <el-option
              v-for="dict in dict.type.task_material_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="开始时间"
          :label-width="formLabelWidth"
          prop="startTime"
        >
          <el-date-picker
            v-model="subform.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="截止时间"
          :label-width="formLabelWidth"
          prop="endTime"
        >
          <el-date-picker
            v-model="subform.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="关联材料"
          :label-width="formLabelWidth"
          prop="fileList"
        >
          <el-select
            v-model="subform.fileList"
            filterable
            remote
            multiple
            value-key="fileUrl"
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="fileLoading"
          >
            <el-option
              v-for="item in fileOptions"
              :key="item.id"
              :label="item.fileTitle"
              :value="{ fileName: item.fileTitle, fileUrl: item.id }"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubForm()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="请选择协同完善人"
      :visible.sync="collaborateDialogVisible"
      width="30%"
    >
      <el-tree
        :data="liableList"
        :props="defaultProps"
        @node-click="handleCollaborateNodeClick"
      ></el-tree>
    </el-dialog>
    <div class="bottom-button">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit(1)">保存草稿</el-button>
      <el-button type="primary" @click="collaborate">协同完善任务</el-button>
      <el-button type="primary" @click="submit(3)">发布任务</el-button>
    </div>
  </div>
</template>

<script>
import TagsInput from "@/views/components/HcForm/TagsInput";
import {
  createTask,
  getMaterials,
  getLiable,
  getUnit,
  taskListCreate,
} from "@/api/workbench/index";
export default {
  components: { TagsInput },
  dicts: ["loop_type", "task_material_type"],
  data() {
    return {
      form: {
        taskListName: "",
        nextLoopType: "",
        nextLoopNum: "",
        saveFlag: "",
        startTime: "",
        endTime: "",
        perfectUserId: "",
        taskList: [],
      },
      subform: {
        taskName: "",
        keywordTagList: [],
        responsibleDept: "",
        responsibleDeptList: [],
        formTime: "",
        liable: "",
        liableObj: "",
        materialType: "",
        startTime: "",
        endTime: "",
        state: "",
        fileList: [],
      },
      fileOptions: [],
      liableList: [],
      unitOptions: [],
      formLabelWidth: "100px",
      dialogFormVisible: false,
      tableData: [],
      keywordTagListOptions: [],
      fileLoading: false,
      unitLoading: false,
      collaborateDialogVisible: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      closeTree: false,
      rules: {
        taskListName: [
          { required: true, message: "请输入清单名称", trigger: "blur" },
        ],
        nextLoopType: [
          { required: true, message: "请选择归档周期", trigger: "change" },
        ],
        nextLoopNum: [
          { required: true, message: "请输入循环次数", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "请输入大于0的整数",
            trigger: "change",
          },
        ],
        startTime: [
          { required: true, message: "请选择任务开始日期", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择任务截止日期", trigger: "change" },
        ],
      },
      subformRules: {
        taskName: [{ required: true, message: "请输入题名", trigger: "blur" }],
        keywordTagList: [
          { required: true, message: "请输入题名关键词", trigger: "blur" },
        ],
        responsibleDeptList: [
          { required: true, message: "请选择责任者", trigger: "change" },
        ],
        formTime: [
          { required: true, message: "请选择形成时间", trigger: "change" },
        ],
        liableObj: [
          { required: true, message: "请选择档案", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择开始日期", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择截止日期", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.remoteMethod();
    this.unitRemote();
    this.getLiable();
  },
  methods: {
    getLiable() {
      getLiable().then((res) => {
        console.log(res)
        this.liableList = res.data;
      });
    },
    handleCollaborateNodeClick(data, node) {
      if (node.isLeaf) {
        this.collaborateDialogVisible = false;
        this.form.perfectUserId = data.value;
        this.submit(4)
      }
    },
    handleNodeClick(data, node) {
      if (node.isLeaf) {
        this.subform.liableObj = data;
      }
    },
    cancel() {
      this.$router.back();
    },
    draft() {
      this.$router.back();
    },
    collaborate() {
      this.collaborateDialogVisible = true;
    },
    tagsChange() {
      this.$refs["subForm"].validateField("keywordTagList");
    },
    submit(saveFlag) {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.saveFlag = saveFlag;
          taskListCreate(this.form).then((res) => {
            if (res.code === 200) {
              this.$message.success("成功");
              this.$router.back();
            }
          });
        } else {
          this.$message.error("请检查输入内容");
          return false;
        }
      });
    },
    addSubForm() {
      this.$refs["subForm"].validate((valid) => {
        if (valid) {
          let responsibleLabelList = [];
          this.subform.responsibleDeptList.forEach((item) => {
            responsibleLabelList.push(item.label);
          });
          this.subform.responsibleDept = responsibleLabelList.join(",");
          this.subform.liable = this.subform.liableObj.value;
          console.log(this.subform);
          this.form.taskList.push(this.subform);
        } else {
          this.$message.error("请检查输入内容");
          return false;
        }
      });
    },
    nextLoopTypeChange(e) {
      if (e == 1) {
        this.form.nextLoopNum = 1;
      }
    },
    unitRemote(query) {
      this.unitLoading = true;
      getUnit({ unitName: query }).then((res) => {
        this.unitLoading = false;
        this.unitOptions = res.data;
      });
    },
    remoteMethod(query) {
      this.fileLoading = true;
      getMaterials({ fileTitle: query }).then((res) => {
        this.fileLoading = false;
        this.fileOptions = res.data.records;
      });
    },
    createTask() {
      createTask();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 64px;
}
.bottom-button {
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  right: 0;
  bottom: 0;
  text-align: right;
  height: 64px;
  padding: 10px 20px;
}
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
    display: flex;
    align-items: center;
    height: 34px;
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
.taskForm {
  ::v-deep .el-form-item__label {
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    color: #333333;
  }
  ::v-deep .el-form-item__content {
    padding-left: 16px;
    .el-input {
      width: 600px;
    }
  }
}
</style>
