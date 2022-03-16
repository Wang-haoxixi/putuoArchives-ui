import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}

// 查询部门下拉树结构
export function treeselect() {
  return request({
    url: '/system/dept/my/tree',
    method: 'get'
  })
}


// 根据角色ID查询部门树结构
export function roleDeptTreeselect(roleId) {
  return request({
    url: '/system/dept/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}

// 获取部门树
export function getDeptTree() {
  return request({
    url: '/system/dept/all/tree',
    method: 'get'
  })
}

export function getCurrentDeptTree(){
  return request({
    url: '/system/dept/workbench/tree',
    method: 'get'
  })
}

export function getDeptUser(params) {
  return request({
    url: '/user/list_dept',
    method: 'get',
    params
  })
}

// 获取立档单位列表
export function getDeptPage(params) {
  return request({
    url: '/system/dept/new/list',
    method: 'get',
    params
  })
}

// 获取立档单位列表
export function getDeptRecordPage(params) {
  return request({
    url: '/system/dd_dept_log/list',
    method: 'get',
    params
  })
}

// 修改立档单位全宗号
export function updateQzh(data) {
  return request({
    url: '/system/dept/new/update_sys_dept',
    method: 'post',
    data
  })
}

// 非立档单位的列表
export function notFilingUnits(data) {
  return request({
    url: '/system/dept/not_filing/unit',
    method: 'get',
    data
  })
}


