import request from '@/utils/request'

export function generateKey() {
  return request({
    url: '/key/generate',
    method: 'get'
  })
}

