<template>
  <basic-container>
    <content-box :title="title">
      <template v-slot:operations>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button style="margin-left: 10px;" @click="cancel">取消</el-button>
      </template>
      <template>
        <el-form ref="form" :model="formData" :rules="rules" style="margin-top: 20px;" label-position="top">
          <el-form-item label="文件标题：" prop="fileTitle">
            <el-input v-model="formData.fileTitle" style="width: 600px;" maxlength="50" placeholder="请输入文件标题"></el-input>
          </el-form-item>
          <el-form-item label="上传文件：" prop="fileId">
            <FileUpload ref="file" v-model="formData.fileId" single @change="fileChange">
              <el-button slot="trigger" type="primary" size="mini">立即上传</el-button>
              <template v-slot:uploadItem="scope">
                <div class="file-item">
                  <div class="file-info">
                    <div class="file-name">{{scope.file.name}}</div>
                    <div v-if="scope.file.progress || scope.file.uploadSuccess" class="progress">
                      <template v-if="scope.file.uploadSuccess">
                        <el-progress class="progress-bar" status="success" style="" :percentage="100" :show-text="false"></el-progress>
                        <span class="progress-text success">上传成功</span>
                      </template>
                      <template v-else>
                        <el-progress class="progress-bar" color="#15BE50" :percentage="scope.file.progress" :show-text="false"></el-progress>
                        <span class="progress-text">{{scope.file.progress}}%</span>
                      </template>
                    </div>

                  </div>
                  <div class="file-operations">
                    <el-button type="text" @click="scope.functions.removeFile(scope.index)">删除</el-button>
                  </div>
                </div>
              </template>
            </FileUpload>
          </el-form-item>
        </el-form>
      </template>
    </content-box>
  </basic-container>
</template>

<script>
import { getTrainDetail, addTrain, updateTrain } from "@/api/train/index"
import ContentBox from "@/views/components/ContentBox/index"
import FileUpload from "@/views/components/HcFileUpload/index"

export default {
  name: "TrainingEdit",
  components: { ContentBox, FileUpload },
  dicts: ["sys_oper_type", "sys_common_status"],
  data() {
    var titleValidator = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error("文件标题不能为空！"))
      }
    }
    var fileValidator = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error("文件不能为空！"))
      }
    }
    return {
      formData: {
        fileTitle: "",
        fileId: "",
      },
      rules: {
        fileTitle: [
          { validator: titleValidator }
        ],
        fileId: [
          { validator: fileValidator, trigger: "change" }
        ]
      }
    };
  },
  computed: {
    title () {
      return this.$route.query?.id ? "更新培训文件" : "新增培训文件"
    }
  },
  created () {
    let id = this.$route.query?.id
    console.log(id)
    if (id) {
      getTrainDetail({id}).then(({data}) => {
        this.formData = {
          id: data.id,
          fileTitle: data.fileTitle,
          fileId: data.fileId
        }
        this.$refs.file.initData({
          name: data.original,
          fileId: data.fileId
        })
      })
    }
  },
  methods: {
    fileChange () {
      this.$refs.form.validateField("fileId")
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const fun =  this.formData.id ? updateTrain : addTrain
          fun(this.formData).then(res => {
            this.$modal.msgSuccess("保存成功！")
            this.$router.back()
          })
        }
      })
    },
    cancel () {
      this.$router.back()
    }
  },
};
</script>

<style lang="scss" scoped>
.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  width: 600px;
  height: 66px;
  background-color: #F7F8FA;
  .file-info {
    flex: 100px 1 1;
    .file-name {
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      color: #333;
    }
    .progress {
      margin-top: 2px;
      height: 16px;
      display: flex;
      align-items: center;
      .progress-bar {
        flex: 285px 0 0;
      }
      .progress-text {
        margin-left: 16px;
        font-size: 12px;
        &.success {
          color: #15BE50;
        }
      }
    }
  }
  .file-operations {
    flex: 100px 0 0;
    text-align: right;
  }
}
</style>

