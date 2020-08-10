import axios from '../utils/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {*} options
 */
const getList = (options) => {
  return axios.get('/public/getList?' + qs.stringify(options))
}

// 温馨提醒
const getTips = () => {
  return axios.get('/public/tips')
}

// 友情链接
const getLinks = () => {
  return axios.get('/public/links')
}

// 本周热议
const getTop = () => {
  return axios.get('/public/topWeek')
}

export { getList, getTips, getTop, getLinks }
