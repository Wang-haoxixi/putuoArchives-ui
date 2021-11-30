<template>
  <basic-container>
    <content-box title="在线培训">
      <template v-slot:operations>
        <search-input @search="toSearch"></search-input>
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-plus" >新增培训文件</el-button>
      </template>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:table="scope">
          <div class="train-list">
            <div class="train-item" v-for="(row, index) in scope.tableData" :key="index">
              <div class="item-info">
                <div class="name">{{row.fileTitle}}</div>
                <div class="expand">
                  <div class="expand-item">
                    <div class="expand-item-title">更新日期</div>
                    <div class="expand-item-data">{{row.updateTime.substring(0, 10)}}</div>
                  </div>
                  <div class="expand-item">
                    <div class="expand-item-title">更新人</div>
                    <div class="expand-item-data">{{row.updateByName}}</div>
                  </div>
                  <div class="expand-item">
                    <div class="expand-item-title">文件类型</div>
                    <div class="expand-item-data">{{row.fileType}}</div>
                  </div>
                  <div class="expand-item">
                    <div class="expand-item-title">文件大小</div>
                    <div class="expand-item-data">{{row.fileSize}}</div>
                  </div>
                </div>
              </div>
              <div class="item-operation">
                <el-button size="mini">更新文件</el-button>
                <el-button size="mini">删除文件</el-button>
                <el-button type="primary" plain size="mini">在线预览</el-button>
                <el-button type="primary" size="mini">下载文件</el-button>
              </div>
            </div>
          </div>
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
import { getTrainPage } from "@/api/train/index"
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
      return {}
    }
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        getTrainPage(params).then(({data}) => {
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
    },
    toEdit (row) {
      this.$router.push({
        path: "/keyword/dedicatedkey/edit"
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.train-list {
  margin-top: 20px;
  .train-item {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #eee;
    border-radius: 2px;
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  .item-info {
    .name {
      height: 26px;
      line-height: 26px;
      font-size: 18px;
      font-weight: 600;
    }
    .expand {
      margin-top: 10px;
      height: 22px;
      line-height: 22px;
      display: flex;
      .expand-item {
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        display: flex;
        &:not(:first-child) {
          margin-left: 40px;
        }
        .expand-item-title {
          font-size: 16px;
          color: #999;
        }
        .expand-item-data {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>

