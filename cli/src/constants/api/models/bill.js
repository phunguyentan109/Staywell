import { initApiFunc } from '../call'

const apiList = [
  {
    name: 'generate',
    method: 'post',
    url: ({ contract_id, room_id, bill_id }) => {
      return `/api/rooms/${room_id}/contracts/${contract_id}/bills/${bill_id}`
    }
  },
  {
    name: 'updatePayment',
    method: 'put',
    url: ({ contract_id, room_id, bill_id }) => {
      return `/api/rooms/${room_id}/contracts/${contract_id}/bills/${bill_id}`
    }
  }
]

export default initApiFunc(apiList)
