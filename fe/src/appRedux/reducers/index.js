import { combineReducers } from 'redux'
import Settings from './Settings'
import Common from './Common'
import { connectRouter } from 'connected-react-router'
import user from './user'
import message from './message'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  user,
  message
})

export default createRootReducer
