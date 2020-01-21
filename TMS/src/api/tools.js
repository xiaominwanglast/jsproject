import axios from './index'

export const adduser = (phone, start, end, env, product, serial_num, bin, other) => {
  return axios.request({
    url: '/api/testtools/adduser/',
    method: 'post',
    data: {
      phone,
      start,
      end,
      env,
      product,
      serial_num,
      bin,
      other
    }
  })
}
export const change = (phone, flag, env, way, product) => {
  return axios.request({
    url: '/api/testtools/change/',
    method: 'post',
    data: {
      phone,
      flag,
      env,
      way,
      product
    }
  })
}

export const operate = (env) => {
  return axios.request({
    url: '/api/testtools/operate/',
    method: 'post',
    data: {
      env
    }
  })
}

export const getbankbin = () => {
  return axios.request({
    url: '/api/testtools/bankbin/',
    method: 'get'
  })
}

export const accountoperate = (env, pageNo, pageSize, isme) => {
  return axios.request({
    url: '/api/testtools/accountoperate/',
    method: 'post',
    data: {
      env,
      pageNo,
      pageSize,
      isme
    }
  })
}

export const getstep = (product) => {
  return axios.request({
    url: '/api/testtools/getstep/',
    method: 'get',
    params: {
      product
    }
  })
}

export const getcurrentstep = (id) => {
  return axios.request({
    url: '/api/testtools/getcurrentstep/',
    method: 'get',
    params: {
      id
    }
  })
}

export const getcollections = (db) => {
  return axios.request({
    url: '/api/testtools/getcollections/',
    method: 'get',
    params: {
      db
    }
  })
}

export const getmongocode = (collection, userId) => {
  return axios.request({
    url: '/api/testtools/getmongocode/',
    method: 'get',
    params: {
      collection,
      userId
    }
  })
}

export const getuserInfo = (name, idcard, phone) => {
  return axios.request({
    url: '/api/testtools/getuserinfo/',
    method: 'get',
    params: {
      name,
      idcard,
      phone
    }
  })
}

export const getuserinfocode = (pageNo, pageSize, isme) => {
  return axios.request({
    url: '/api/testtools/getuserinfocode/',
    method: 'post',
    data: {
      pageNo,
      pageSize,
      isme
    }
  })
}

export const easydecrypt = (data) => {
  return axios.request({
    url: '/api/testtools/decrypt/',
    method: 'post',
    data: {
      data
    }
  })
}

export const endecrypt = (data, type) => {
  return axios.request({
    url: '/api/testtools/endecrypt/',
    method: 'post',
    data: {
      data,
      type
    }
  })
}

export const changeoverdue = (mobilephone, env, borrowdays, prod_id, period_id) => {
  return axios.request({
    url: '/api/testtools/overdue/',
    method: 'post',
    data: {
      mobilephone,
      env,
      borrowdays,
      prod_id,
      period_id
    }
  })
}

export const clearredis = (env, dbNum, phone, project, product) => {
  return axios.request({
    url: '/api/testtools/clearredis/',
    method: 'post',
    data: {
      env,
      dbNum,
      phone,
      project,
      product
    }
  })
}
