import { all, call, put, takeLatest } from 'redux-saga/effects'
import { request, userApi } from 'constants/api'
import { FETCH_PEOPLE_ACTION, REMOVE_PEOPLE_ACTION } from '../const'
import { fetchPeopleSuccessAction } from './action'

function* hdFetchPeopleAction() {
  try {
    let rs = yield call(request, userApi.get())

    yield put(fetchPeopleSuccessAction(rs.data))
  } catch (e) {
    console.error('error => function* hdFetchPeopleAction', e)
  }
}

function* hdRemovePeopleAction({ userId, cb }) {
  try {
    let rs = yield call(request, userApi.remove(userId))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdRemovePeopleAction', e)
    cb()
  }
}

export default function* peopleSaga() {
  yield all([
    takeLatest(FETCH_PEOPLE_ACTION, hdFetchPeopleAction),
    takeLatest(REMOVE_PEOPLE_ACTION, hdRemovePeopleAction),
  ])
}
