import request from '@/utils/request'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query
  })
}

// 查询归集操作日志列表
export function collectionOperList(query) {
  return request({
    url: '/monitor/operlog/archive/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/monitor/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  })
}

// 导出操作日志
export function exportOperlog() {
  return request({
    url: '/monitor/operlog/export',
    responseType: "blob",
    showHeaders: true,
  })
}

// 导出归集操作日志
export function exportCollection(query) {
  return request({
    url: '/monitor/operlog/archive/export',
    responseType: "blob",
    showHeaders: true,
  })
}
