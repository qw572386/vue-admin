import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router'

let loading = null
const startLoading = function () {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0, .7)'
  })
}
const endLoading = function () {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 加载动画
    startLoading()
    if (localStorage.getItem('token')) {
      // 设置统一的请求头
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    endLoading()
    return response.data
  },
  error => {
    endLoading()
    Message.error(error.response.data)
    // 获取错误状态码
    const { status } = error.response
    if (status === 401) {
      Message.error('token失效，请重新登录')
      // 清除token
      localStorage.removeItem('token')
      // 跳转登录页
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default axios
