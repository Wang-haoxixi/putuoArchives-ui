<template>
  <div>
    <basic-container>
      <content-box :title="title">
        <div style="margin: 20px -20px 0">
          <el-table :data="tableData" v-loading="loading" :header-cell-style="{backgroundColor: '#FAFAFA', color: '#333333'}">
            <el-table-column
              prop="orderNum"
              label="序号" width="100px">
            </el-table-column>
            <el-table-column
              prop="unitQzh"
              label="全宗号">
            </el-table-column>
            <el-table-column
              prop="unitName"
              label="单位名称">
            </el-table-column>
          </el-table>
        </div>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.current"
          :limit.sync="queryParams.size"
          @pagination="getTableData"
        />
      </content-box>
    </basic-container>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index";
import ContentBox from "@/views/components/ContentBox/index";
export default {
  components: { ContentBox, Pagination },
  data() {
    return {
      title: "档案室情况详情页", // 标题
      tableData:[ //表格数据
        {
          orderNum: '1',
          unitQzh: 'J001',
          unitName: '普陀区档案馆'
        },
        {
          orderNum: '1',
          unitQzh: 'J001',
          unitName: '普陀区档案馆'
        },
        {
          orderNum: '1',
          unitQzh: 'J001',
          unitName: '普陀区档案馆'
        },
      ],
      loading: false, // 显示加载
      total: 0,
      queryParams: {
        current: 1,
        size: 10,
      },
    };
  },
  created(){

  },
  methods: {
    // 获取表格数据
    getTableData(){},
  }
};
</script>

<style lang="scss" scoped>
.search-warp{
  display: flex;
  float: right;
}
.pagination-container{
  margin-top: 0px;
  padding: 30px 20px !important;
}
</style>
