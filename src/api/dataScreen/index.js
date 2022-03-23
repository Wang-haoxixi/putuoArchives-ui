import request from '@/utils/request'

// 监管单位建设情况
export function getDeptTeam() {
  return request({
    url: '/archive/leader/get_cockpit/dept_team',
    method: 'get',
  })
}
// 监管队伍建设情况
export function getRoleTeam() {
  return request({
    url: '/archive/leader/get_cockpit/role_team',
    method: 'get',
  })
}
//归集任务完成情况
export function getCollectionTask() {
  return request({
    url: '/archive/leader/get_cockpit/task',
    method: 'get',
  })
}
//任务完成情况
export function getTaskMsg() {
  return request({
    url: '/archive/leader/get_cockpit/taskMsg',
    method: 'get',
  })
}
//OA在线归档情况
export function getOaMsg() {
  return request({
    url: '/archive/leader/get_cockpit/oaMsg',
    method: 'get',
  })
}
