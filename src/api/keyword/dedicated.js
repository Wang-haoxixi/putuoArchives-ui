import request from '@/utils/request'

// 查询关键词列表
export function getPageDept(params) {
  return request({
    url: '/keyword/dept/get',
    method: 'get',
    params
  })
}

// 启用关键词库
export function startData(data) {
  return request({
    url: '/keyword/dept/library/open',
    method: 'post',
    data
  })
}

// 禁用关键词库
export function stopData(data) {
  return request({
    url: '/keyword/dept/library/stop',
    method: 'post',
    data
  })
}
