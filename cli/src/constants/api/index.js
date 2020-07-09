import * as apiContract from './models/contract'
import apiUser from './models/user'
import * as apiRoom from './models/room'
import * as apiBill from './models/bill'
import * as apiPrice from './models/price'
import { notify } from './call'

console.log(apiUser.auth)

export {
  notify,
  apiContract,
  apiUser,
  apiRoom,
  apiBill,
  apiPrice
}
