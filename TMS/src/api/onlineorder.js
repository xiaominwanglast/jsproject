import axios from './index'

export const createOrUpdateOnlineOrder = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/flow/onlineorder/' + id + '/',
      method: 'put',
      data: data,
    })
  } else {
    return axios.request({
      url: '/api/flow/onlineorder/',
      method: 'post',
      data: data,
    })
  }
}

export const getOnlineOrder = ({id}) => {
  return axios.request({
    url: '/api/flow/onlineorder/' + id + '/',
    method: 'get',
  })
}

export const createOrUpdateOnlineOrderCheckList = ({data}) => {
  return axios.request({
    url: '/api/flow/onlineorder/' + data.onlineorder_id + '/flow/' + data.onlineorderflow_id + '/checklist/',
    method: 'post',
    data: data,
  })
}

export const getOnlineOrderCheckList = ({onlineorder_id, onlineorderflow_id}) => {

  return axios.request({
    url: '/api/flow/onlineorder/' + onlineorder_id + '/flow/' + onlineorderflow_id + '/checklist/',
    method: 'get',
  })
}

export const getOnlineOrderOperations = ({id}) => {
  if (id) {
    return axios.request({
      url: '/api/flow/onlineorder/' + id + '/operations/',
      method: 'get',
    })
  }
}

export const getOnlineOrderList = ({data, query}) => {
  return axios.request({
    url: '/api/flow/onlineorder/query/',
    method: 'post',
    data: data,
    params: query
  })
}

