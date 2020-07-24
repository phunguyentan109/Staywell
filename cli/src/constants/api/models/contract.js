import { initApiFunc, spec } from '../call'

const apiList = [
  {
    name: 'get',
    url: ({ room_id, contract_id }) => `/${room_id}/contracts${spec(contract_id)}`
  },
  {
    name: 'remove',
    method: 'delete',
    url: ({ room_id, contract_id }) => `/${room_id}/contracts/${contract_id}`
  },
  {
    name: 'create',
    method: 'post',
    url: ({ room_id }) => `/${room_id}/contracts`
  }
]

export default initApiFunc(apiList, '/api/rooms')
