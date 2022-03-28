import { all, call, put, takeLatest } from 'redux-saga/effects'
import { priceApi, request } from 'constants/api'
import { CREATE_PRICE_ACTION, EDIT_PRICE_ACTION, FETCH_PRICE_ACTION, REMOVE_PRICE_ACTION } from '../const'
import { fetchPriceSuccessAction } from './action'

function* hdFetchPriceAction() {
  try {
    let rs = yield call(request, priceApi.get())

    yield put(fetchPriceSuccessAction({
      price: rs.data
    }))
  } catch (e) {
    console.error('error => function* hdFetchPriceAction', e)
    yield put(fetchPriceSuccessAction())
  }
}

function* hdCreatePriceAction({ data, cb }) {
  try {
    let rs = yield call(request, priceApi.add(data))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdRemovePriceAction', e)
    cb()
  }
}

function* hdEditPriceAction({ data, cb }) {
  try {
    let rs = yield call(request, priceApi.update(data._id, data))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdEditPriceAction', e)
    cb()
  }
}

function* hdRemovePriceAction({ roomId, cb }) {
  try {
    let rs = yield call(request, priceApi.remove(roomId))

    cb(rs.data)
  } catch (e) {
    console.error('error => function* hdRemovePriceAction', e)
    cb()
  }
}

export default function* roomSaga() {
  yield all([
    takeLatest(FETCH_PRICE_ACTION, hdFetchPriceAction),
    takeLatest(CREATE_PRICE_ACTION, hdCreatePriceAction),
    takeLatest(EDIT_PRICE_ACTION, hdEditPriceAction),
    takeLatest(REMOVE_PRICE_ACTION, hdRemovePriceAction),
    takeLatest(FETCH_PRICE_ACTION, hdFetchPriceAction),
  ])
}
