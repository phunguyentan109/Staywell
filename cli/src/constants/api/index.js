import apiContract from './models/contract'
import apiUser from './models/user'
import apiRoom from './models/room'
import apiBill from './models/bill'
import apiPrice from './models/price'
// import { notify } from './call'
import { notify } from '../func'
import axios from 'axios'
// import { spec } from './call'

export {
  notify,
  apiContract,
  apiUser,
  apiRoom,
  apiBill,
  apiPrice
}

const prefix = '/api/'

export async function api(url, method = 'get', data) {
  try {
    let rs = await axios[method](`${prefix}${url}`, data)
    if (rs.status !== 200) notify('error', 'Oops! Something went wrong...')
    return rs
  } catch (err) {
    notify('error', 'Oops! Something went wrong...')
    return { status: 500, error: err.response.data }
  }
}

///// API LIST DEFINITION //////////////////////////////////////////////////////
/* Contract */
export const contract = {
  get: roomId => `/${roomId}/contracts`,
  getOne: (roomId, contractId) => `/${roomId}/contracts/${contractId}`,
  getElectric: (roomId, contractId) => `/${roomId}/contracts/${contractId}/latest_electric`,
  remove: (roomId, contractId) => `/${roomId}/contracts/${contractId}`,
  create: roomId => `/${roomId}/contracts`
}

/* Room */
/* User */
/* Price */
