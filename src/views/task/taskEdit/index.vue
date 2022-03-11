<template>
  <basic-container>
    <content-box :title="title">
      <template v-slot:operations>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button style="margin-left: 10px" @click="cancel">取消</el-button>
      </template>
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
              >{{ item.label }}
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
            <el-option
              style="height: auto; padding: 0"
              :value="subform.liableObj"
            >
              <el-tree
                :data="liableList"
                @node-click="handleNodeClick"
                :props="defaultProps"
              >
              </el-tree>
            </el-option>
          </el-select>
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
        <el-form-item
          label="协同完善人"
          :label-width="formLabelWidth"
          prop="perfectUserObj"
        >
          <el-select :value="subform.perfectUserObj.label">
            <el-option
              style="height: auto; padding: 0"
              :value="subform.perfectUserObj"
            >
              <el-tree
                :data="liableList"
                @node-click="handlePerfectNodeClick"
                :props="defaultProps"
              >
              </el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </content-box>
  </basic-container>
</template>

<script>
import ContentBox from "@/views/components/ContentBox/index";
import TagsInput from "@/views/components/HcForm/TagsInput";
import {
  getMaterials,
  getLiable,
  getUnit,
  updateTask,
  getTaskDetails,
} from "@/api/workbench/index";
export default {
  components: { ContentBox, TagsInput },
  dicts: ["loop_type", "task_material_type", "task_page_status"],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
      title: "编辑任务",
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
        liableDeptId: "",
        pageStatus: "",
        perfectUserObj: "",
        perfectUserId: "",
        fileList: [],
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
      formLabelWidth: "100px",
      fileOptions: [],
      liableList: [],
      unitOptions: [],
    };
  },
  created() {
    let taskId = this.$route.query?.id;
    getTaskDetails({ taskId }).then((res) => {
      let data = res.data;
      let perfectUserId = data.perfectUserId;
      let perfectUserLabel = data.perfectUserName;
      this.subform = {
        taskId: taskId,
        taskName: data.taskName,
        keywordTagList: data.keywordTagList,
        responsibleDept: data.responsibleDept,
        responsibleDeptList: data.responsibleDeptList,
        formTime: data.formTime,
        liable: data.liable,
        liableObj: { label: data.liableName, value: data.liable },
        materialType: data.materialType,
        startTime: data.startTime,
        endTime: data.endTime,
        liableDeptId: data.liable,
        pageStatus: data.pageStatus,
        perfectUserObj: {
          value: perfectUserId,
          label: perfectUserLabel,
        },
        perfectUserId: data.perfectUserId,
        fileList: data.fileRelationList,
        //saveFlag代表草稿状态
        saveFlag:"1",
      };
    });
    this.remoteMethod();
    this.unitRemote();
    this.getLiable();
  },
  methods: {
    submit() {
      this.$refs["subForm"].validate((valid) => {
        if (valid) {
           let responsibleLabelList = [];
          this.subform.responsibleDeptList.forEach((item) => {
            responsibleLabelList.push(item.label);
          });
          this.subform.responsibleDept = responsibleLabelList.join(",");
          this.subform.liable = this.subform.liableObj.value;
          updateTask(this.subform).then((res) => {
            if (res.code == 200) {
              this.$message.success("保存成功");
              this.$router.back();
            }
          });
        } else {
          this.$message.error("请检查输入内容");
          return false;
        }
      });
    },
    cancel() {
      this.$router.back();
    },
    tagsChange() {
      this.$refs["subForm"].validateField("keywordTagList");
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
    getLiable() {
      getLiable().then((res) => {
        console.log(res);
        this.liableList = res.data;
      });
    },
    handleNodeClick(data, node) {
      if (node.isLeaf) {
        this.subform.liableObj = data;
        this.subform.liableDeptId = node.parent.data.value;
      }
    },
    handlePerfectNodeClick(data, node) {
      if (node.isLeaf) {
        console.log(data);
        this.subform.perfectUserObj = data;
        this.subform.perfectUserId = data.value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.taskForm {
  padding-top: 20px;
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