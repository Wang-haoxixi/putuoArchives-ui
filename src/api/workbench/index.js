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

//子任务详情
export function getTaskDetails(query) {
  return request({
    url: '/task/details',
    method: 'get',
    params: query
  })
}
//子任务详情生命周期
export function getTaskLifeCycle(query) {
  return request({
    url: '/task/record/page',
    method: 'get',
    params: query
  })
}

//任务清单详情
export function getTaskListDetail(query) {
  return request({
    url: '/task/list/details',
    method: 'get',
    params: query
  })
}
//完善人领取任务
export function taskReceive(data) {
  return request({
    url: '/task/perfect/receive',
    method: 'post',
    data: data
  })
}