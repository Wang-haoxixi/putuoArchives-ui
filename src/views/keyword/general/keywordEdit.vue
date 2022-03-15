<template>
  <basic-container>
    <content-box title="新增/更新关键词">
      <template v-slot:operations>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button style="margin-left: 10px;" @click="cancel">取消</el-button>
      </template>
      <template>
        <el-form ref="form" :model="formData" :rules="rules" style="margin-top: 20px;" label-position="top">
          <el-form-item label="关键词名称：" prop="name">
            <el-input v-model="formData.name" style="width: 600px;" maxlength="50" placeholder="请输入文件标题"></el-input>
          </el-form-item>
          <el-form-item label="关键词类型：" prop="type">
            <el-radio-group v-model="formData.keyType" @change="changeRadio">
              <el-radio :label="1">中心词<tip style="margin-left: 4px" content="指最标准最具代表性的关键词"></tip></el-radio>
              <el-radio :label="2">近义词<tip style="margin-left: 4px" content="指与中心词具有相近意思的关键词"></tip></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formData.keyType == 2" label="所属中心关键词：" prop="parent">
            <hc-remote-select ref="parent" v-model="formData.parent" :remote-fun="getAllParent"></hc-remote-select>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </content-box>
  </basic-container>
</template>

<script>
import { getKeywordDetail, addKeyword, updateKeyword, getKeywordParent } from "@/api/keyword/general"
import ContentBox from "@/views/components/ContentBox/index"
import HcRemoteSelect from "@/views/components/HcForm/HcRemoteSelect/index"

export default {
  components: { ContentBox, HcRemoteSelect },
  data() {
    return {
      formData: {
        name: "",
        keyType: "",
      },
      rules: {
      }
    };
  },
  computed: {
    library () {
      return this.$route.query.library
    },
  },
  created () {
    let id = this.$route.query?.id
    if (id) {
      getKeywordDetail({id}).then(({data}) => {
        this.formData = {
          id: data.id,
          name: data.name,
          keyType: data.keyType,
          status: data.status,
          parent: data.parent,
          // parentName: data.parentName
        }
        if (data.keyType == 2) {
          this.$nextTick(() => {
            this.$refs.parent.initData(data.parent, [{
              label: data.parentName,
              value: data.parent
            }])
          })
        } else {
          this.formData.parent = ""
        }
      })
    } else {
      this.formData = {
        library: this.$route.query.library
      }
    }
  },
  methods: {
    getAllParent (name) {
      return new Promise((resolve, reject) => {
        getKeywordParent({
          name,
          library: this.$route.query.library,
          parentId: this.$route.query.id
        }).then(({data}) => {
          let list = []
          for (let i = 0; i < data.length; i++) {
            list.push({
              label: data[i].name,
              value: data[i].id
            })
          }
          resolve(list)
        }, () => {
          reject(new Error("数据获取失败！"))
        })
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(this.formData.keyType == 2 && this.formData.parent == ""){
            return this.$message.error("关键词类型不能为空")
          }
          const fun =  this.formData.id ? updateKeyword : addKeyword
          // delete this.formData.parentName
          fun(this.formData).then(res => {
            this.$modal.msgSuccess("保存成功！")
            this.$router.back()
          })
        }
      })
    },
    cancel () {
      this.$router.back()
    },
    changeRadio(){
      this.formData.parent = ""
      // if (this.formData.keyType == 2) {
      //   this.$nextTick(() => {
      //     this.$refs.parent.initData(this.formData.parent, [{
      //       label: this.formData.parentName,
      //       value: this.formData.parent
      //     }])
      //   })
      // }
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

