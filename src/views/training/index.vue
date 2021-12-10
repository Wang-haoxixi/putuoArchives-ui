<template>
  <basic-container>
    <content-box title="在线培训">
      <template v-slot:operations>
        <search-input @search="toSearch"></search-input>
        <el-button v-hasPermi="['train:add']" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="toAdd">新增培训文件</el-button>
      </template>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun">
        <template v-slot:table="scope">
          <div v-if="scope.tableData && scope.tableData.length > 0" class="train-list">
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
                <el-button v-hasPermi="['train:edit']" size="mini" @click="toEdit(row.id)">更新文件</el-button>
                <el-button v-hasPermi="['train:delete']" size="mini" @click="toDelete(row.id)">删除文件</el-button>
                <el-button type="primary" plain size="mini" @click="toPreview(row.fileId)">在线预览</el-button>
                <el-button type="primary" size="mini" @click="toDownLoad(row.fileId)">下载文件</el-button>
              </div>
            </div>
          </div>
          <default-page v-else status="noData"></default-page>
        </template>
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import { fileDownloadUrl, filePreviewUrl } from "@/api/file/index"
import { getTrainPage, deleteTrain } from "@/api/train/index"
import HcCrud from "@/views/components/HcCrud/index"
import ColorTag from "@/views/components/ColorTag/index"
import ContentBox from "@/views/components/ContentBox/index"
import SearchInput from "@/views/components/SearchInput/index"
import DefaultPage from "../../components/DefaultPage/index.vue";

export default {
  components: { ContentBox, SearchInput, HcCrud, ColorTag, DefaultPage },
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
    toSearch (fileTitle) {
      this.$refs.hcCrud.refresh({}, {
        fileTitle
      })
    },
    toAdd () {
      this.$router.push({
        path: "/trainingEdit"
      })
    },
    toEdit (id) {
      this.$router.push({
        path: "/trainingEdit",
        query: {
          id
        }
      })
    },
    toDelete (id) {
      this.$modal.confirm('是否确认删除该文件？').then(function() {
        return deleteTrain(id)
      }).then(() => {
        this.$modal.msgSuccess("删除成功！");
        this.$refs.hcCrud.refresh();
      }).catch(() => {});
    },
    toDownLoad (fileId) {
      fileDownloadUrl({fileId}).then(({data}) => {
        const a = document.createElement('a')
        a.href = `${process.env.VUE_APP_BASE_API}${data}`
        a.click()
      })
    },
    toPreview (fileId) {
      filePreviewUrl({fileId}).then(({data}) => {
        if (data) {
          window.open(data)
        }
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

