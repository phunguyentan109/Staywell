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

export async function call(url, method = 'get', data) {
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
export const contractApi = {
  get: roomId => [`rooms/${roomId}/contracts`],
  getOne: (roomId, contractId) => [`rooms/${roomId}/contracts/${contractId}`],
  getElectric: (roomId, contractId) => [`rooms/${roomId}/contracts/${contractId}/latest_electric`],
  remove: (roomId, contractId) => [`rooms/${roomId}/contracts/${contractId}`, 'delete'],
  create: roomId => [`rooms/${roomId}/contracts`, 'post']
}

/* Room */
export const roomApi = {
  get: () => ['rooms'],
  create: () => ['rooms', 'post'],
  getOne: roomId => [`rooms/${roomId}`],
  remove: roomId => [`rooms/${roomId}`, 'delete'],
  update: roomId => [`rooms/${roomId}`, 'put'],
  assign: roomId => [`rooms/${roomId}/assign`, 'put']
}

/* User */
export const userApi = {
  get: () => ['user'],
  getOne: userId => [`user/${userId}`],
  available: () => ['user/available'],
  auth: type => [`user/${type}`, 'post'],
  forgot: () => ['user/forgot', 'post'],
  remove: userId => [`user/${userId}`, 'delete'],
  update: userId => [`user/${userId}`, 'put'],
  activate: userId => [`user/${userId}/activate`, 'put'],
  reset: token => [`user/${token}/reset`, 'put'],
  password: userId => [`user/${userId}/password`, 'put']
}

/* Price */
export const priceApi = {
  get: () => ['price'],
  create: () => ['price', 'post'],
  getOne: priceId => [`price/${priceId}`],
  remove: priceId => [`price/${priceId}`, 'delete'],
  update: priceId => [`price/${priceId}`, 'put']
}

/* Bill */
export const billApi = {
  generate: (contractId, billId) => [`contracts/${contractId}/bills/${billId}`, 'post'],
  updatePayment: (contractId, billId) => [`contracts/${contractId}/bills/${billId}`, 'put']
}
