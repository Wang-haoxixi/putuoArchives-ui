import request from '@/utils/request'

// 查询关键词列表
export function getPageDept(params) {
  return request({
    url: '/keyword/list',
    method: 'get',
    params
  })
}

// 启用关键词
export function startData(data) {
  return request({
    url: '/keyword/open',
    method: 'put',
    data
  })
}

// 禁用关键词
export function stopData(data) {
  return request({
    url: '/keyword/stop',
    method: 'put',
    data
  })
}
