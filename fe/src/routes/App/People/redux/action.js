import {
  FETCH_PEOPLE_ACTION,
  FETCH_PEOPLE_SUCCESS_ACTION,
  REMOVE_PEOPLE_ACTION,
  CREATE_REGISTRATION_TOKEN
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

export function createRegistrationToken() {
  return {
    type: CREATE_REGISTRATION_TOKEN
  }
}
