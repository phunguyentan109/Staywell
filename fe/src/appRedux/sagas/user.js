import { all, call, delay, put, takeLatest } from 'redux-saga/effects'
import { request, userApi } from 'constants/api'
import { setTokenHeader } from 'constants/api/call'
import { CLI_STORE_KEYS, LOGIN_ACTION, LOGOUT_ACTION, RELOAD_USER_ACTION, VERIFY_USER_TOKEN_ACTION } from '../const'
import { loginSuccessAction, reloadUserAction } from 'appRedux/actions/user'
import jwtDecode from 'jwt-decode'

function* hdLoginAction({ data }) {
  try {
    let rs = yield call(request, userApi.logIn(data))

    if (rs.data) {
      const { token, ...user } = rs.data

      if (token) setTokenHeader(token)

      localStorage.setItem(CLI_STORE_KEYS.token, token)
      sessionStorage.setItem(CLI_STORE_KEYS.token, JSON.stringify(user))

      yield put(loginSuccessAction(user))
    }
  } catch (e) {
    console.error('error => function* hdLoginAction', e)
  }
}

function* hdLogOutAction() {
  sessionStorage.removeItem(CLI_STORE_KEYS.token)

  localStorage.removeItem(CLI_STORE_KEYS.token)

  setTokenHeader(false)

  yield put(loginSuccessAction())
}

function* hdVerifyUserToken() {
  if (!localStorage[CLI_STORE_KEYS.token]) return

  try {
    setTokenHeader(localStorage[CLI_STORE_KEYS.token])

    if (sessionStorage[CLI_STORE_KEYS.token]) {
      const user = JSON.parse(sessionStorage[CLI_STORE_KEYS.token])
      return yield put(loginSuccessAction(user))
    }

    let { email } = jwtDecode(localStorage[CLI_STORE_KEYS.token])

    yield delay(2000)

    yield put(reloadUserAction(email))
  } catch (err) {
    yield put(hdLogOutAction())
    console.error('error => function* hdVerifyUserToken', err)
  }
}

function* hdReloadUser({ email }) {
  try {
    let rs = yield call(request, userApi.getOne({ email }))

    if (rs.data) {
      const { token, ...user } = rs.data
      sessionStorage.setItem(CLI_STORE_KEYS.token, JSON.stringify(user))
      localStorage.setItem(CLI_STORE_KEYS.token, token)
      yield put(loginSuccessAction(user))
    }
  } catch (e) {
    console.error('error => function* hdReloadUser', e)
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(LOGIN_ACTION, hdLoginAction),
    takeLatest(VERIFY_USER_TOKEN_ACTION, hdVerifyUserToken),
    takeLatest(RELOAD_USER_ACTION, hdReloadUser),
    takeLatest(LOGOUT_ACTION, hdLogOutAction)
  ])
}
