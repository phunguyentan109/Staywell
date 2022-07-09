import { all, call, put, takeLatest } from 'redux-saga/effects'
import { redisApi, request, userApi } from 'constants/api'
import {
  FETCH_PEOPLE_ACTION,
  GET_REGISTRATION_TOKEN,
  NEW_REGISTRATION_TOKEN,
  REMOVE_PEOPLE_ACTION,
  REMOVE_REGISTRATION_TOKEN
} from '../const'
import { fetchPeopleSuccessAction, getRegistrationTokenSuccessAction } from './action'

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

function* hdGetRegistrationAction() {
  try {
    let rs = yield call(request, redisApi.getRegistrations())

    yield put(getRegistrationTokenSuccessAction(rs.data))
  } catch (e) {
    console.error('error => function* hdGetRegistrationAction', e)
  }
}

function* hdNewRegistrationAction({ cb }) {
  try {
    let rs = yield call(request, redisApi.newRegistration())
    cb(rs)
  } catch (e) {
    console.error('error => function* hdNewRegistrationAction', e)
  }
}

function* hdRemoveRegistrationAction({ token, cb }) {
  try {
    let rs = yield call(request, redisApi.removeRegistration(token))
    cb(rs)
  } catch (e) {
    console.error('error => function* hdGetRegistrationAction', e)
  }
}

export default function* peopleSaga() {
  yield all([
    takeLatest(GET_REGISTRATION_TOKEN, hdGetRegistrationAction),
    takeLatest(NEW_REGISTRATION_TOKEN, hdNewRegistrationAction),
    takeLatest(REMOVE_REGISTRATION_TOKEN, hdRemoveRegistrationAction),
    takeLatest(FETCH_PEOPLE_ACTION, hdFetchPeopleAction),
    takeLatest(REMOVE_PEOPLE_ACTION, hdRemovePeopleAction),
  ])
}
