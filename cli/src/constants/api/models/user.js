import { apiCall } from '../call'
const common = '/api/user'

export async function auth(authType, authData) {
  return await apiCall('post', `${common}/${authType}`, authData)
}

export async function getOne(user_id) {
  return await apiCall('get', `${common}/${user_id}`)
}

export async function activate(user_id) {
  return await apiCall('put', `${common}/${user_id}/activate`)
}

export async function forgot(email) {
  return await apiCall('post', `${common}/forgot`, email)
}

export async function resetPassword(token, password) {
  return await apiCall('put', `${common}/${token}/reset`, password)
}

export async function changePassword(user_id, password) {
  return await apiCall('put', `${common}/${user_id}/password`, password)
}

export async function get() {
  return await apiCall('get', common)
}

export async function getAvailable() {
  return await apiCall('get', `${common}/available`)
}

export async function remove(user_id) {
  return await apiCall('delete', `${common}/${user_id}`)
}

export async function update(user_id, user) {
  return await apiCall('put', `${common}/${user_id}`, user)
}
