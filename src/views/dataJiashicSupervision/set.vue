<template>
  <div>
    <basic-container>
      <content-box title="指标设置详情">
        <template v-slot:operations>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button style="margin-left: 10px" @click="cancel">取消</el-button>
        </template>
        <el-form
          label-position="top"
          :model="formData"
          :rules="rules"
          ref="formData"
          class="formData"
        >
          <el-form-item label="指标标识" prop="name">
            <div class="el-form-label-slot" slot="label">
              <span style="margin-right: 4px">指标标识</span>
              <svg-icon
                style="font-size: 20px; color: #333"
                icon-class="icon_beizhu"
              />
            </div>
            <el-input v-model="formData.identification" disabled></el-input>
          </el-form-item>
          <el-form-item label="指标名称" prop="name">
            <div class="el-form-label-slot" slot="label">
              <span style="margin-right: 4px">指标名称</span>
              <svg-icon
                style="font-size: 20px; color: #333"
                icon-class="icon_beizhu"
              />
            </div>
            <el-input v-model="formData.identificationName" disabled></el-input>
          </el-form-item>
          <el-form-item label="所在板块" prop="region">
            <div class="el-form-label-slot" slot="label">
              <span style="margin-right: 4px">所在板块</span>
              <svg-icon
                style="font-size: 20px; color: #333"
                icon-class="icon_beizhu"
              />
            </div>
            <el-select
              disabled
              style="width: 100%"
              v-model="formData.plate"
              placeholder="请选择所在板块"
            >
              <el-option
                v-for="item in dictData"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示顺序" prop="displayOrder">
            <div class="el-form-label-slot" slot="label">
              <span style="margin-right: 4px">显示顺序</span>
              <svg-icon
                style="font-size: 20px; color: #333"
                icon-class="icon_beizhu"
              />
            </div>
            <el-input-number v-model="formData.displayOrder" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="显示角色" prop="region">
            <div class="el-form-label-slot" slot="label">
              <span style="margin-right: 4px">显示角色</span>
              <svg-icon
                style="font-size: 20px; color: #333"
                icon-class="icon_beizhu"
              />
            </div>
            <el-select
              multiple
              style="width: 100%"
              v-model="formData.displayRole"
              placeholder="请选择显示角色"
            >
              <el-option
                v-for="item in listRole"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </content-box>
    </basic-container>
  </div>
</template>

<script>
import ContentBox from "@/views/components/ContentBox/index";
import { getDetail, editCockpit } from "@/api/cockpitManage";
import { listData } from "@/api/system/dict/data";
import { listRole } from "@/api/system/role";
export default {
  components: { ContentBox },
  data() {
    return {
      // 表单数据
      formData: {},
      // 指标ID
      id: undefined,
      // 字典数据
      dictData: [],
      // 字典查询参数
      dictParams: {
        dictType: "cockpit_plate",
      },
      // 角色列表数据
      listRole: [],
      // 表单校验规则
      rules: {},
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetail(this.id);
    this.getDictData();
    this.getListRole();
  },
  methods: {
    /* 根据id查询指标设置详情 */
    getDetail(id) {
      getDetail({ id }).then(({ data }) => {
        data.displayRole = data.displayRole.split(",");
        this.formData = data;
      });
    },
    /** 查询所在版块数据 */
    getDictData() {
      listData(this.dictParams).then(({ rows }) => {
        this.dictData = rows;
      });
    },
    /* 查询角色列表 */
    getListRole() {
      listRole().then(({ rows }) => {
        this.listRole = rows;
      });
    },
    // 保存按钮
    submit() {
      let params = JSON.parse(JSON.stringify(this.formData));
      params.displayRole = params.displayRole.join(",");
      editCockpit(params).then((res) => {
        if(res.code === 200){
          this.$message.success('设置成功')
        }
      });
    },
    // 取消按钮
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.formData {
  width: 33.33%;
  ::v-deep .el-form-item__label {
    display: flex;
    align-items: center;
    height: 34px;
    padding-bottom: 12px;
  }
  .el-form-item {
    padding-top: 20px;
    margin-bottom: 0 !important;
  }
  .el-form-label-slot {
    color: #333;
    display: flex;
    line-height: 22px;
    font-size: 16px;
  }
}
</style>
