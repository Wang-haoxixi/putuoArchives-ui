import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

export function getRolePage(params) {
  return request({
    url: "/role/list/page",
    params
  })
}

export function getAuthUserPage(params) {
  return request({
    url: "/role/user/role_id",
    params
  })
}

export function getIdentityList () {
  return request({
    url: '/role/identity/list'
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/role/info?roleId=' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/role/edit',
    method: 'post',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/role/dataScope',
    method: 'post',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'delete'
  })
}

// 导出角色
export function exportRole(query) {
  return request({
    url: '/system/role/export',
    method: 'get',
    params: query
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'put',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'put',
    params: data
  })
}

export function removeRoleBatch (data) {
  return request({
    url: 'role/remove',
    method: 'post',
    data
  })
}

export function addRoleUserBatch (data) {
  return request({
    url: '/role/user/batch/add',
    method: 'post',
    data
  })
}

export function removeRoleUserBatch (data) {
  return request({
    url: '/role/user/batch/remove',
    method: 'post',
    data
  })
}

export function getRoleList(params) {
  return request({
    url: "/role/list",
    params
  })
}

// 删除：将用户移出归档队伍列表
export function deleteUser(data) {
  return request({
    url: '/role/user/clean',
    method: 'post',
    data
  })
}
