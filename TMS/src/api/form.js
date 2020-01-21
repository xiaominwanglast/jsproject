import axios from './index'


// 模板
export const createOrUpdateFormTemplate = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/form/template/' + id + '/',
      method: 'put',
      data: data,
    })
  } else {
    return axios.request({
      url: '/api/form/template/',
      method: 'post',
      data: data,
    })
  }
}

export const getFormTemplate = ({id}) => {
  return axios.request({
    url: '/api/form/template/' + id + '/',
    method: 'get',
  })
}

export const deleteFormTemplate = ({id}) => {
  return axios.request({
    url: '/api/form/template/' + id + '/',
    method: 'delete',
  })
}


export const getFormTemplateList = () => {
  return axios.request({
    url: '/api/form/template/',
    method: 'get',
  })
}


// 项目

export const createOrUpdateFormProject = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/form/project/' + id + '/',
      method: 'put',
      data: data,
    })
  } else {
    return axios.request({
      url: '/api/form/project/',
      method: 'post',
      data: data,
    })
  }
}

export const getFormProject = (id) => {
  return axios.request({
    url: '/api/form/project/' + id + '/',
    method: 'get',
  })
}

export const deleteFormProject = (id) => {
  return axios.request({
    url: '/api/form/project/' + id + '/',
    method: 'delete',
  })
}


export const getFormProjectList = (group_name) => {
  return axios.request({
    url: '/api/form/project/group/' + group_name + '/',
    method: 'get',
  })
}


// 任务

export const createOrUpdateFormTask = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/form/task/' + id + '/',
      method: 'put',
      data: data,
    })
  } else {
    return axios.request({
      url: '/api/form/task/',
      method: 'post',
      data: data,
    })
  }
}

export const getFormTask = (id) => {
  return axios.request({
    url: '/api/form/task/' + id + '/',
    method: 'get',
  })
}

export const deleteFormTask = (id) => {
  return axios.request({
    url: '/api/form/task/' + id + '/',
    method: 'delete',
  })
}


export const getFormTaskList = (project_id) => {
  return axios.request({
    url: '/api/form/task/project/' + project_id + '/',
    method: 'get',
  })
}


// 表单
export const getFormFormList = (task_id) => {
  return axios.request({
    url: '/api/form/task/form/' + task_id + '/',
    method: 'get',
  })
}


export const UpdateFormForm = ({data}) => {
  let id = data.id
  delete  data.id
  if (id) {
    return axios.request({
      url: '/api/form/form/' + id + '/',
      method: 'put',
      data: data,
    })
  }
}