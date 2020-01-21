import axios from './index'


export const getDatabaseInfo = () => {
  return axios.request({
    url: '/api/database/info/',
    method: 'get',
  })
}


export const createOrUpdateChangeOrder = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/database/change_order/' + id + '/',
      method: 'put',
      data: data,
    })
  } else {
    return axios.request({
      url: '/api/database/change_order/',
      method: 'post',
      data: data,
    })
  }
}


export const createOrUpdateChange = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/database/change/' + id + '/',
      method: 'put',
      data: data,
    })
  } else {
    return axios.request({
      url: '/api/database/change/',
      method: 'post',
      data: data,
    })
  }
}


export const getChangeOrder = ({id}) => {
  return axios.request({
    url: '/api/database/change_order/' + id + '/',
    method: 'get',
  })
}

export const getChange = ({id}) => {
  return axios.request({
    url: '/api/database/change/' + id + '/',
    method: 'get',
  })
}

export const getChangeOrderAudit = ({id}) => {
  return axios.request({
    url: '/api/database/change_order/' + id + '/audit/',
    method: 'get',
  })
}


export const getChangeHistory = ({ids}) => {
  return axios.request({
    url: '/api/database/change_history/' + ids + '/',
    method: 'get',
  })
}


export const putChangeOrderAudit = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/database/change_order/' + id + '/audit/',
      method: 'put',
      data: data,
    })
  } else {

  }
}

export const getChangeOrderList = ({data,query}) => {
  return axios.request({
    url: '/api/database/change_order/query/',
    method: 'post',
    data: data,
    params:query
  })
}


export const getChangeNotice = () => {
  return axios.request({
    url: '/api/database/change/notice/',
    method: 'get',
  })
}