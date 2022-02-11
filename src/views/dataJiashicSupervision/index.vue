<template>
  <div>
    <basic-container>
      <content-box title="数据驾驶舱管理">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <!-- 角色展示内容与顺序设置 -->
          <el-tab-pane label="角色展示内容与顺序设置" name="first">
            <el-table v-loading="loading" :data="tableData" style="width: 100%">
              <el-table-column prop="identification" label="指标标识">
              </el-table-column>
              <el-table-column prop="identificationName" label="指标名称">
              </el-table-column>
              <el-table-column prop="identificationRemark" label="指标说明">
              </el-table-column>
              <el-table-column prop="plateName" label="所在板块">
              </el-table-column>
              <el-table-column prop="displayOrder" label="显示顺序">
              </el-table-column>
              <el-table-column prop="displayRoleName" label="显示角色">
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
                    @click="handleSet(scope.row)"
                    >设置</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="queryParams.current"
              :limit.sync="queryParams.size"
              @pagination="getList"
            />
          </el-tab-pane>
          <!-- 数据内容设置与管理 -->
          <el-tab-pane label="数据内容设置与管理" name="second">
            <p class="p">统计数据上传：</p>
            <el-form
              label-position="left"
              label-width="140px"
              ref="formData"
              class="formData"
            >
              <el-form-item label="纳入监管单位总数">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="建成档案室总数">
                <el-input></el-input>
              </el-form-item>
            </el-form>
            <p class="p">统计数据文件上传：</p>
            <el-table :data="fileData" style="width: 100%">
              <el-table-column type="index" width="50" label="序号">
              </el-table-column>
              <el-table-column prop="date" label="文件名称"> </el-table-column>
              <el-table-column prop="date" label="是否已上传">
              </el-table-column>
              <el-table-column prop="date" label="是否必传"> </el-table-column>
              <el-table-column prop="date" label="最近更新人">
              </el-table-column>
              <el-table-column prop="date" label="最近更新时间">
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
            <p class="p">专项归集数据上传：</p>
            <el-button type="primary" @click="createData"
              >新建专项归集数据</el-button
            >
            <el-table :data="fileData" style="width: 100%">
              <el-table-column type="index" width="50" label="序号">
              </el-table-column>
              <el-table-column prop="date" label="专项归集名称">
              </el-table-column>
              <el-table-column prop="date" label="最近更新人">
              </el-table-column>
              <el-table-column prop="date" label="最近更新时间">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="text"
                    @click="handleEdit(scope.row)"
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
              v-show="total2 > 0"
              :total2="total2"
              :page.sync="queryParams.current"
              :limit.sync="queryParams.size"
              @pagination="getList"
            />
          </el-tab-pane>
        </el-tabs>
      </content-box>
    </basic-container>
  </div>
</template>

<script>
import ContentBox from "@/views/components/ContentBox/index";
import Pagination from "@/components/Pagination/index";
import { getList } from "@/api/cockpitManage";
import { listData } from "@/api/system/dict/data";
export default {
  components: { ContentBox, Pagination },
  data() {
    return {
      // 加载层
      loading: true,
      // 默认第一项显示
      activeName: "first",
      // 角色表格数据
      tableData: [],
      // 文件列表
      fileData: [],
      // 角色查询参数
      queryParams: {
        current: 1,
        size: 10,
      },
      // 字典查询参数
      dictParams: {
        dictType: "cockpit_plate",
      },
      // 角色总条数
      total: 0,
      // 字典数据
      dictData: [],
      // 专项总数据
      total2: 0,
    };
  },
  computed: {},
  created() {
    this.getDictData();
    this.getList();
  },
  methods: {
    // tab切换按钮
    tabClick(tab, event) {
      console.log(tab.name);
    },
    /* 查询分页角色展示内容 */
    getList() {
      this.loading = true;
      getList(this.queryParams).then((res) => {
        // 重置数据
        res.data.records.forEach((item1) => {
          this.dictData.forEach((item2) => {
            if (item1 && item1.plate == item2.dictValue) {
              item1.plateName = item2.dictLabel;
            }
          });
        });
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 角色设置
    handleSet(row) {
      console.log(row);
      this.$router.push({
        path: "/dataJiashicSupervision/set/?id=" + row.id,
      });
    },
    /** 查询所在版块数据 */
    getDictData() {
      listData(this.dictParams).then(({ rows }) => {
        this.dictData = rows;
      });
    },
    // 查看按钮
    handleCheck() {},
    // 新建专项归集数据
    createData() {},
    // 编辑按钮
    handleEdit() {},
    // 删除按钮
    handleDelete() {},
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav-wrap::after {
  background-color: transparent;
}
.p {
  margin-bottom: 20px;
}
.formData {
  width: 30%;
}
</style>
