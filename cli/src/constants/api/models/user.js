import { spec, initApiFunc } from '../call'

const apiList = [
  { name: 'get', url: ({ user_id }) => spec(user_id) },
  { name: 'available', url: () => '/available' },
  { name: 'auth', method: 'post', url: ({ type }) => `/${type}` },
  { name: 'forgot', method: 'post', url: () => '/forgot' },
  { name: 'remove', method: 'delete', url: ({ user_id }) => `/${user_id}` },
  { name: 'update', method: 'put', url: ({ user_id }) => `/${user_id}` },
  { name: 'activate', method: 'put', url: ({ user_id }) => `/${user_id}/activate` },
  { name: 'reset', method: 'put', url: ({ token }) => `/${token}/reset` },
  { name: 'password', method: 'put', url: ({ user_id }) => `/${user_id}/password` }
]

export default initApiFunc(apiList, '/api/user')


