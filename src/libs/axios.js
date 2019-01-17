import Axios from 'axios'
import baseURL from '_conf/url'
import { Message } from 'ikpay'
import { getToken, remevoToken } from '@/libs/util'

class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy(url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // if (config.url.includes('/private')) {
          config.headers['authorization'] = getToken() || 'test'
          config.headers['loginAccountId'] = 1
      // }
      // Spin.show()
      // 在发送请求之前做些什么
      return config
    }, error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let { data } = res
      // const is = this.destroy(url)
      // if (!is) {
      //     setTimeout(() => {
      //         Spin.hide()
      //     }, 500)
      // }
      if (data.code !== 200) {
          // 后端服务在个别情况下回报201，待确认
          // if (data.code === 401) {
          //     remevoToken()
          //     window.location.href = window.location.pathname + '#/login'
          // }
        Message.error(data.message || data.errMsg)
        return Promise.reject(res)
      }
      return data.data
    }, (error) => {
      Message.error('服务内部错误')
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create() {
    let conf = {
      baseURL: baseURL,
      // timeout: 2000,
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest(instances = []) {

  }
  // 请求实例
  request(options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    // this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest