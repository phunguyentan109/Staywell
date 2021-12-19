import axios from 'axios'
import { notification } from 'antd'
import _ from 'lodash'

const CASES = {
  error: { msg: 'Process is not completed.' },
  success: { msg: 'Everything\'s done' }
}

export const spec = id => id ? `/${id}` : ''
export const config = (method, url, data) => ({ method, url, data })

export function notify(type, description) {
  notification[type]({ message: CASES[type].msg, description })
}

export function initApiFunc(apiList, common = '') {
  return _.reduce(apiList, (a, { name, url, method }) => {
    a[name] = async function({ data, ...params } = {}, throwErr) {
      const _url = `${common}${url(params)}`
      return await apiCall({ method, url: _url, data }, throwErr)
    }
    return a
  }, {})
}

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export async function apiCall({ method, url, data }, throwErr) {
  try {
    let rs = await axios[method || 'get'](url, data)
    return rs.data
  } catch (err) {
    if (throwErr) return err.response.data
    notify('error')
    console.error(err.response)
  }
}

// export async function apiFdCall(method, url, data) {
//   try {
//     return (await axios({
//       method, url, data,
//       headers: { 'content-type': 'multipart/form-data' }
//     })).data
//   } catch (err) {
//     notify('error')
//     console.error(err)
//   }
// }
