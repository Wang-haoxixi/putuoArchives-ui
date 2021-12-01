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