<template>
  <basic-container>
    <content-box title="归档队伍变更记录">
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun" :searchQuery="searchQuery">
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import {
  startData,
  stopData,
} from "@/api/keyword/dedicated";
import { getUserRecordsPage } from "@/api/system/user"
import HcCrud from "@/views/components/HcCrud/index"
import ColorTag from "@/views/components/ColorTag/index"
import ContentBox from "@/views/components/ContentBox/index"
import SearchInput from "@/views/components/SearchInput/index"

export default {
  name: "Operlog",
  components: { ContentBox, SearchInput, HcCrud, ColorTag },
  dicts: ["dept_user_change_type"],
  data() {
    return {

    };
  },
  computed: {
    searchQuery () {
      return [
        {
          label: "类型",
          prop: "type",
          type: "select",
          dicData: this.dict.type.dept_user_change_type
        },
        {
          label: "描述",
          prop: "describe"
        },
        {
          label: "日期",
          prop: "createTime",
          type: "daterange",
          valueFormat: "yyyy-MM-dd"
        }
      ]
    },
    tableOption () {
      return {
        indexLabel: '序号',
        columns: [
          {
            label: "日期",
            prop: "createTime"
          },
          {
            label: "类型",
            prop: "typeName"
          },
          {
            label: "单位",
            prop: "unitName",
          },
          {
            label: "科室",
            prop: "deptName",
          },
          {
            label: "单位全宗号",
            prop: "qzhNumber"
          },
          {
            label: "描述",
            prop: "describe"
          }
        ],
      }
    },
    roleId () {
      return this.$route.query?.roleId
    }
  },
  methods: {
    fetchListFun (params) {
      let createTime = params.createTime;
      if (createTime && createTime.length == 2) {
        params.startDate = createTime[0];
        params.endDate = createTime[1];
        delete params.createTime;
      }
      return new Promise((resolve, reject) => {
        getUserRecordsPage(params).then(({data}) => {
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

