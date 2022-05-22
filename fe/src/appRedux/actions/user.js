import {
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGOUT_ACTION,
  RELOAD_USER_ACTION,
  VERIFY_USER_TOKEN_ACTION
} from '../const'

export function loginAction(data){
  return {
    type: LOGIN_ACTION,
    data
  }
}

export function loginSuccessAction(data) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    data
  }
}

export function logoutAction(){
  return {
    type: LOGOUT_ACTION,
  }
}

export function sendReloadUser(email){}

export function verifyUserTokenAction(){
  return {
    type: VERIFY_USER_TOKEN_ACTION,
  }
}

export function reloadUserAction(email){
  return {
    type: RELOAD_USER_ACTION,
    email
  }
}
