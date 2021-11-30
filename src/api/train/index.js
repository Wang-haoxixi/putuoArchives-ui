import request from '@/utils/request'

// 查询培训资料列表
export function getTrainPage(params) {
  return request({
    url: '/train/list/page',
    method: 'get',
    params
  })
}

// 查询培训资料详情
export function getTrainDetail(params) {
  return request({
    url: '/train/get',
    method: 'get',
    params
  })
}

export function addTrain (data) {
  return request({
    url: '/train/save',
    method: 'post',
    data
  })
}

export function updateTrain (data) {
  return request({
    url: '/train/modify',
    method: 'post',
    data
  })
}

export function deleteTrain (id) {
  return request({
    url: '/train/delete',
    method: 'post',
    data: {id}
  })
}
