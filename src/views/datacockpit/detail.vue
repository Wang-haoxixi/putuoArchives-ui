<template>
  <div>
    <basic-container>
      <content-box title="档案室达标数占比详情">
        <div class="warp">
          <div class="search-row">
            <el-row class="search" :gutter="20">
              <el-col :span="12"><el-input placeholder="请输入单位名称进行检索"></el-input></el-col>
              <el-col :span="12">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-table :data="tableData">
          <el-table-column
            prop="orderNum"
            label="序号">
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
            prop="isStandard"
            :label="labelVal">
          </el-table-column>
        </el-table>
      </content-box>
    </basic-container>
  </div>
</template>

<script>
import { fileContent } from "@/api/cockpitManage";
import ContentBox from "@/views/components/ContentBox/index";
import { columns } from "./col";
export default {
  components: { ContentBox },
  data() {
    return {
      // 下拉框
      options: [],
      // 下拉框值
      value: undefined,
      // 请求表格参数
      queryParams: {
        enums: this.$route.query.enums,
        [this.$route.query.fileType]: '',
        size: 10,
        current: 1,
      },
      // 表格数据
      tableData: [],
      // 表格情况
      labelVal: ''
    };
  },
  created(){
    console.log(this.queryParams)
    this.fileContent()
    for (const key in columns) {
      if(key === this.$route.query.fileType){
        this.options = columns[key].selectsOpt;
        this.labelVal = columns[key].name;
      }
    }
  },
  methods: {
    fileContent(){
      fileContent(this.queryParams).then(({ data })=>{
        console.log('data..', data)
        this.tableData = data.records;
      } )
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
</style>
