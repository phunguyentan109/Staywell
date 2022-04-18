import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './reducers'
import userSaga from './sagas/user'

const createBrowserHistory = require('history').createBrowserHistory

export const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware =  createSagaMiddleware()

const middlewares = [sagaMiddleware, routeMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function createSagaInjector(runSaga) {
  const injectedSagas = new Map()

  const isInjected = (key) => injectedSagas.has(key)

  // inject saga function
  return (key, saga) => {
    if (isInjected(key)) return

    // Sagas return task when they executed, which can be used
    // to cancel them
    const task = runSaga(saga)

    // Save the task if we want to cancel it in the future
    injectedSagas.set(key, task)
  }
}

function configureStore(preloadedState = {}) {
  let store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  )

  store.asyncReducers = {}

  store.injectReducer = (key: string | number, asyncReducer: any) => {
    store.asyncReducers[key] = asyncReducer

    store.replaceReducer(createRootReducer(history, store.asyncReducers))
  }

  store.injectSaga = createSagaInjector(sagaMiddleware.run)

  sagaMiddleware.run(userSaga)

  return store
}

export default configureStore()
