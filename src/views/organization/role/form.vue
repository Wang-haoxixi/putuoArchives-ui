<template>
  <el-dialog
    title="新增/修改角色"
    :visible.sync="dialogVisible"
    width="500px"
    append-to-body
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" :disabled="form.isCustom === false"/>
      </el-form-item>
      <el-form-item prop="identity">
        <span slot="label">
          角色身份
          <!-- <el-tooltip
            content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
            placement="top"
          >
            <i class="el-icon-question"></i>
          </el-tooltip> -->
        </span>
        <el-select v-model="form.identity" placeholder="请选择角色身份" :disabled="form.isCustom === false">
          <el-option
            v-for="(item, index) in this.identitys"
            :key="index"
            :value="item.identity"
            :label="item.name"
            :disabled="!item.isCustom"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="角色顺序" prop="roleSort">
        <el-input-number
          v-model="form.roleSort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status" :disabled="form.isCustom === false">
          <el-radio
            v-for="dict in dict.type.sys_normal_disable"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-checkbox
          v-model="menuNodeAll"
          @change="handleCheckedTreeNodeAll($event, 'menu')"
          >全选/全不选</el-checkbox
        >
        <el-tree
          class="tree-border"
          :data="menuOptions"
          show-checkbox
          ref="menu"
          node-key="id"
          empty-text="加载中，请稍后"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole, updateRole, getIdentityList } from "@/api/system/role";
import { treeselect as menuTreeselect } from "@/api/system/menu";
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
      menuNodeAll: false,
      menuOptions: [],
      identitys: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    open(form = initForm, checkedKeys = [], isEdit = false) {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.resetForm("form");
      this.form = form;
      this.isEdit = isEdit;
      this.dialogVisible = true;
      this.$nextTick(() => {
        checkedKeys.forEach((v) => {
          this.$refs.menu.setChecked(v, true, false);
        });
      })
    },
    init() {
      getIdentityList().then(({ data }) => {
        this.identitys = data;
      });
      menuTreeselect().then(({ data }) => {
        this.menuOptions = data;
      });
    },
    handleCheckedTreeNodeAll(value, type) {
      this.$refs.menu.setCheckedNodes(value ? this.menuOptions : []);
    },
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            updateRole(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.$emit("refresh");
              this.dialogVisible = false;
            });
          } else {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            addRole(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.$emit("refresh");
              this.dialogVisible = false;
            });
          }
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
