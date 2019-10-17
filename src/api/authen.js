import request from '@/utils/request'

export function login(data, headers) {
  return request({
    url: '/api/authen/form',
    method: 'post',
    headers: headers,
    data: data
  })
}
