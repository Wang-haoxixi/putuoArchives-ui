<template>
  <el-dialog
    title="分配数据权限"
    :visible.sync="dialogVisible"
    width="500px"
    append-to-body
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" :disabled="true" />
      </el-form-item>
      <el-form-item prop="identity">
        <span slot="label">
          角色身份
        </span>
        <el-select v-model="form.identity" placeholder="请选择角色身份" disabled>
          <el-option
            v-for="(item, index) in this.identitys"
            :key="index"
            :value="item.identity"
            :label="item.name"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="权限范围">
        <el-select v-model="form.dataScope" @change="dataScopeSelectChange">
          <el-option
            v-for="item in dataScopeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据权限" v-show="form.dataScope == 2">
        <el-checkbox
          v-model="deptNodeAll"
          @change="handleCheckedTreeNodeAll($event, 'dept')"
          >全选/全不选</el-checkbox
        >
        <el-tree
          class="tree-border"
          :data="deptOptions"
          show-checkbox
          default-expand-all
          ref="dept"
          node-key="id"
          :check-strictly="!form.deptCheckStrictly"
          empty-text="加载中，请稍后"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { dataScope, getIdentityList } from "@/api/system/role";
import { treeselect as deptTreeselect } from "@/api/system/dept";
const initForm = {
  roleId: undefined,
  roleName: undefined,
  identity: undefined,
  roleSort: 0,
  status: "0",
  menuIds: [],
  deptIds: [],
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: undefined,
};
export default {
  dicts: ["sys_normal_disable"],
  data() {
    return {
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      form: {},
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        identity: [
          { required: true, message: "角色身份不能为空", trigger: "blur" },
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" },
        ],
      },
      deptNodeAll: false,
      deptOptions: [],
      identitys: [],
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定数据权限"
        },
        {
          value: "3",
          label: "单位数据权限"
        },
        {
          value: "4",
          label: "科室数据权限"
        },
        {
          value: "5",
          label: "仅本人数据权限"
        }
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    open(form = initForm, checkedKeys = [], isEdit = false) {
      if (this.$refs.dept != undefined) {
        this.$refs.dept.setCheckedKeys([]);
      }
      this.resetForm("form");
      this.form = form;
      this.isEdit = isEdit;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.dept.setCheckedKeys(checkedKeys);
      })
    },
    init() {
      getIdentityList().then(({ data }) => {
        this.identitys = data;
      });
      deptTreeselect().then(({ data }) => {
        this.deptOptions = data;
      });
    },
    handleCheckedTreeNodeAll(value, type) {
      this.$refs.dept.setCheckedNodes(value ? this.deptOptions : []);
    },
    getDeptAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.dept.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.dept.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    dataScopeSelectChange(value) {
      if(value !== '2') {
        this.$refs.dept.setCheckedKeys([]);
      }
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getCheckedKeys();
      // 业务需要注释掉半选节点
      // 半选中的部门节点
      // let halfCheckedKeys = this.$refs.dept.getHalfCheckedKeys();
      // checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    submitForm() {
      if (this.form.roleId != undefined) {
        this.form.deptIds = this.getDeptAllCheckedKeys();
        dataScope(this.form).then(response => {
          this.$modal.msgSuccess("修改成功");
          this.$emit("refresh");
          this.dialogVisible = false;
        });
      }
    },
    cancel() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
