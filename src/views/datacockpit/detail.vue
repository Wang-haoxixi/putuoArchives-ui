<template>
  <div>
    <basic-container>
      <content-box :title="labelVal">
        <div class="warp">
          <div class="search-row">
            <el-row class="search" :gutter="20">
              <el-col :span="10"><el-input v-model="queryParams.unitName" placeholder="请输入单位名称进行检索" style="width:100%"></el-input></el-col>
              <el-col :span="10">
                <el-select v-model="queryParams[$route.query.fileType]" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4"><el-button type="primary" @click="search">搜索</el-button></el-col>
            </el-row>
          </div>
        </div>
        <div style="margin: 0 -20px">
          <el-table :data="tableData" v-loading="loading" :header-cell-style="{backgroundColor: '#FAFAFA', color: '#333333'}">
            <el-table-column
              prop="orderNum"
              label="序号" width="50px">
            </el-table-column>
            <el-table-column
              prop="unitQzh"
              label="全宗号">
            </el-table-column>
            <el-table-column
              prop="unitName"
              label="单位名称">
            </el-table-column>
            <el-table-column
              :prop="$route.query.fileType"
              :label="labelVal">
            </el-table-column>
          </el-table>
        </div>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.current"
          :limit.sync="queryParams.size"
          @pagination="fileContent"
        />
      </content-box>
    </basic-container>
  </div>
</template>

<script>
import { fileContent } from "@/api/cockpitManage";
import Pagination from "@/components/Pagination/index";
import ContentBox from "@/views/components/ContentBox/index";
import { columns } from "./workCol";
export default {
  components: { ContentBox, Pagination },
  data() {
    return {
      // 加载层
      loading: true,
      // 下拉框
      options: [],
      // 下拉框值
      value: undefined,
      // 请求表格参数
      queryParams: {
        // enums: this.$route.query.enums,
        enums: "",
        [this.$route.query.fileType]: '',
        unitName: '',
        size: 10,
        current: 1,
      },
      // 表格数据
      tableData: [],
      // 表格项label
      labelVal: '',
      // 表格总数
      total: 0,
    };
  },
  created(){
    for (const key in columns) {
      if(key == this.$route.query.archivesRoom){
        this.options = columns[key].selectsOpt; // 下拉搜索数据项
        this.labelVal = columns[key].name; // 标题
        this.queryParams.isType = this.$route.query.archivesRoom;
        this.queryParams.enums = "COCKPIT_DATA_DBQK";
      }
      if(key === this.$route.query.fileType){
        this.options = columns[key].selectsOpt; // 下拉搜索数据项
        this.labelVal = columns[key].name; // 标题
        this.queryParams.enums = this.$route.query.enums;
      }
    }
    this.fileContent()
  },
  methods: {
    fileContent(){
      this.loading = true;
      fileContent(this.queryParams).then(({ data })=>{
        this.tableData = data.records;
        this.total = data.total;
        this.loading = false;
      } )
    },
    // 搜索
    search(){
      this.fileContent()
    }
  }
};
</script>

<style lang="scss" scoped>
.warp {
  margin-bottom: 20px;
  .search-row{
    display: flex;
    justify-content: right;
    .search {
      width: 50%;
    }
  }
}
.pagination-container{
  margin-top: 0px;
  padding: 30px 20px !important;
}
</style>
