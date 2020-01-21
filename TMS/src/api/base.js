import axios from './index'

export const baseServices = () => {
  return axios.request({
    url: '/api/base/services/',
    method: 'get',
  })
}


export const baseDepartments = () => {
  return axios.request({
    url: '/api/base/departments/',
    method: 'get',
  })
}

export const userList = () => {
  return axios.request({
    url: '/api/user/users/',
    method: 'get',
  })
}


export const baseFiles = ({ids}) => {
  if (ids.length > 0) {
    let ids_str = ids.join(',')
    return axios.request({
      url: '/api/base/files/' + ids_str + '/',
      method: 'get',
    })
  }
}


export const baseFilesPreview = ({id}) => {
  if (id) {
    return axios.request({
      url: '/api/base/files/' + id + '/preview/',
      method: 'get',
    })
  }
}


export const baseApollos = () => {
  return axios.request({
    url: '/api/base/apollos/',
    method: 'get',
  })
}


export const userSearch = (query) => {
  return axios.request({
    url: '/api/user/users/',
    method: 'post',
    data: query
  })
}
