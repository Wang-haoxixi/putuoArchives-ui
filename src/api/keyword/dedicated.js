import request from '@/utils/request'

// 查询关键词库列表
export function getLibraryPage(params) {
  return request({
    url: '/keyword/dept/get',
    method: 'get',
    params
  })
}

// 启用关键词库
export function startLibrary(data) {
  return request({
    url: '/keyword/dept/library/open',
    method: 'post',
    data
  })
}

// 禁用关键词库
export function stopLibrary(data) {
  return request({
    url: '/keyword/dept/library/stop',
    method: 'post',
    data
  })
}

// 查询关键词库详情
export function getLibraryDetail(params) {
  return request({
    url: '/keyword/dept/detail',
    method: 'get',
    params
  })
}

// 查询关键词列表
export function getPageKeyword(params) {
  return request({
    url: '/keyword/dept/getKeyword',
    method: 'get',
    params
  })
}

// 启用关键词
export function startKeyword(data) {
  return request({
    url: '/keyword/dept/open',
    method: 'post',
    data
  })
}

// 禁用关键词
export function stopKeyword(data) {
  return request({
    url: '/keyword/dept/stop',
    method: 'post',
    data
  })
}


// 删除关键词
export function deleteKeyword(data) {
  return request({
    url: '/keyword/dept/delKeyword',
    method: 'post',
    data
  })
}

// 查询关键词详情
export function getKeywordDept(params) {
  return request({
    url: '/keyword/dept/details',
    method: 'get',
    params
  })
}

// 新增关键词
export function addKeywordDept(data) {
  return request({
    url: '/keyword/dept/addKeyword',
    method: 'post',
    data
  })
}

// 编辑关键词
export function updateKeywordDept(data) {
  return request({
    url: '/keyword/dept/updateKeyword',
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
    url: '/keyword/dept/group',
    method: 'get',
    params
  })
}

export function exportKeyword (params) {
  return request({
    url: '/keyword/dept/export',
    responseType: "blob",
    showHeaders: true,
    params
  })
}

export function downloadTemplate () {
  return request({
    url: '/keyword/dept/download',
    responseType: "blob",
    showHeaders: true,
  })
}

export function importTemplate (libraryId, file) {
  const formData = new FormData()
  formData.append("file", file)
  return request({
    url: '/keyword/dept/import?libraryId=' + libraryId,
    method: 'POST',
    data: formData
  })
}



