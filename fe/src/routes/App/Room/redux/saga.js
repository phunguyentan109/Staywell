import { all, call, put, takeLatest } from 'redux-saga/effects'
import { priceApi, request, roomApi, userApi } from 'constants/api'
import {
  ASSIGN_ROOM_ACTION,
  CREATE_ROOM_ACTION, EDIT_ROOM_ACTION, FETCH_AVAILABLE_PEOPLE_ACTION,
  FETCH_PRICE_ACTION,
  FETCH_ROOM_ACTION,
  REMOVE_ROOM_ACTION
} from '../const'
import { fetchRoomSuccessAction } from './action'

function* hdFetchRoomAction() {
  try {
    let rs = yield call(request, roomApi.get())

    yield put(fetchRoomSuccessAction({
      rooms: rs.data
    }))
  } catch (e) {
    console.error('error => function* hdFetchRoomAction', e)
  }
}

function* hdFetchPriceAction({ cb }) {
  try {
    let rs = yield call(request, priceApi.get())

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdFetchPriceAction', e)
    cb()
  }
}

function* hdFetchAvailablePeopleAction({ cb }) {
  try {
    let rs = yield call(request, userApi.available())

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdFetchAvailablePeopleAction', e)
    cb()
  }
}

function* hdCreateRoomAction({ data, cb }) {
  try {
    let rs = yield call(request, roomApi.add(data))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdRemoveRoomAction', e)
    cb()
  }
}

function* hdEditRoomAction({ data, cb }) {
  try {
    let rs = yield call(request, roomApi.update(data._id, data))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdEditRoomAction', e)
    cb()
  }
}

function* hdRemoveRoomAction({ roomId, cb }) {
  try {
    let rs = yield call(request, roomApi.remove(roomId))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdRemoveRoomAction', e)
    cb()
  }
}

function* hdAssignRoomAction({ data, roomId, cb }) {
  try {
    let rs = yield call(request, roomApi.assign(roomId, data))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdAssignRoomAction', e)
    cb()
  }
}

export default function* roomSaga() {
  yield all([
    takeLatest(FETCH_ROOM_ACTION, hdFetchRoomAction),
    takeLatest(FETCH_AVAILABLE_PEOPLE_ACTION, hdFetchAvailablePeopleAction),
    takeLatest(CREATE_ROOM_ACTION, hdCreateRoomAction),
    takeLatest(EDIT_ROOM_ACTION, hdEditRoomAction),
    takeLatest(REMOVE_ROOM_ACTION, hdRemoveRoomAction),
    takeLatest(ASSIGN_ROOM_ACTION, hdAssignRoomAction),
    takeLatest(FETCH_PRICE_ACTION, hdFetchPriceAction),
  ])
}
