import { apiCall, spec } from '../call'
const common = '/api/user'

export default async function (name, { data, params } = {}, throwErr) {
  let config, { type, user_id, token } = params
  switch (name) {
    case 'get': {
      config = { url: spec(user_id) }
      break
    }
    case 'remove': {
      config = { method: 'delete', url: `/${user_id}` }
      break
    }
    case 'update': {
      config = { url: `/${user_id}` }
      break
    }
    case 'auth': {
      config = { method: 'post', url: `/${type}` }
      break
    }
    case 'activate': {
      config = { method: 'put', url: `/${user_id}/activate` }
      break
    }
    case 'forgot': {
      config = { method: 'post', url: '/forgot' }
      break
    }
    case 'reset': {
      config = { method: 'put', url: `/${token}/reset` }
      break
    }
    case 'password': {
      config = { method: 'put', url: `/${user_id}/password` }
      break
    }
    case 'available': {
      config = { url: '/available' }
      break
    }
    default: config = {}
  }
  // Call api
  config.url = common + config.url
  return await apiCall({ ...config, data }, throwErr)
}

// export async function changePassword(user_id, password) {
//   return await apiCall('put', `${common}/${user_id}/password`, password)
// }
// export async function getAvailable() {
//   return await apiCall('get', `${common}/available`)
// }
//
// export async function remove(user_id) {
//   return await apiCall('delete', `${common}/${user_id}`)
// }
//
// export async function update(user_id, user) {
//   return await apiCall('put', `${common}/${user_id}`, user)
// }
