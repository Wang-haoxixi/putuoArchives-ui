<template>
  <basic-container>
    <content-box title="立档单位变更记录" back>
      <hc-crud ref="hcCrud" :option="tableOption" :fetchListFun="fetchListFun" :searchQuery="searchQuery">
      </hc-crud>
    </content-box>
  </basic-container>
</template>

<script>
import { getDeptRecordPage } from "@/api/system/dept"
import HcCrud from "@/views/components/HcCrud/index"
import ContentBox from "@/views/components/ContentBox/index"

export default {
  components: { ContentBox, HcCrud },
  dicts: ["sys_dept_status"],
  data() {
    return {

    };
  },
  computed: {
    searchQuery () {
      return [
        {
          label: "类型",
          prop: "changeType",
          type: "select",
          dicData: this.dict.type.sys_dept_status
        },
        {
          label: "描述",
          prop: "remark"
        },
        {
          label: "日期",
          prop: "createTime",
          type: "datetimerange",
          valueFormat: "yyyy-MM-dd HH:mm:ss"
        }
      ]
    },
    tableOption () {
      return {
        indexLabel: "序号",
        indexWidth: 100,
        columns: [
          {
            label: "日期",
            prop: "createTime"
          },
          {
            label: "类型",
            prop: "changeType",
            type: "select",
            dicData: this.dict.type.sys_dept_status
          },
          {
            label: "描述",
            prop: "remark",
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
        params.startTime = createTime[0];
        params.endTime = createTime[1];
        delete params.createTime;
      }
      return new Promise((resolve, reject) => {
        getDeptRecordPage(params).then(({data}) => {
          resolve({
            records: data.records,
            page: {
              total: data.total
            }
          })
        })
      })
    },
  },
};
</script>

