import request from '@/utils/request'

// 查询关键词列表
export function getPageKeyword(params) {
  return request({
    url: '/keyword/list',
    method: 'get',
    params
  })
}

// 启用关键词
export function startKeyword(data) {
  return request({
    url: '/keyword/oper',
    method: 'post',
    data
  })
}

// 禁用关键词
export function stopKeyword(data) {
  return request({
    url: '/keyword/stop',
    method: 'post',
    data
  })
}


// 删除关键词
export function deleteKeyword(data) {
  return request({
    url: '/keyword/del',
    method: 'post',
    data
  })
}

// 查询关键词详情
export function getKeywordDetail(params) {
  return request({
    url: '/keyword/detail',
    method: 'get',
    params
  })
}

// 新增关键词
export function addKeyword(data) {
  return request({
    url: '/keyword/add',
    method: 'post',
    data
  })
}

// 编辑关键词
export function updateKeyword(data) {
  return request({
    url: '/keyword/update',
    method: 'post',
    data
  })
}

// 查询中心词列表
export function getKeywordParent(params) {
  return request({
    url: '/keyword/getParent',
    method: 'get',
    params
  })
}

// 查询统计数据
export function getStatistics(params) {
  return request({
    url: '/keyword/group',
    method: 'get',
    params
  })
}

export function exportKeyword () {
  return request({
    url: '/keyword/export',
    responseType: "blob",
    showHeaders: true,
  })
}

export function downloadTemplate () {
  return request({
    url: '/keyword/download',
    responseType: "blob",
    showHeaders: true,
  })
}

export function importTemplate (file) {
  const formData = new FormData()
  formData.append("file", file)
  return request({
    url: '/keyword/import',
    method: 'POST',
    data: formData
  })
}



