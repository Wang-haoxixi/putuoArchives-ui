import request from '@/utils/request'

export function getPage (params) {
  return request({
    url: "/superLog/list",
    params
  })
}

export function superLogExport () {
  return request({
    url: "/superLog/export",
    responseType: "blob",
    showHeaders: true,
  })
}
