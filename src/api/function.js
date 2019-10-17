import request from '@/utils/request'
import BaseApi from './base'

export default new BaseApi('function')

export function testFunc(data) {
  return request({
    url: '/function/rest/test-func',
    method: 'post',
    data
  })
}

