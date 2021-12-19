import apiContract from './models/contract'
import apiUser from './models/user'
// import apiRoom from './models/room'
import apiBill from './models/bill'
// import apiPrice from './models/price'
import { notify } from '../func'
import axios from 'axios'

export {
  apiContract,
  apiUser,
  // apiRoom,
  apiBill,
  // apiPrice
}

const prefix = '/api/'

export async function call(args) {
  const [url, method = 'get', data] = args

  try {
    let rs = await axios[method](`${prefix}${url}`, data)
    if (rs.status !== 200) throw 'Oops! Something went wrong...'
    return rs
  } catch (err) {
    notify('error', 'Oops! Something went wrong...')
  }
}

///// API LIST DEFINITION //////////////////////////////////////////////////////
/* Contract */
export const contractApi = {
  get: query => ['/contracts/list', 'post', query],
  getOne: (roomId, contractId) => [`rooms/${roomId}/contracts/${contractId}`],
  getElectric: (roomId, contractId) => [`rooms/${roomId}/contracts/${contractId}/latest_electric`],
  remove: (roomId, contractId) => [`rooms/${roomId}/contracts/${contractId}`, 'delete'],
  create: roomId => roomId[`rooms/${roomId}/contracts`, 'post']
}

export const roomApi = {
  get: () => ['rooms'],
  add: data => ['rooms', 'post', data],
  getOne: roomId => [`rooms/${roomId}`],
  remove: roomId => [`rooms/${roomId}`, 'delete'],
  update: (id, room) => [`rooms/${id}`, 'put', room],
  assign: roomId => [`rooms/${roomId}/assign`, 'put']
}

export const userApi = {
  get: () => ['user'],
  getOne: id => [`user/${id}`],
  available: () => ['user/available'],
  auth: (type, data) => [`user/${type}`, 'post', data],
  forgot: () => ['user/forgot', 'post'],
  remove: id => [`user/${id}`, 'delete'],
  update: (id, data) => [`user/${id}`, 'put', data],
  activate: id => [`user/${id}/activate`, 'put'],
  reset: token => [`user/${token}/reset`, 'put'],
  password: id => [`user/${id}/password`, 'put'],

  // registration
  openRegistration: () => ['user/registration', 'post'],
  allowRegistration: token => [`user/registration/${token}`],
  submitRegistration: token => [`user/registration/${token}`, 'post'],
  closeRegistration: token => [`user/registration/${token}`, 'delete'],
}

export const priceApi = {
  get: () => ['price'],
  add: () => ['price', 'post'],
  getOne: priceId => [`price/${priceId}`],
  remove: priceId => [`price/${priceId}`, 'delete'],
  update: (id, data) => [`price/${id}`, 'put', data]
}

/* Bill */
export const billApi = {
  generate: (contractId, billId) => [`contracts/${contractId}/bills/${billId}`, 'post'],
  updatePayment: (contractId, billId) => [`contracts/${contractId}/bills/${billId}`, 'put']
}
