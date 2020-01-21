import {userLogin, userInfo, userLogout, userCrossLogin} from '@/api/auth'

const state = {
  userinfo: {}
}

const getters = {
  username: (state) => {
    return state.userinfo.username
  },
  realname: (state) => {
    return state.userinfo.realname
  },
  dev_team: (state) => {
    return [JSON.parse(state.userinfo.department_list).join('-')]
  },
  userinfo: (state) => {
    return state.userinfo
  },
}

const mutations = {
  SET_USER_INFO(state, params) {
    state.userName = params
  }
}

const actions = {

  login({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      userLogin({username, password}).then(res => {
        if (res.data.status) {
          state.userinfo = res.data.data
          userCrossLogin('TMT')
          userCrossLogin('DEVOPS')
          resolve()
        } else {
          reject(res.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  authorization({commit}) {
    return new Promise((resolve, reject) => {
      userInfo().then(res => {
        if (res.data.status) {
          state.userinfo = res.data.data
          resolve()
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({commit}) {
    return new Promise((resolve, reject) => {
      userLogout().then(res => {
        if (res.data.status) {
          resolve()
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  getters,
  state,
  mutations,
  actions,
  modules: {
    //
  }
}
