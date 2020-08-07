import axios from 'axios'
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/api'
})

// 请求拦截
http.interceptors.request.use(
  config => {
    // 添加请求头
    if (localStorage.token) config.headers.Authorization = 'Bearer ' + localStorage.token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 请求失败提示错误原因
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    // err.response.status 获取错误状态码，err.response.data.message 是错误原因，如果后台有这个字段
    // if (err.response.data.message) {
    //   Vue.$message.error(err.response.data.message)
    // } else {
    //   console.log('请求失败')
    //   Vue.$message.error('默认错误提示')
    // }

    // TODO 对状态码进行特殊判断
    return Promise.reject(err)
  }
)

export default http
