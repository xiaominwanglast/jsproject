import axios from './index'

export const createOrUpdateFlowTesttask = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/flow/testtask/' + id + '/',
      method: 'put',
      data: data,
    })
  } else {
    return axios.request({
      url: '/api/flow/testtask/',
      method: 'post',
      data: data,
    })
  }
}

export const getflowTesttask = ({id}) => {
  return axios.request({
    url: '/api/flow/testtask/' + id + '/',
    method: 'get',
  })
}


export const getflowTesttaskOperations = ({id}) => {
  if (id) {
    return axios.request({
      url: '/api/flow/testtask/' + id + '/operations/',
      method: 'get',
    })
  }
}


export const getflowTesttaskList = ({data,query}) => {
  return axios.request({
    url: '/api/flow/testtask/query/',
    method: 'post',
    data: data,
    params:query
  })
}

