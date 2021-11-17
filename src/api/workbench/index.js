import request from '@/utils/request'

export function getlist() {
    return request({
      url: '/task/page',
      method: 'get',
    })
  }
  export function getTaskCount() {
    return request({
      url: '/task/statistics/count',
      method: 'get',
    })
  } 