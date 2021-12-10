<template>
  <basic-container>
    <content-box title="清单模板">
      <template v-slot:operations>
        <search-input @search="toSearch"></search-input>
        <el-button v-hasPermi="['task:template:edit']" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="toAdd">新增模板</el-button>
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
import { getTemplatePage, deleteTemplate } from "@/api/task/template";
import HcCrud from "@/views/components/HcCrud/index"
import ContentBox from "@/views/components/ContentBox/index"
import SearchInput from "@/views/components/SearchInput/index"

export default {
  components: { ContentBox, SearchInput, HcCrud },
  data() {
    return {};
  },
  computed: {
    tableOption () {
      return {
        indexLabel: '序号',
        columns: [
          {
            label: "模板名称",
            prop: "taskListName"
          },
          {
            label: "创建单位",
            prop: "deptName"
          },
          {
            label: "创建人",
            prop: "createName",
          },
          {
            label: "创建时间",
            prop: "createTime",
            sortable: "custom",
            width: 160,
          },
          {
            label: "最后更新人",
            prop: "updateName"
          },
          {
            label: "最后修改时间",
            prop: "updateTime",
            sortable: "custom",
            width: 160,
          }
        ],
        menu: [
          {
            label: "查看",
            fun: (row) => {
              this.toView(row)
            }
          },
          {
            label: "编辑",
            permissions: ["task:template:edit"],
            fun: (row) => {
              this.toEdit(row)
            }
          },
          {
            label: "删除",
            permissions: ["task:template:delete"],
            fun: (row) => {
              this.toDelete(row)
            }
          }
        ],
        menuWidth: 140
      }
    }
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getTemplatePage(params).then(({data}) => {
          resolve({
            records: data.records,
            page: {
              total: data.total
            }
          })
        })
      })
    },
    toSearch (templateName) {
      this.$refs.hcCrud.refresh({}, {
        templateName
      })
    },
    toAdd () {
      this.$router.push({
        path: "/taskTemplate/edit"
      })
    },
    toEdit (row) {
      this.$router.push({
        path: "/taskTemplate/edit/?id=" + row.taskListTemplateId
      })
    },
    toView (row) {
      this.$router.push({
        path: "/taskTemplate/view/?id=" + row.taskListTemplateId
      })
    },
    toDelete (row) {
      this.$modal.confirm('是否确认删除该模板？').then(function() {
        return deleteTemplate({taskListTemplateId: row.taskListTemplateId})
      }).then(() => {
        this.$modal.msgSuccess("删除成功");
        this.$refs.hcCrud.refresh();
      }).catch(() => {});
    }
  },
};
</script>

