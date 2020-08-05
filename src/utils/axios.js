import axios from 'axios'
import errorHandle from './errorHandle'
const CancelToken = axios.CancelToken
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return config
  }
  removePending(key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }
  interceptor(instance) {
    instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        let key = config.url + '&' + config.method
        console.log('key:' + key)
        this.removePending(key, true)
        config.cancelToken = new CancelToken((c) => {
          this.pending[key] = c
        })
        return config
      },
      (error) => {
        // Do something with request error
        errorHandle(error)
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        let key = response.config.url + '&' + response.config.method
        this.removePending(key)
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response.status === 200) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(response)
        }
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        errorHandle(error)
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    const newConfig = Object.assign(this.getInsideConfig(), options)
    this.interceptor(instance)
    return instance(newConfig)
  }
  get(url, config) {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.request(options)
  }
  post(url, data) {
    const options = {
      method: 'post',
      data: data,
      url: url
    }
    return this.request(options)
  }
}

export default HttpRequest
