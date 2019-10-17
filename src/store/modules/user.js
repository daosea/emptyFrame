//import { login } from '@/api/authen'  //临时去掉登录接口
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import JsEncrypt from 'jsencrypt'
import md5 from 'js-md5'
const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// TODO 暂时去掉登陆
const actions = {
  login({ commit }, userInfo) {
    //---------------------------------------------------
    // const { publicKey, randomId, username, password } = userInfo
    // const encryptor = new JsEncrypt()
    // encryptor.setPublicKey(publicKey)
    // const usernameEncryptor = encryptor.encrypt(username)
    // const passwordEncryptor = encryptor.encrypt(password)
    // const sign = md5(username + ':' + password)

    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', 'token')
      setToken('token')
      resolve()

      // const loginParams = { publickey: randomId, username: usernameEncryptor, password: passwordEncryptor, sign: sign }
      // const headers = { 'Authorization': 'Basic aXNzdGVjaDppc3N0ZWNoc2VjcmV0', 'deviceId': 'ba968a1f2c60168a1' }
      // login(loginParams, headers).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
       //---------------------------------------------------
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = { name: '测试', avatar: '' }
      const { name, avatar } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      resolve(data)
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

