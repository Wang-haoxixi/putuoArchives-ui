<template>
  <basic-container>
    <content-box title="通用关键词库">
      <template>
        <div class="statistics">
          <div v-for="(item, index) in statistics" :key="index" class="item">
            <div class="count">{{item.value}}</div>
            <div class="type">{{item.label}}</div>
          </div>
        </div>
        <div class="operations">
          <div class="">
            <el-button @click="startBatch">启用</el-button>
            <el-button @click="stopBatch">禁用</el-button>
            <el-button @click="deleteBatch">删除</el-button>
          </div>
          <div>
            <search-input @search="toSearch"></search-input>
            <el-button style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="toAdd">新增关键词</el-button>
            <el-button @click="handleExport">导出</el-button>
            <el-button @click="handleImport">模板导入</el-button>
            <el-button @click="downloadTemplate">模板下载</el-button>
          </div>
        </div>
        <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
          <template v-slot:status="scope">
            <color-tag :value="scope.row.status" :tags="statusTags"></color-tag>
          </template>
        </hc-crud>
      </template>
    </content-box>
  </basic-container>
</template>

<script>
import {
  getPageKeyword,
  startKeyword,
  stopKeyword,
  deleteKeyword,
  getStatistics,
  exportKeyword,
  downloadTemplate,
  importTemplate
} from "@/api/keyword/general";
import HcCrud from "@/views/components/HcCrud/index"
import ColorTag from "@/views/components/ColorTag/index"
import ContentBox from "@/views/components/ContentBox/index"
import SearchInput from "@/views/components/SearchInput/index"
import { downLoadBlob, selectFile } from "@/utils/file"

export default {
  components: { ContentBox, SearchInput, HcCrud, ColorTag },
  dicts: ["keyword_type"],
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
      ],
      statistics: []
    };
  },
  computed: {
    tableOption () {
      return {
        selection: true,
        indexLabel: '序号',
        columns: [
          {
            label: "关键词名称",
            prop: "name",
            sortable: "custom"
          },
          {
            label: "关键词属性",
            prop: "keyType",
            sortable: "custom",
            type: "select",
            dicData: this.dict.type.keyword_type
          },
          {
            label: "状态",
            prop: "status",
            slot: true,
            sortable: "custom"
          },
          {
            label: "更新时间",
            prop: "updateTime",
            sortable: "custom"
          }
        ],
        menu: [
          {
            label: "编辑",
            fun: (row) => {
              this.toEdit(row)
            }
          },
          {
            label: "删除",
            fun: (row) => {
              this.toDelete(row)
            }
          }
        ],
        menuWidth: 100
      }
    },
  },
  created () {
    this.getStatistics()
  },
  methods: {
    getStatistics () {
      getStatistics().then(({data}) => {
        const statistics = {}
        for (let i = 0; i < data.length; i++) {
          // statistics[data[i].TYPE] = data[i].COUNT
          statistics[data[i].type] = data[i].count
        }
        this.statistics = [
          {
            label: "中心词",
            value: statistics[1] || 0
          },
          {
            label: "近义词",
            value: statistics[2] || 0
          },
          {
            label: "未设置",
            value: statistics[0] || 0
          }
        ]
      })
    },
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getPageKeyword(params).then(({data}) => {
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
          return startKeyword(ids)
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
          return stopKeyword(ids)
        }).then(() => {
          this.$modal.msgSuccess("禁用成功");
          this.$refs.hcCrud.refresh();
        }).catch(() => {});
      } else {
        this.$modal.msgWarning("请先勾选需要禁用的关键词")
      }
    },
    deleteBatch () {
      let select = this.$refs.hcCrud.multipleSelection
      if (select.length > 0) {
        this.$modal.confirm('是否确认删除所选关键词？').then(function() {
          let ids = []
          for (let i = 0; i < select.length; i++) {
            ids.push(select[i].id)
          }
          return deleteKeyword(ids)
        }).then(() => {
          this.$modal.msgSuccess("删除成功");
          this.refresh();
        }).catch(() => {});
      } else {
        this.$modal.msgWarning("请先勾选需要删除的关键词")
      }
    },
    toAdd () {
      this.$router.push({
        path: "/keyword/general/keyword/edit"
      })
    },
    toEdit (row) {
      this.$router.push({
        path: `/keyword/general/keyword/edit?id=${row.id}`
      })
    },
    toDelete (row) {
      this.$modal.confirm('是否确认删除该关键词？').then(function() {
        return deleteKeyword([row.id])
      }).then(() => {
        this.$modal.msgSuccess("删除成功");
        this.refresh();
      }).catch(() => {});
    },
    handleExport () {
      exportKeyword().then(({ headers, data }) => {
        let disposition = headers['content-disposition']
        let fileName = decodeURIComponent(disposition.split("fileName=")[1])
        downLoadBlob(data, fileName)
      })
    },
    downloadTemplate () {
      downloadTemplate({
        libraryId: this.library,
      }).then(({ headers, data }) => {
        let disposition = headers['content-disposition']
        let fileName = decodeURIComponent(disposition.split("fileName=")[1])
        downLoadBlob(data, fileName)
      })
    },
    handleImport () {
      selectFile().then(fileList => {
        importTemplate(fileList[0]).then(({data}) => {
          this.$modal.msgSuccess("导入成功！")
          this.refresh()
        })
      })
    },
    refresh () {
      this.$refs.hcCrud.refresh()
      this.getStatistics()
    }
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  margin-top: 16px;
  display: grid;
  background: #EEEEEE;
  height: 83px;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1px;
  grid-gap: 1px;
  .item {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .count {
      height: 42px;
      line-height: 42px;
      font-weight: 600;
      font-size: 30px;
    }
    .type {
      margin-top: 3px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #999;
    }
  }
}
.operations {
  margin-top: 20px;
  display: flex;
  height: 44px;
  align-items: center;
  justify-content: space-between;
}
</style>

