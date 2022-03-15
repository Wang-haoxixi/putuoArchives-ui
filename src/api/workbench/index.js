import request from '@/utils/request'

export function getNavigation() {
  return request({
    url: '/work',
    method: 'get',
  })
}
//归集员工作台
export function getList(query) {
  return request({
    url: '/task/page',
    method: 'get',
    params: query
  })
}
//纯清单
export function getSingleList(query) {
  return request({
    url: '/task/qd/page',
    method: 'get',
    params: query
  })
}
//混合清单
export function getMixList(query) {
  return request({
    url: '/task/hun/page',
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

export function createTaskList(data) {
  return request({
    url: '/task/list/create',
    method: 'post',
    data: data
  })
}
export function createTask(data) {
  return request({
    url: '/task/list/create',
    method: 'post',
    data: data
  })
}
//制发任务清单
export function updateTaskList(data) {
  return request({
    url: '/task/list/update',
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
//领取任务
export function taskReceive(data) {
  return request({
    url: '/task/receive',
    method: 'post',
    data: data
  })
}
//领取完善任务
export function taskCompleteReceive(data) {
  return request({
    url: '/task/perfect/receive',
    method: 'post',
    data: data
  })
}
//更新关联材料
export function fileUpdate(data) {
  return request({
    url: '/task/file/update',
    method: 'post',
    data: data
  })
}
//获取单位领导人
export function getUnitAdmin() {
  return request({
    url: '/user/workbench/unit_admin',
    method: 'get',
  })
}
//科室领导操作任务
export function taskApply(data) {
  return request({
    url: '/task/apply',
    method: 'post',
    data: data
  })
}

//导出Excel
export function exportExcel(data) {
  return request({
    url: '/task/download',
    method: 'post',
    responseType: "blob",
    data: data
  })
}

//发送提醒消息
export function sendMessage(data) {
  return request({
    url: '/task/send/message',
    method: 'post',
    data: data
  })
}

//删除任务
export function delTask(data) {
  return request({
    url: '/task/delete',
    method: 'post',
    data: data
  })
}

//编辑任务
export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data: data
  })
}