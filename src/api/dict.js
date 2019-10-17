import request from '@/utils/request'

export function getDict(params) {
  return request({
    url: '/dict/rest/list/by-parent-code',
    method: 'get',
    params
  })
}
