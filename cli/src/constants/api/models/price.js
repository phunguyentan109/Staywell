import { initApiFunc, spec } from '../call'

const apiList = [
  { name: 'get', url: ({ price_id }) => spec(price_id) },
  { name: 'create', method: 'post', url: () => '' },
  { name: 'remove', method: 'delete', url: ({ price_id }) => `/${price_id}` },
  { name: 'update', method: 'put', url: ({ price_id }) => `/${price_id}` }
]

export default initApiFunc(apiList, '/api/price')
