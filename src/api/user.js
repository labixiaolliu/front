import axios from '../utils/request'
import store from '@/store'

const userSign = () => {
  const headers = {
    Authorization: 'Bearer ' + store.state.token,
    'Content-Type': 'application/json'
  }
  return axios.get('/user/fav', { headers })
}

export { userSign }
