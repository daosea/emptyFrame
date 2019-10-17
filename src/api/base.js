import request from '@/utils/request'

const initBaseApi = function(name) {
  this.getPage = function(params) {
    return request({
      url: `/${name}/rest/page`,
      method: 'get',
      params
    })
  }
  this.getDetail = function(params) {
    return request({
      url: `/${name}/rest/load?id=${params.id}`,
      method: 'get'
      // params
    })
  }
  this.addObject = function(data) {
    return request({
      url: `/${name}/rest/add`,
      method: 'post',
      data
    })
  }
  this.deleteObject = function(data) {
    return request({
      url: `/${name}/rest?id=${data}`,
      method: 'delete',
      data
    })
  }
  this.batchDelete = function(data) {
    return request({
      url: `/${name}/rest/batch-delete`,
      method: 'post',
      data
    })
  }
  this.updateObject = function(data) {
    return request({
      url: `/${name}/rest/update`,
      method: 'post',
      data
    })
  }
  this.updateStatus = function(data) {
    return request({
      url: `/${name}/rest/update-status`,
      method: 'post',
      data
    })
  }
  this.getList = function(params) {
    return request({
      url: `/${name}/rest/list`,
      method: 'get',
      params
    })
  }
}

export default initBaseApi
