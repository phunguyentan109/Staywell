import {
  FETCH_PEOPLE_ACTION,
  FETCH_PEOPLE_SUCCESS_ACTION,
  REMOVE_PEOPLE_ACTION,
  GET_REGISTRATION_TOKEN,
  REMOVE_REGISTRATION_TOKEN, NEW_REGISTRATION_TOKEN, GET_REGISTRATION_TOKEN_SUCCESS
} from '../const'

export function fetchPeopleAction(data){
  return {
    type: FETCH_PEOPLE_ACTION,
    data
  }
}

export function fetchPeopleSuccessAction(data) {
  return {
    type: FETCH_PEOPLE_SUCCESS_ACTION,
    data
  }
}

export function removePeopleAction(userId, cb){
  return {
    type: REMOVE_PEOPLE_ACTION,
    userId,
    cb
  }
}

export function getRegistrationToken() {
  return {
    type: GET_REGISTRATION_TOKEN
  }
}

export function getRegistrationTokenSuccessAction(data) {
  return {
    type: GET_REGISTRATION_TOKEN_SUCCESS,
    data
  }
}

export function newRegistrationToken(cb) {
  return {
    type: NEW_REGISTRATION_TOKEN,
    cb
  }
}

export function removeRegistrationToken(token, cb) {
  return {
    type: REMOVE_REGISTRATION_TOKEN,
    token,
    cb
  }
}
