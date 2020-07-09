import { apiCall, spec, initApiFunc } from '../call'
const common = '/api/user'

// export default async function (name, content, throwErr) {
//   let config, { type, user_id, token } = params
//   switch (name) {
//     case 'get': {
//       config = { url: spec(user_id) }
//       break
//     }
//     case 'remove': {
//       config = { method: 'delete', url: `/${user_id}` }
//       break
//     }
//     case 'update': {
//       config = { url: `/${user_id}` }
//       break
//     }
//     case 'auth': {
//       config = { method: 'post', url: `/${type}` }
//       break
//     }
//     case 'activate': {
//       config = { method: 'put', url: `/${user_id}/activate` }
//       break
//     }
//     case 'forgot': {
//       config = { method: 'post', url: '/forgot' }
//       break
//     }
//     case 'reset': {
//       config = { method: 'put', url: `/${token}/reset` }
//       break
//     }
//     case 'password': {
//       config = { method: 'put', url: `/${user_id}/password` }
//       break
//     }
//     case 'available': {
//       config = { url: '/available' }
//       break
//     }
//     default: config = {}
//   }
//   // Call api
//   config.url = common + config.url
//   return await apiCall({ ...config, data }, throwErr)
// }

// api.funcName()

// api = [
//  {
//    name: 'abc',
//    type: 'post'
//    url: ({a, b}) => 'a/b/...'
//   }
// ]
const apiList = [
  { name: 'auth', type: 'post', url: ({ type }) => `/${type}` }
]

export default initApiFunc(apiList, common)


