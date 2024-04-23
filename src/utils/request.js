import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_URL_SUFFIX, // api base_url
  // baseURL:'/api',
  // baseURL: 'https://api-box-dev.hquesoft.com/admin-api',
  baseURL:'http://test.api.rainbow.bailingkeji.com/admin-api',
  timeout: 60000, // 请求超时时间
})

const err = (error) => {
  Vue.prototype.$loading.hide()
  if (error.response) {
    const errorResponse = error.response
    const data = errorResponse.data
    if (errorResponse.status === 401) {
      notification.error({
        message: '登录失效',
        description: data.message
      })
      if (Vue.ls.get(ACCESS_TOKEN)) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }
    } else if (errorResponse.status === 409) {
      notification.error({
        message: '提示',
        description: data.message
      })
    } else if (errorResponse.status === 500) {
      notification.error({
        message: '提示',
        description: '系统错误，错误码500!'
      })
    } else {
      notification.error({
        message: '提示',
        description: data.message || '网络错误!'
      })
    }
  } else {
    notification.error({
      message: '提示',
      description: '网络错误!'
    })
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  Vue.prototype.$loading.show()
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
})

// response interceptor
service.interceptors.response.use((response) => {
  Vue.prototype.$loading.hide()

  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

// const http = {

// }

export {
  installer as VueAxios,
  service as axios
}
