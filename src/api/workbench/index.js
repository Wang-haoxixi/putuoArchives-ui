import request from '@/utils/request'

export function getlist(query) {
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