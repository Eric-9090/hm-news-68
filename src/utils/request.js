/* 处理axios发送请求 */
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

// 把axios挂载到vue的原型上
Vue.prototype.$axios = axios
// 全局的axios 配置baseURL 基准地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 给axios配置拦截器
axios.interceptors.request.use(function(config) {
  // config:请求的配置信息
  // console.log('拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(function(response) {
  // console.log('拦截到了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1.跳转到登陆页面
    router.push('/login')
    // 2.清除失效信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3.提示 用户验证失败
    Toast.fail('登陆信息失效')
  }
  return response
})
