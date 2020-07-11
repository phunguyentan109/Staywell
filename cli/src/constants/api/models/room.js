import { spec, initApiFunc } from '../call'

const apiList = [
  { name: 'get', url: ({ room_id }) => spec(room_id) },
  { name: 'create', method: 'post', url: () => '' },
  { name: 'remove', method: 'delete', url: ({ room_id }) => `/${room_id}` },
  { name: 'update', method: 'put', url: ({ room_id }) => `/${room_id}` },
  { name: 'assign', method: 'put', url: ({ room_id }) => `/${room_id}/assign` }
]

export default initApiFunc(apiList, '/api/rooms')
