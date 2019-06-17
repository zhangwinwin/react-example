import axios from 'axios'
import env from '@/env'

export default class Request {
  axios (method, url, params) {
    return new Promise ((resolve, reject) => {
      if (typeof params !== 'object') {
        params = {}
        let _option = params
        _option = {
          method,
          url,
          baseURL: env.url + env.baseUrl,
          timeout: 30000,
          params: null,
          data: null,
          headers: null,
          withCredentials: true,
          validateStatus: (status) => {
            return status >= 200 && status < 300
          },
          ...params
        }
        axios.request(_option).then(res => {
          resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
        },
        error => {
          if (error.response) {
            reject(error.response.data)
          } else {
            reject(error)
          }
        })
      }
    })
  }
}