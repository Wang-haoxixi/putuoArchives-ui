<template>
  <div>
    <basic-container>
      <content-box :title="$route.query.title">
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
          <el-button
            type="primary"
            class="btn-item"
            @click="fileUpload"
            :loading="btnLoading"
            >文件上传</el-button
          >
          <el-button
            type="primary"
            class="btn-item"
            @click="downloadTemplate"
            :loading="btnLoading"
            >下载模板</el-button
          >
          <el-button
            type="primary"
            class="btn-item"
            @click="exportData"
            :loading="btnLoading"
            >导出数据</el-button
          >
        </el-row>
        <el-table :data="tableData" v-loading="loading" style="width: 100%">
          <el-table-column
            v-for="(item, index) in columnsData"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
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
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.current"
          :limit.sync="queryParams.size"
          @pagination="getFileContent"
        />
        <!-- 文件详情编辑弹框 -->
        <el-dialog title="编辑" :visible.sync="editDV" width="30%">
          <div>
            <el-form
              :model="editForm"
              :rules="editRules"
              ref="editFormRef"
              label-width="120px"
            >
              <el-form-item
                :label="item.label"
                :prop="item.prop"
                v-for="(item, index) in columnsData.slice(1)"
                :key="index"
              >
                <div v-for="(item2, key, index2) in editForm" :key="index2">
                  <el-input
                    v-if="key === item.prop"
                    v-model="editForm[key]"
                    :placeholder="'请输入' + item.label"
                  ></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="editDV = false">取消</el-button>
          </span>
        </el-dialog>
      </content-box>
    </basic-container>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import ContentBox from "@/views/components/ContentBox/index";
import {
  fileContent,
  downloadTemplate,
  fileUpload,
  exportData,
  delFile,
  updateFileContent,
} from "@/api/cockpitManage";
import { columns } from "./column";
import { downLoadBlob, selectFile } from "@/utils/file";
export default {
  components: { ContentBox, Pagination },
  data() {
    return {
      // 按钮是否可点击
      btnLoading: false,
      // 加载层
      loading: true,
      // 表格数据
      tableData: [],
      // 文件名称
      fileName: this.$route.query.fileName,
      // 请求表格参数
      queryParams: {
        enums: this.$route.query.dict,
        specialId: this.$route.query.outId,
        size: 10,
        current: 1,
      },
      // Page total
      total: 0,
      // 表格数据项
      columnsData: {},
      // 文件详情编辑弹框控制器
      editDV: false,
      // 编辑表单
      editForm: {},
      // 编辑表单校验
      editRules: {
        // name: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
      },
    };
  },
  created() {
    console.log(this.$route.query);
    // 遍历对象获取到对应的表格数据
    for (const key in columns) {
      if (key === this.$route.query.dict) {
        this.columnsData = columns[key];
      }
    }
    this.getFileContent();
  },
  methods: {
    /* 分页查询文件内容 */
    getFileContent() {
      this.loading = true;
      fileContent(this.queryParams).then(({ data }) => {
        this.tableData = data.records;
        this.total = data.total;
        this.loading = false;
      });
    },
    // 文件上传
    fileUpload() {
      let params = this.$route.query;
      selectFile().then((fileList) => {
        this.btnLoading = true;
        fileUpload({
          cockpitDictId: this.$route.query.outId,
          specialId: this.$route.query.outId,
          enums: params.dict,
          file: fileList[0],
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success("文件上传成功！");
            this.getFileContent();
          }
          this.btnLoading = false;
        });
      });
    },
    // 下载模板
    downloadTemplate() {
      downloadTemplate(this.$route.query.dict).then(({ data, headers }) => {
        let disposition = headers["content-disposition"];
        let fileName = decodeURIComponent(disposition.split("fileName=")[1]);
        downLoadBlob(data, fileName);
      });
    },
    // 导出数据
    exportData() {
      exportData(this.$route.query.dict).then(({ data, headers }) => {
        let disposition = headers["content-disposition"];
        let fileName = decodeURIComponent(disposition.split("fileName=")[1]);
        downLoadBlob(data, fileName);
      });
    },
    // 编辑按钮
    handleEdit(row) {
      console.log("edit..", row);
      console.log("column..", this.columnsData);
      this.editDV = true;
      this.editForm = JSON.parse(JSON.stringify(row));
    },
    // 删除按钮
    handleDelete({ id }) {
      delFile({
        id,
        enums: this.$route.query.dict,
      }).then((res) => {
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.getFileContent();
        }
      });
    },
    // 保存
    save() {
      this.editForm.enums = this.$route.query.dict;
      updateFileContent(this.editForm).then((res) => {
        console.log("updateFileContent..", res);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.editDV = false;
          this.getFileContent();
        }
      });
    },
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
