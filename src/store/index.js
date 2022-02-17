import Vue from 'vue'
import Vuex from 'vuex'
import WebSocketClient from '../utils/WebSocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false,
    ws: null,
    count: 0 // 未读消息数量
  },
  mutations: {
    initWebSocket(state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
    setSid(state, value) {
      state.sid = value
    },
    setToken(state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setIsLogin(state, value) {
      state.isLogin = value
    },
    setUserInfo(state, value) {
      state.userInfo = value
      if (value === '') return
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setIsHide(state, value) {
      state.isHide = value
    },
    setMessage(state, msg) {
      console.log('TCL: Data -> store', 99999)
      console.log('TCL: Data -> store', msg.message)
      state.count = msg
    }
  },
  actions: {
    message({ commit }, msg) {
      commit('setMessage', msg)
    }
  },
  modules: {}
})
