import axios from 'axios'
import { notification } from 'antd'

const CASES = {
  error: { msg: 'Process is not completed.' },
  success: { msg: 'Everything\'s done' }
}

export const spec = id => id ? `/${id}` : ''

export const notify = (type, description) => {
  notification[type]({ message: CASES[type].msg, description })
}

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export async function apiCall(method, path, data) {
  try {
    return (await axios[method](path, data)).data
  } catch (err) {
    localStorage.swToken && notify('error')
    console.error(err)
  }
}

export async function apiFdCall(method, url, data) {
  try {
    return (await axios({
      method, url, data,
      headers: { 'content-type': 'multipart/form-data' }
    })).data
  } catch (err) {
    notify('error')
    console.error(err)
  }
}
