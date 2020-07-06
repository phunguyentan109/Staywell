import { apiCall, spec } from '../call'
const common = '/api/rooms'

export default async function (name, { data, params } = {}, throwErr) {
  let config, { room_id } = params
  switch (name) {
    case 'get': {
      config = { url: spec(room_id) }
      break
    }
    case 'remove': {
      config = { method: 'delete', url: `/${room_id}` }
      break
    }
    case 'update': {
      config = { url: `/${room_id}` }
      break
    }
    case 'assign': {
      config = { url: `/${room_id}/assign` }
      break
    }
    default: config = { url: '' }
  }
  // Call api
  config.url = common + config.url
  return await apiCall({ ...config, data }, throwErr)
}
