import axios from '../utils/request'

/**
 * 获取验证码
 * @param {*} sid
 */
function getCode(sid) {
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

/**
 * 登陆
 * @param {*} useInfo (邮箱，密码，验证码)
 */
function login(useInfo) {
  return axios.post('/login', {
    params: {
      ...useInfo
    }
  })
}

async function forget(params) {
  return axios.post('/forget', params)
}

async function register(userInfo) {
  return axios.post('/register', userInfo)
}

export { getCode, forget, login, register }
