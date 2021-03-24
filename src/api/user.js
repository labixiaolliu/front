import axios from '../utils/request'
import qs from 'qs'

const userSign = () => {
  return axios.get('/user/fav')
}
const updateUserInfo = (param) => {
  return axios.post('user/basic', param)
}
//邮箱重置
const updateUsername = (param) => {
  return axios.get('public/resetEmail?' + qs.stringify(param))
}
// 忘记密码
const updatePassword = (param) => {
  return axios.get('public/updatePassword?' + qs.stringify(param))
}
// 修改密码
const resetPassword = (param) => {
  return axios.post('user/resetPassword', param)
}

export { userSign, updateUserInfo, updateUsername, updatePassword, resetPassword }
