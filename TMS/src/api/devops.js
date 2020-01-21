import {axios_devops} from './index'

export const getAllServers = ({ env,dept }) => {
  return axios_devops.request({
    url: '/api/deploy/servers/',
    method: 'get',
    params: {
      env,
      dept
    }
  })
}



export const getHistorys = ({ env }) => {
  return axios_devops.request({
    url: '/api/deploy/historys/',
    method: 'get',
    params: {
      env
    }
  })
}


export const startSever = ({ env,server_name }) => {
  return axios_devops.request({
    url: '/api/deploy/startserver/',
    method: 'post',
    data: {
      env,
      server_name
    }
  })
}


export const checkStatus = ({ env,server_name }) => {
  return axios_devops.request({
    url: '/api/deploy/checkstatus/',
    method: 'post',
    data: {
      env,
      server_name
    }
  })
}


export const stopServer = ({ env,server_name }) => {
  return axios_devops.request({
    url: '/api/deploy/stopserver/',
    method: 'post',
    data: {
      env,
      server_name
    }
  })
}

export const getLastLog = ({ env,server_name }) => {
  return axios_devops.request({
    url: '/api/deploy/getlastlog/',
    method: 'get',
    params: {
      env,
      server_name
    }
  })
}

export const getTips = ({ env,server_name }) => {
  return axios_devops.request({
    url: '/api/deploy/gettips/',
    method: 'get',
    params: {
      env,
      server_name
    }
  })
}


export const getServerLog = ({ env,server_name }) => {
  return axios_devops.request({
    url: '/api/deploy/getserverlog/',
    method: 'get',
    params: {
      env,
      server_name
    }
  })
}

//bugtool
export const getBugNumbers = ({ date_start,date_end }) => {
  return axios_devops.request({
    url: '/api/bugtool/getbugnumbers/',
    method: 'post',
    data: {
      date_start,
      date_end
    }
  })
}