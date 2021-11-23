<template>
  <basic-container>
    <content-box title="专用关键词库">
      <template v-slot:operations>
        <search-input @search="toSearch"></search-input>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-plus" >新增关键词库</el-button>
        <el-button @click="startBatch">启用</el-button>
        <el-button @click="stopBatch">禁用</el-button>
      </template>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:status="scope">
          <color-tag :value="scope.row.status" :tags="statusTags"></color-tag>
        </template>
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import {
  getPageDept,
  startData,
  stopData,
} from "@/api/keyword/dedicated";
import HcCrud from "@/views/components/HcCrud/index"
import ColorTag from "@/views/components/ColorTag/index"
import ContentBox from "@/views/components/ContentBox/index"
import SearchInput from "@/views/components/SearchInput/index"

export default {
  name: "Operlog",
  components: { ContentBox, SearchInput, HcCrud, ColorTag },
  dicts: ["sys_oper_type", "sys_common_status"],
  data() {
    return {
      statusTags: [
        {
          value: "0",
          color: "#15BE50",
          label: "启用"
        },
        {
          value: "1",
          color: "#D40000",
          label: "禁用"
        }
      ]
    };
  },
  computed: {
    tableOption () {
      return {
        selection: true,
        indexLabel: '序号',
        columns: [
          {
            label: "词库名称",
            prop: "name"
          },
          {
            label: "使用单位",
            prop: "deptName"
          },
          {
            label: "状态",
            prop: "status",
            slot: true,
            sortable: "custom"
          },
          {
            label: "创建人",
            prop: "createByName",
          },
          {
            label: "创建时间",
            prop: "createTime",
            sortable: "custom"
          },
          {
            label: "最后修改人",
            prop: "updateByName"
          },
          {
            label: "最后修改时间",
            prop: "updateTime",
            sortable: "custom"
          }
        ],
        menu: [
          {
            label: "维护词库",
            fun: (row) => {console.log(row)}
          },
          {
            label: "编辑",
            fun: () => {}
          },
          {
            label: "删除",
            fun: () => {}
          }
        ],
        menuWidth: 180
      }
    }
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getPageDept(params).then(({data}) => {
          resolve({
            records: data.records,
            page: {
              total: data.total
            }
          })
        })
      })
    },
    toSearch (name) {
      this.$refs.hcCrud.refresh({}, {
        name
      })
    },
    startBatch () {
      let select = this.$refs.hcCrud.multipleSelection
      if (select.length > 0) {
        this.$modal.confirm('是否确认启用所选关键词？').then(function() {
          let ids = []
          for (let i = 0; i < select.length; i++) {
            ids.push(select[i].id)
          }
          return startData(ids)
        }).then(() => {
          this.$modal.msgSuccess("启用成功");
          this.$refs.hcCrud.refresh();
        }).catch(() => {});
      } else {
        this.$modal.msgWarning("请先勾选需要启用的关键词")
      }
    },
    stopBatch () {
      let select = this.$refs.hcCrud.multipleSelection
      if (select.length > 0) {
        this.$modal.confirm('是否确认禁用所选关键词？').then(function() {
          let ids = []
          for (let i = 0; i < select.length; i++) {
            ids.push(select[i].id)
          }
          return stopData(ids)
        }).then(() => {
          this.$modal.msgSuccess("禁用成功");
          this.$refs.hcCrud.refresh();
        }).catch(() => {});
      } else {
        this.$modal.msgWarning("请先勾选需要禁用的关键词")
      }
    }
  },
};
</script>

