import request from '@/utils/request'
import BaseApi from './base'

export default new BaseApi('grade')

export function rankPriority(data) {
  return request({
    url: '/grade/rest/rank-priority',
    method: 'post',
    data
  })
}

