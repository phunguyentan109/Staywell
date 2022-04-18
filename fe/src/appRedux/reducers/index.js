import { combineReducers } from 'redux'
import Settings from './Settings'
import Common from './Common'
import { connectRouter } from 'connected-react-router'
import user from './user'

const createRootReducer = (history, asyncReducer = {}) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  user,

  global: {
    user,
  },

  ...asyncReducer
})

export default createRootReducer
