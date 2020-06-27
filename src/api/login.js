import axios from 'axios';

async function getCode() {
  let result = '';
  try {
    result = await axios.get('/getCaptcha');
    if (result.status === 200) {
      return result.data;
    }
  } catch (e) {
    console.log(e);
  }
  return result;
}
async function forget(params) {
  let result = '';
  try {
    result = await axios.post('/forget', params);
    if (result.status === 200) {
      return result.data;
    }
  } catch (e) {
    console.log(e);
  }
  return result;
}

export { getCode, forget };
