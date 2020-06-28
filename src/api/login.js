import axios from '../utils/request';

function getCode() {
  return axios.get('/getCaptcha');
}
async function forget(params) {
  return axios.post('/forget', params);
}

export { getCode, forget };
