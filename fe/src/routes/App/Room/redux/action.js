import {
  ASSIGN_ROOM_ACTION,
  CREATE_ROOM_ACTION,
  EDIT_ROOM_ACTION, FETCH_AVAILABLE_PEOPLE_ACTION, FETCH_PRICE_ACTION,
  FETCH_ROOM_ACTION,
  FETCH_ROOM_SUCCESS_ACTION,
  REMOVE_ROOM_ACTION
} from '../const'

export function fetchRoomAction(data){
  return {
    type: FETCH_ROOM_ACTION,
    data
  }
}

export function fetchRoomSuccessAction(data) {
  return {
    type: FETCH_ROOM_SUCCESS_ACTION,
    data
  }
}

export function createRoomAction(data, cb){
  return {
    type: CREATE_ROOM_ACTION,
    data,
    cb
  }
}

export function editRoomAction(data, cb){
  return {
    type: EDIT_ROOM_ACTION,
    data,
    cb
  }
}

export function removeRoomAction(roomId, cb){
  return {
    type: REMOVE_ROOM_ACTION,
    roomId,
    cb
  }
}

export function fetchAvailablePeopleAction(cb){
  return {
    type: FETCH_AVAILABLE_PEOPLE_ACTION,
    cb
  }
}

export function assignRoomAction(roomId, data, cb){
  return {
    type: ASSIGN_ROOM_ACTION,
    roomId,
    data,
    cb
  }
}

export function fetchPriceAction(cb){
  return {
    type: FETCH_PRICE_ACTION,
    cb
  }
}
