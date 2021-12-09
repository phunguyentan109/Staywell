import { call, put, takeLatest } from 'redux-saga/effects'
import { CLEAR_AUTH_DATA, SEND_AUTH_DATA, SEND_RELOAD_USER } from 'constants/ActionTypes'
import { call as apiCall, userApi } from 'constants/api'
import { setTokenHeader } from 'constants/api/call'
import { addUser } from 'appRedux/actions/user'
import { addMessage } from 'appRedux/actions/message'
import _ from 'lodash'

function* hdAuthData({ value }) {
  try {
    const type = _.get(value, 'params', '')
    let auth = yield call(apiCall, userApi.auth(value.type, value.data))

    if (_.get(auth, 'status') !== 200) {
      return yield put(addMessage(_.get(auth, 'error.errorMsg')))
    }

    const { data: { token, ...user } } = auth
    setTokenHeader(token)
    localStorage.setItem('swtoken', token)
    sessionStorage.setItem('auth', JSON.stringify(user))
    yield put(addUser(user))

    // inform user to check mail after success registration
    if (type === '/signup') {
      let msg = 'A verification link from us has been sent to your mail.'
      yield put(addMessage(msg, false))
    }
  } catch (e) {
    console.error('error => function* hdAuthData', e)
  }
}

function* hdClearAuthData() {
  sessionStorage.clear()
  localStorage.clear()
  setTokenHeader(false)
  yield put(addUser())
}

function* hdReloadUser({ id }) {
  try {
    let data = yield call(userApi.getOne(id))

    if (!data.errorMsg) {
      const { token, ...user } = data
      sessionStorage.setItem('auth', JSON.stringify(user))
      localStorage.setItem('swtoken', token)
      yield put(addUser(user))
    }
  } catch (e) {
    console.error('error => function* hdAuthData', e)
  }
}

export default [
  takeLatest(SEND_AUTH_DATA, hdAuthData),
  takeLatest(SEND_RELOAD_USER, hdReloadUser),
  takeLatest(CLEAR_AUTH_DATA, hdClearAuthData)
]
