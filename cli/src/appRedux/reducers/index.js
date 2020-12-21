import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import settings from './settings'
import user from './user'
import message from './message'

const reducers = combineReducers({
  settings, user, message,
  routing: routerReducer,
})

export default reducers
