<template>
  <basic-container>
    <hc-crud :search-query="searchQuery" :option="tableOption" :operations="operations" :fetchListFun="fetchListFun"></hc-crud>
  </basic-container>
</template>

<script>
import {
  list,
} from "@/api/monitor/logininfor";
import HcCrud from "@/views/components/HcCrud/index"

export default {
  name: "Logininfor",
  components: { HcCrud },
  dicts: ["sys_common_status"],
  data() {
    return {
      searchQuery: [
        {
          label: "用户名",
          prop: "userName",
          type: "text",
        },
        {
          label: "IP地址",
          prop: "ip",
          type: "text",
        },
        {
          label: "操作系统",
          prop: "operType",
          type: "select",
        },
        {
          label: "登录时间",
          prop: "operType",
          type: "datetimerange",
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
            label: "用户名",
            prop: "userName"
          },
          {
            label: "角色",
            prop: "roleName"
          },
          {
            label: "IP地址",
            prop: "ipaddr"
          },
          {
            label: "浏览器",
            prop: "browser"
          },
          {
            label: "操作系统",
            prop: "os"
          },
          {
            label: "登录状态",
            prop: "status",
            type: "select",
            dicData: this.dict.type.sys_common_status
          },
          {
            label: "登录时间",
            prop: "loginTime"
          }
        ]
      }
    }
  },
  methods: {
    fetchListFun (params) {
      return new Promise((resolve, reject) => {
        list(params).then((data) => {
          resolve({
            records: data.rows,
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

