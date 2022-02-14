<template>
  <div>
    <basic-container>
      <content-box title="统计数据文件详情">
        <p class="p">文件名称：</p>
        <el-input
          class="title-input"
          placeholder="请输入内容"
          v-model="fileName"
          disabled
        >
        </el-input>
        <p class="p">数据内容：</p>
        <el-row>
          <el-button type="primary" class="btn-item" @click="fileUpload">文件上传</el-button>
          <el-button type="primary" class="btn-item" @click="downloadTemplate">下载模板</el-button>
          <el-button type="primary" class="btn-item">导出数据</el-button>
        </el-row>
        <el-table :data="tableData" v-loading="loading" style="width: 100%">
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column v-for="(item,index) in columnsData" :key="index" :prop="item.prop" :label="item.label"> </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button size="small" type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="text"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </content-box>
    </basic-container>
  </div>
</template>

<script>
import ContentBox from "@/views/components/ContentBox/index";
import { fileContent, downloadTemplate } from "@/api/cockpitManage";
import { columns } from "./column"
import { downLoadBlob, selectFile } from "@/utils/file"
export default {
  components: { ContentBox },
  data() {
    return {
      // 加载层
      loading: true,
      // 表格数据
      tableData: [],
      // 文件名称
      fileName: this.$route.query.fileName,
      // 请求表格参数
      queryParams: {
        enums: this.$route.query.dict,
        size: 10,
        current: 1,
      },
      // 表格数据项
      columnsData: {},
    };
  },
  created() {
    console.log(this.$route.query)
    // 遍历对象获取到对应的表格数据
    for (const key in columns) {
      if(key === this.$route.query.dict){
        this.columnsData = columns[key]
      }
    }
    this.getFileContent()
  },
  methods: {
    /* 分页查询文件内容 */
    getFileContent() {
      this.loading = true;
      fileContent(this.queryParams).then(({data}) => {
        this.tableData = data.records
        this.loading = false;
      });
    },
    // 下载模板
    downloadTemplate(){
      downloadTemplate(this.$route.query.dict).then(({data, headers})=>{
        console.log(data)
        console.log(headers)
        let disposition = headers['content-disposition']
        let fileName = decodeURIComponent(disposition.split("fileName=")[1])
        downLoadBlob(data, fileName)
      })
    },
    // 文件上传
    fileUpload(){
      selectFile().then(fileList=>{
        console.log('fileList..', fileList)

      })
    }
  },
};
</script>

<style lang="scss" scoped>
.title-input {
  width: 300px;
}
.btn-item {
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
