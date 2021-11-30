import request from '@/utils/request'

// 查询公告列表
export function getNoticeList(query) {
  return request({
    url: '/system/notice/list',
    method: 'get',
  })
}


//长轮询公告列表
export function circularListNotice(query) {
  return request({
    url: '/system/notice/watch',
    timeout: 90000,
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId) {
  return request({
    url: '/system/notice/record/detail',
    method: 'get',
    params: {id:noticeId}
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/system/notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId) {
  return request({
    url: '/system/notice/record/del',
    method: 'post',
    data: [noticeId]
  })
}
// 转发公告
export function forwardNotice(data) {
  return request({
    url: '/system/notice/forward',
    method: 'post',
    data: data
  })
}