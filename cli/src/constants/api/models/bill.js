import { initApiFunc } from '../call'

const apiList = [
  { name: 'create', method: 'post', url: ({ contract_id }) => `/api/contracts/${contract_id}/bills` }
]

export default initApiFunc(apiList)
