<template>
  <div>
    <basic-container>
      <content-box title="数据驾驶舱管理">
        <div class="tabs-box">
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <!-- 角色展示内容与顺序设置 -->
            <el-tab-pane label="角色展示内容与顺序设置" name="first">
              <el-table v-loading="loading" :data="tableData" style="width: 100%" :header-cell-style="{backgroundColor: '#FAFAFA', color: '#333333'}">
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
                  <el-input-number v-model.trim="absorbAndBuildup.nrjgNum" :min='1' @change="absorb"></el-input-number>
                </el-form-item>
                <el-form-item label="建成档案室总数">
                  <el-input-number v-model.trim="absorbAndBuildup.jcdaNum" :min='1' @change="buildup"></el-input-number>
                </el-form-item>
              </el-form>
              <p class="p">统计数据文件上传：</p>
              <el-table :data="statisticsTableData" v-loading="statisticsLoading" style="width: 100%" :header-cell-style="{backgroundColor: '#FAFAFA', color: '#333333'}">
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
              <p class="p">专项归集数据上传：</p>
              <el-button @click="specialDV = true" type="primary" icon="el-icon-plus" style="margin-bottom:20px;margin-left:20px">新建专项归集数据</el-button>
              <el-table :data="specialTableData" v-loading="specialLoading" style="width: 100%" :header-cell-style="{backgroundColor: '#FAFAFA', color: '#333333'}">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column label="专项归集名称">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.specialName" @change='handleName(scope.row)' placeholder="专项归集名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="updateUserName" label="最近更新人">
                </el-table-column>
                <el-table-column prop="updateTime" label="最近更新时间">
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
                :total="total2"
                :page.sync="specialQueryParams.current"
                :limit.sync="specialQueryParams.size"
                @pagination="getSpecialData"
              />
              <!-- 新建专项归集数据弹框 -->
              <el-dialog
                title="新建专项归集数据"
                :visible.sync="specialDV"
                width="30%">
                <div>
                  <el-form :model="createForm" :rules="createRules" ref="createForm" label-width="120px">
                    <el-form-item label="专项归集名称" prop="specialName">
                      <el-input v-model="createForm.specialName" placeholder="专项归集名称"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="save">保存</el-button>
                  <el-button type="primary" @click="specialDV = false">取消</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </content-box>
    </basic-container>
  </div>
</template>

<script>
let currentFlag = 'first'; // 缓存当前tab
import ContentBox from "@/views/components/ContentBox/index";
import Pagination from "@/components/Pagination/index";
import { getList, allFile, specialCollection, specialPro, specialDel, absorbAndBuildup, updateAbsorbAndBuildup } from "@/api/cockpitManage";
import { listData } from "@/api/system/dict/data";
export default {
  components: { ContentBox, Pagination },
  data() {
    return {
      // 加载层
      loading: true,
      statisticsLoading: true,
      specialLoading: true,
      // 默认第一项显示
      activeName: "first",
      // 角色表格数据
      tableData: [],
      // 角色查询参数
      queryParams: {
        current: 1,
        size: 10,
      },
      // 专项表格参数
      specialQueryParams: {
        current: 1,
        size: 10,
      },
      // 字典查询参数
      dictParams: {
        dictType: "cockpit_plate",
      },
      // 统计字典参数
      dictStatisticsParams: {
        dictType: "statistical_data_upload",
      },
      // 角色总条数
      total: 0,
      // 字典数据
      dictData: [],
      // 专项总数据
      total2: 0,
      // 计数器参数
      absorbAndBuildup: {
        // 纳入监管单位数据
        absorbData: 1,
        // 建成档案室数据
        buildupData: 1,
      },
      // 统计数据文件表格数据
      statisticsTableData: [],
      // 专项归集表格数据
      specialTableData: [],
      // 新建专项弹框规则
      specialDV: false,
      // 专项归集form
      createForm: {
        specialName: '',
      },
      createRules: {
        specialName: [
          { required: true, message: '请输入专项归集名称', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {},
  created() {
    this.activeName = currentFlag;
    this.getDictData();
    this.getList();
    this.getAllFile();
    this.getSpecialData();
    this.getAbsorbAndBuildup()
  },
  methods: {
    // tab切换按钮
    tabClick({ name }, event) {
      currentFlag = name;
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
      this.$router.push({ path: "/dataJiashicSupervision/set/?id=" + row.id });
    },
    /** 查询所在版块数据 */
    getDictData() {
      listData(this.dictParams).then(({ rows }) => { this.dictData = rows; });
    },
    /** 查询统计数据 */
    getAbsorbAndBuildup(){
      absorbAndBuildup().then(({ data })=>{
        this.absorbAndBuildup= data
      })
    },

    // 查看按钮
    handleCheck(row) {
      this.$router.push({
        path: `/dataJiashicSupervision/fileDetail`,
        query: {
          outId: row.id,
          dict: row.dict,
          fileName: row.fileName,
          title: '统计数据文件详情'
        }
      })
    },
    // 新建专项归集数据
    createData() {},
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/dataJiashicSupervision/specialCollection`,
        query: {
          outId: row.id,
          specialName: row.specialName
        }
      })
    },
    // 删除按钮
    handleDelete({ id }) {
      specialDel(id).then(res=>{
        if(res.code === 200){
          this.$message.success('删除成功')
          this.getSpecialData()
        }
      })
    },
    /* 修改统计数据上传数据 */
    updateAbsorbAndBuildup(data) {
      updateAbsorbAndBuildup(data).then((res) => {});
    },
    // 纳入监管单位总数设置
    absorb() {
      if(this.absorbAndBuildup.nrjgNum==undefined){ return this.$message.warning('纳入监管单位总数不能为空') }
      this.updateAbsorbAndBuildup(this.absorbAndBuildup);
    },
    // 建成档案室总数设置
    buildup() {
      if(this.absorbAndBuildup.jcdaNum==undefined){ return this.$message.warning('建成档案室总数不能为空') }
      this.updateAbsorbAndBuildup(this.absorbAndBuildup);
    },
    // 查询统计数据文件
    getAllFile(){
      this.statisticsLoading = true;
      allFile({ type: 0 }).then(({ data })=>{
        this.statisticsTableData = data
        this.statisticsLoading = false;
      })
    },
    // 查询专项归集数据
    getSpecialData(){
      this.specialLoading = true;
      specialCollection(this.specialQueryParams).then(({ data })=>{
        this.specialTableData = data.records;
        this.total2 = data.total;
        this.specialLoading = false;
      })
    },
    // 改变专项归集名称
    handleName({ specialName, id }){
      let params = { specialName,id }
      specialPro(params).then(res=>{
        if(res.code === 200){ this.$message.success('修改成功') }
      })
    },
    // 保存按钮
    save(){
      specialPro({ specialName: this.createForm.specialName }).then(res=>{
        if(res.code === 200){
          this.$message.success('新建成功')
          this.$refs.createForm.resetFields();
          this.getSpecialData()
          this.specialDV = false
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.tabs-box{
  .p{
    padding-left: 20px;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
  .formData {
    width: 30%;
    padding-left: 20px;
  }
  .pagination-container{
    margin-top: 0px;
    margin-right: 20px;
    padding: 30px 20px !important;
  }
  ::v-deep.el-tabs__content{
    margin: 0 -20px;
  }
}
</style>
