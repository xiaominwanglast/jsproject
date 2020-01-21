import axios from './index'

export const userLogin = ({username, password}) => {
  return axios.request({
    url: '/api/user/session/',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}


export const userInfo = () => {
  return axios.request({
    url: '/api/user/session/',
    method: 'get',
  })
}


export const userLogout = () => {
  return axios.request({
    url: '/api/user/session/',
    method: 'delete',
  })
}


export const userCrossLogin = (name) => {
  return axios.request({
    url: '/api/user/usercrosslogin/'+name,
    method: 'get',
  })
}