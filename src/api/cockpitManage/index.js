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

// 上传文件
export function fileUpload (data) {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return request({
    url: '/archive/get_cockpit/importData',
    method: 'post',
    data: formData
  })
}

// 导出数据
export function exportData (data) {
  const formData = new FormData()
  formData.append("enums", data)
  return request({
    method: 'post',
    url: '/archive/get_cockpit/export_list',
    responseType: "blob",
    showHeaders: true,
    data: formData,
  })
}

// 新增/修改专项归集
export function specialPro(data) {
  return request({
    url: '/archive/get_cockpit/save_or_update_cockpit_special_collection',
    method: 'post',
    data: data
  })
}

// 删除专项
export function specialDel(data) {
  const formData = new FormData()
  formData.append("id", data)
  return request({
    url: '/archive/get_cockpit/del_cockpit_special_collection',
    method: 'post',
    data: formData
  })
}

// 根据id删除文件内容
export function delFile(data) {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return request({
    url: '/archive/get_cockpit/delFileContent',
    method: 'post',
    data: formData
  })
}

// 根据id编辑文件内容
export function updateFileContent(data) {
  return request({
    url: '/archive/get_cockpit/updateFileContent',
    method: 'post',
    data: data
  })
}

// 数据内容设置与管理--纳入监管单位总数Or建成档案室总数
export function absorbAndBuildup(query) {
  return request({
    url: '/archive/get_cockpit/get_cockpit_data_nrjg_jcda',
    method: 'get',
    params: query
  })
}

// 数据内容设置与管理--新增编辑纳入监管单位总数Or建成档案室总数
export function updateAbsorbAndBuildup(data) {
  return request({
    url: '/archive/get_cockpit/update_cockpit_data_nrjg_jcda',
    method: 'post',
    data: data
  })
}
