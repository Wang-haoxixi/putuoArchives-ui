import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/task/page',
    method: 'get',
    params: query
  })
}
export function getTaskCount() {
  return request({
    url: '/task/statistics/count',
    method: 'get',
  })
}

export function getArchiveList(query) {
  return request({
    url: '/archive/get_data/get_list_page',
    method: 'get',
    params: query
  })
}
//制发任务清单
export function createTask(data) {
  return request({
    url: '/task/list/create',
    method: 'post',
    data: data
  })
}
//题名自动填充
export function keywordLike(query) {
  return request({
    url: '/keyword/like',
    method: 'get',
    params: query
  })
}
//关联材料
export function getMaterials(query) {
  return request({
    url: '/train/list/brief/page',
    method: 'get',
    params: query
  })
}
//获取归集档案员
export function getLiable(query) {
  return request({
    url: '/user/tree/current_unit',
    method: 'get',
    params: query
  })
}
export function getUnit(query) {
  return request({
    url: '/system/dept/get_dept_unit_list',
    method: 'get',
    params: query
  })
}
export function taskListCreate(data) {
  return request({
    url: '/task/list/create',
    method: 'post',
    data: data
  })
}