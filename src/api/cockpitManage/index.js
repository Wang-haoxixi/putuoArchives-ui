import request from '@/utils/request'

// 查询分页角色展示内容
export function getList(query) {
  return request({
    url: '/archive/get_cockpit/get_list_cockpit_set',
    method: 'get',
    params: query
  })
}

// 根据id查询指标设置详情
export function getDetail(query) {
  return request({
    url: '/archive/get_cockpit/get_cockpit_set_index_by_id',
    method: 'get',
    params: query
  })
}

// 增/修改指标详情
export function editCockpit(data) {
  return request({
    url: '/archive/get_cockpit/save_or_update_cockpit_set_index',
    method: 'post',
    data: data
  })
}

// 查询统计数据文件
export function allFile(query) {
  return request({
    url: '/archive/get_cockpit/get_dict_list',
    method: 'get',
    params: query
  })
}

// 查询专项归集数据
export function specialCollection(query) {
  return request({
    url: '/archive/get_cockpit/page_list_cockpit_special_collection',
    method: 'get',
    params: query
  })
}

// 分页查询文件内容
export function fileContent(query) {
  return request({
    url: '/archive/get_cockpit/get_list_file',
    method: 'get',
    params: query
  })
}

// 下载模板
export function downloadTemplate (data) {
  const formData = new FormData()
  formData.append("enums", data)
  return request({
    method: 'post',
    url: '/archive/get_cockpit/export',
    responseType: "blob",
    showHeaders: true,
    data: formData,
  })
}
