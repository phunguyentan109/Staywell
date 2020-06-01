import { apiCall } from '../call'

export async function auth(authType, authData) {
  return await apiCall('post', `/api/user/${authType}`, authData)
}

export async function getOne(user_id) {
  return await apiCall('get', `/api/user/${user_id}`)
}

export async function activate(user_id) {
  return await apiCall('put', `/api/user/${user_id}/activate`)
}

export async function forgot(email) {
  return await apiCall('post', '/api/user/forgot', email)
}

export async function resetPassword(token, password) {
  return await apiCall('put', `/api/user/${token}/reset`, password)
}

export async function changePassword(user_id, password) {
  return await apiCall('put', `/api/user/${user_id}/password`, password)
}

export async function get() {
  return await apiCall('get', '/api/user')
}

export async function getAssign() {
  return await apiCall('get', '/api/user/assign')
}

export async function remove(user_id) {
  return await apiCall('delete', `/api/user/${user_id}`)
}

export async function update(user_id, user) {
  return await apiCall('put', `/api/user/${user_id}`, user)
}
