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


