import request from '@/utils/request'

export function init() {
    return request({
      url: '/task/page',
      method: 'get',
    })
  }