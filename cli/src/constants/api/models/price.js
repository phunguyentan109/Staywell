import { apiCall, spec } from '../call'
const common = '/api/price'

export default async function (name, { data, params } = {}, throwErr) {
  let config, { price_id } = params
  switch (name) {
    case 'get': {
      config = { url: spec(price_id) }
      break
    }
    case 'remove': {
      config = { method: 'delete', url: `/${price_id}` }
      break
    }
    case 'update': {
      config = { url: `/${price_id}` }
      break
    }
    default: config = { url: '' }
  }
  // Call api
  config.url = common + config.url
  return await apiCall({ ...config, data }, throwErr)
}
