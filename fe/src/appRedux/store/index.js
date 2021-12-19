import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from '../reducers'
import watchers from '../sagas'

const createBrowserHistory = require('history').createBrowserHistory

export const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware =  createSagaMiddleware()

const middlewares = [sagaMiddleware, routeMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState = {}) {
  let store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  )

  sagaMiddleware.run(watchers)

  return store
}
