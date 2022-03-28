import {
  CREATE_PRICE_ACTION,
  EDIT_PRICE_ACTION,
  FETCH_PRICE_ACTION,
  FETCH_PRICE_SUCCESS_ACTION,
  REMOVE_PRICE_ACTION
} from '../const'

export function fetchPriceAction(data){
  return {
    type: FETCH_PRICE_ACTION,
    data
  }
}

export function fetchPriceSuccessAction(data) {
  return {
    type: FETCH_PRICE_SUCCESS_ACTION,
    data
  }
}

export function createPriceAction(data, cb){
  return {
    type: CREATE_PRICE_ACTION,
    data,
    cb
  }
}

export function editPriceAction(data, cb){
  return {
    type: EDIT_PRICE_ACTION,
    data,
    cb
  }
}

export function removePriceAction(roomId, cb){
  return {
    type: REMOVE_PRICE_ACTION,
    roomId,
    cb
  }
}
