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
// 暂时不使用该下载方式
// export function fileDownload (fileId) {
//   return request({
//     url: `/file/download/file_id?fileId=${fileId}`,
//     timeout: 0,
//     responseType: "blob",
//     method: "get",
//     returnHeaders: true
//   })
// }
//根据文件id获取下载地址
export function fileDownloadUrl (params) {
  return request({
    url: "/file/download/url",
    timeout: 0,
    params
  })
}
//根据文件id获取预览地址
export function filePreviewUrl (params) {
  return request({
    url: "/file/preview/url",
    timeout: 0,
    params
  })
}
//根据培训id获取下载地址
export function trainDownloadUrl (params) {
  return request({
    url: "/train/download/url",
    timeout: 0,
    params
  })
}
//根据培训id获取预览地址
export function trainPreviewUrl (params) {
  return request({
    url: "/train/preview/url",
    timeout: 0,
    params
  })
}