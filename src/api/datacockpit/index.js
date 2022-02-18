import request from '@/utils/request'

// 监管对象档案工作情况
export function getArchives(query) {
  return request({
    url: '/archive/get_cockpit/supervision_object_file_work',
    method: 'get',
    params: query
  })
}

// 监管对象归集队伍建设情况
export function getTeam(query) {
  return request({
    url: '/archive/get_cockpit/supervision_object_team_construction',
    method: 'get',
    params: query
  })
}

// 监管对象归集队伍建设情况--队伍开展情况表
export function getLaunch(query) {
  return request({
    url: '/archive/get_cockpit/get_page_work_of_the_team',
    method: 'get',
    params: query
  })
}

// 监管对象归集工作开展情况-其他(门类总数、使用情况、开展情况)
export function getOther(query) {
  return request({
    url: '/archive/get_cockpit/get_qt_maps',
    method: 'get',
    params: query
  })
}

// 监管对象归集工作开展情况--各单位开展情况单位集合列表
export function getUnitList(query) {
  return request({
    url: '/archive/get_cockpit/work_kz_of_the_team_name_list',
    method: 'get',
    params: query
  })
}

// 监管对象归集工作开展情况--各单位开展情况
export function development(query) {
  return request({
    url: '/archive/get_cockpit/work_kz_of_the_team',
    method: 'get',
    params: query
  })
}

// 监管对象归集工作开展情况-专项归集
export function specialPro(query) {
  return request({
    url: '/archive/get_cockpit/get_zx_maps',
    method: 'get',
    params: query
  })
}
