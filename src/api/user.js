import axios from '../utils/request'
import qs from 'qs'

const userSign = () => {
  return axios.get('/user/fav')
}
const updateUserInfo = (param) => {
  return axios.post('user/basic', param)
}

const updateUsername = (param) => {
  return axios.get('public/resetEmail?' + qs.stringify(param))
}

const updatePassword = (param) => {
  return axios.get('public/resetPassword?' + qs.stringify(param))
}

export { userSign, updateUserInfo, updateUsername, updatePassword }
