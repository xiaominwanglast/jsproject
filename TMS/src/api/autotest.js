import axios from './index'

export const getsuitename = (project_id) => {
  return axios.request({
    url: '/api/autotest/getsuitename/',
    method: 'get',
    params: {
      project_id
    }
  })
}

export const getcasename = (project_id, suite_name) => {
  return axios.request({
    url: '/api/autotest/getcasename/',
    method: 'get',
    params: {
      project_id,
      suite_name
    }
  })
}

export const rfrunner = (project_id, env, suitename, casename) => {
  return axios.request({
    url: '/api/autotest/rfrunner/' + project_id + '/',
    method: 'post',
    data: {
      env,
      suitename,
      casename
    }
  })
}

export const GetTestResult = (project_id, limit, offset) => {
  return axios.request({
    url: '/api/autotest/project/report/',
    method: 'get',
    params: {
      project_id,
      limit,
      offset,
    }
  })
}


export const getProject = () => {
  return axios.request({
    url: '/api/autotest/project/',
    method: 'get',
  })
}

export const getProjectIdStatus = (status_id) => {
  return axios.request({
    url: '/api/autotest/project/'+status_id+'/report/status/',
    method: 'get',
  })
}

export const getCharts = (project_id) => {
  return axios.request({
    url: '/api/autotest/'+project_id+'/overview/',
    method: 'get',
  })
}

export const getTj = (project_id) => {
  return axios.request({
    url: '/api/autotest/project/TJ/'+project_id,
    method: 'get',
  })
}

export const GetFactorList = (factType, limit, offset) => {
  return axios.request({
    url: '/api/autotest/project/factorList/',
    method: 'get',
    params: {
      factType,
      limit,
      offset,
    }
  })
}

export const getFactorTypeCase = (factType) => {
  return axios.request({
    url: '/api/autotest/project/factorTypeList/',
    method: 'get',
    params: {
      factType,
    }
  })
}

export const runfactor = (project_id, env, cases) => {
  return axios.request({
    url: '/api/autotest/factor/runner/',
    method: 'post',
    data: {
      project_id,
      env,
      cases
    }
  })
}