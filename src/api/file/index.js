import request from '@/utils/request'

export function fileUpload (file, uploadProgress) {
  let data = new FormData()
  data.append('file', file)
  return request({
    url: '/file/upload',
    method: 'post',
    timeout: 0,
    onUploadProgress: uploadProgress,
    data
  })
}

export function fileDownload (fileId) {
  return request({
    url: `/file/download/file_id?fileId=${fileId}`,
    timeout: 0,
    responseType: "blob",
    method: "get",
    returnHeaders: true
  })
}

export function fileDownloadUrl (params) {
  return request({
    url: "/file/download/url",
    params
  })
}
