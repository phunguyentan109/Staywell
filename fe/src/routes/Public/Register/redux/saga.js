import { all, call, takeLatest } from 'redux-saga/effects'
import { redisApi, request } from 'constants/api'
import { REGISTER_USER_ACTION } from '../const'

function* hdRegisterUser({ data, cb }) {
  try {
    let rs = yield call(request, redisApi.add(data))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdRemoveRoomAction', e)
    cb()
  }
}

export default function* roomSaga() {
  yield all([
    takeLatest(REGISTER_USER_ACTION, hdRegisterUser),
  ])
}
