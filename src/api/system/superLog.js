import request from '@/utils/request'

export function getPage (params) {
  return request({
    url: "/superLog/list",
    params
  })
}
