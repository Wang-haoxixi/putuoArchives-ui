<template>
  <basic-container>
    <hc-crud :search-query="searchQuery" :option="tableOption" :operations="operations" :fetchListFun="fetchListFun"></hc-crud>
  </basic-container>
</template>

<script>
import {
  list,
} from "@/api/monitor/operlog";
import HcCrud from "@/views/components/HcCrud/index"

export default {
  name: "Operlog",
  components: { HcCrud },
  dicts: ["sys_oper_type", "sys_common_status"],
  data() {
    return {
      searchQuery: [
        {
          label: "操作人",
          prop: "userName",
          type: "text",
        },
        {
          label: "IP地址",
          prop: "ip",
          type: "text",
        },
        {
          label: "操作类型",
          prop: "operType",
          type: "select",
        },
        {
          label: "日期",
          prop: "operType",
          type: "datetimerange",
        },
        {
          label: "描述",
          prop: "desc",
          type: "text",
        }
      ],
      operations: [
        {
          type: "primary",
          label: "导出",
          fun: () => {
            alert(1)
          }
        }
      ]
    };
  },
  computed: {
    tableOption () {
      return {
        columns: [
          {
            label: "操作人",
            prop: "userName"
          },
          {
            label: "角色",
            prop: "roleName"
          },
          {
            label: "系统模块",
            prop: "title"
          },
          {
            label: "操作类型",
            prop: "businessType",
            type: "select",
            dicData: this.dict.type.sys_oper_type
          },
          {
            label: "操作时间",
            prop: "operTime"
          },
          {
            label: "IP地址",
            prop: "operIp"
          },
          {
            label: "描述",
            prop: "remark"
          }
        ]
      }
    }
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        list(params).then(({data}) => {
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

