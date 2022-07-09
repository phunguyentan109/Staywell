import { REGISTER_USER_ACTION, REGISTER_USER_ACTION_SUCCESS } from '../const'

export function registerUserAction(data, cb){
  return {
    type: REGISTER_USER_ACTION,
    data,
    cb
  }
}

export function registerUserActionSuccess(data, cb){
  return {
    type: REGISTER_USER_ACTION_SUCCESS,
    data,
    cb
  }
}
