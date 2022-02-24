<template>
  <div>
    <basic-container>
      <content-box title="新增/编辑专项归集数据">
        <template v-slot:operations>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button style="margin-left: 10px" @click="$router.back()"
            >返回</el-button
          >
        </template>
        <p class="p">专项归集名称：</p>
        <el-input
          class="title-input"
          placeholder="请输入内容"
          :value="$route.query.specialName"
          disabled
        >
        </el-input>
        <p class="p">专项归集数据上传：</p>
        <el-table :data="specialTableData" v-loading="loading" style="width: 100%">
          <el-table-column type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column prop="fileName" label="文件名称"> </el-table-column>
          <el-table-column prop="isUpload" label="是否已上传">
            <template slot-scope="scope">
              {{ scope.row.isUpload == 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column prop="mustUpload" label="是否必传">
            <template slot-scope="scope">
              {{ scope.row.mustUpload == 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="最近更新人">
          </el-table-column>
          <el-table-column prop="updateTime" label="最近更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                @click="handleCheck(scope.row)"
                >查看</el-button
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
import { allFile } from "@/api/cockpitManage";
export default {
  components: { ContentBox },
  data() {
    return {
      loading: true,
      // 专项归集数据表格数据
      specialTableData: [],
    };
  },
  created() {
    this.getAllFile();
  },
  methods: {
    getAllFile() {
      this.loading = true;
      allFile({
        type: 1,
        specialId: this.$route.query.outId,
      }).then(({ data }) => {
        this.specialTableData = data;
        this.loading = false;
      });
    },
    // 查看按钮
    handleCheck(row) {
      this.$router.push({
        path: `/dataJiashicSupervision/fileDetail`,
        query: {
          outId: this.$route.query.outId,
          inId: row.id,
          dict: row.dict,
          fileName: row.fileName,
          title: "专项归集数据文件详情",
        },
      });
    },
    // 保存
    save() {
      const flag = this.specialTableData.every((item) => {
        return item.isUpload == "1";
      });
      if (!flag) {
        return this.$message.warning("表格还有未上传的数据，请确认是否都上传?");
      }
      this.$router.back()
    },
  },
};
</script>

<style lang="scss" scoped>
.title-input {
  width: 300px;
}
</style>
