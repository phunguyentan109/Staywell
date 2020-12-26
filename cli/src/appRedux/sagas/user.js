import { takeLatest, call, put } from 'redux-saga/effects'
import {
  SEND_AUTH_DATA,
  CLEAR_AUTH_DATA,
  SEND_RELOAD_USER,
  ACTIVATED_USER
} from 'constants/ActionTypes'
import { apiUser, userApi, call as apiCall } from 'constants/api'
import { setTokenHeader } from 'constants/api/call'
import { addUser } from 'appRedux/actions/user'
import { addMessage } from 'appRedux/actions/message'
import _ from 'lodash'

function* hdAuthData({ value }) {
  const type = _.get(value, 'params', '')
  let auth = yield call(apiCall, ...userApi.auth(value.type), value.data)
  // If error, then finish here

  if (_.get(auth, 'status') === 200) {
    const { data: { token, ...user } } = auth
    setTokenHeader(token)
    localStorage.setItem('swtoken', token)
    sessionStorage.setItem('auth', JSON.stringify(user))
    yield put(addUser(user))
  } else {
    return yield put(addMessage(_.get(auth, 'error.errorMsg')))
  }

  // inform user to check mail after success registration
  if (type === '/signup') {
    let msg = 'A verification link from us has been sent to your mail.'
    yield put(addMessage(msg, false))
  }
}

function* hdClearAuthData() {
  sessionStorage.clear()
  localStorage.clear()
  setTokenHeader(false)
  yield put(addUser())
}

function* hdAfterActivate() {
  sessionStorage.clear()
  localStorage.clear()
  yield put(addUser())
}

function* hdReloadUser({ value }) {
  let data = yield call(apiUser.get, value)
  if (!data.errorMsg) {
    const { token, ...user } = data
    sessionStorage.setItem('auth', JSON.stringify(user))
    localStorage.setItem('swtoken', token)
    yield put(addUser(user))
  }
}

export default [
  takeLatest(SEND_AUTH_DATA, hdAuthData),
  takeLatest(ACTIVATED_USER, hdAfterActivate),
  takeLatest(SEND_RELOAD_USER, hdReloadUser),
  takeLatest(CLEAR_AUTH_DATA, hdClearAuthData)
]
