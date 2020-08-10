import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid(state, value) {
      state.sid = value
    },
    setIsLogin(state, value) {
      state.isLogin = value
    },
    setUserInfo(state, value) {
      state.userInfo = value
    }
  },
  actions: {},
  modules: {}
})
