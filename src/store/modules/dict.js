import {
  getDict
} from '@/api/dict'

const dictData = {
  state: {
    dict: {}
  },

  mutations: {
    SET_DICT: (state, obj) => {
      state.dict[obj.key] = obj.value
    }
  },

  actions: {
    // flag 是否强制更新
    GetDict({
      commit,
      state
    }, key, flag = false) {
      return new Promise((resolve, reject) => {
        if (state.dict[key] && !flag) {
          resolve(state.dict[key])
          return
        }
        const params = { parentCode: key }
        getDict(params).then(response => {
          commit('SET_DICT', { key: key, value: response.data })
          resolve(response.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default dictData

