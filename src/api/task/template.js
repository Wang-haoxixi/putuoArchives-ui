import request from '@/utils/request'

export function getTemplatePage (params) {
  return request({
    url: "/task/template/list/page",
    params
  })
}

export function getTemplateDetail (params) {
  return request({
    url: "/task/template/list/details",
    params
  })
}

export function addTemplate (data) {
  return request({
    url: "/task/template/list/create",
    method: 'POST',
    data
  })
}

export function updateTemplate (data) {
  return request({
    url: "/task/template/list/update",
    method: 'POST',
    data
  })
}

export function deleteTemplate (params) {
  return request({
    url: "/task/template/list/delete",
    method: 'POST',
    params
  })
}
