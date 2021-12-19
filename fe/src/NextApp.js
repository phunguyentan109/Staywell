import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import 'assets/vendors/style'
import 'styles/wieldy.less'

import configureStore, { history } from './appRedux/store'
import AppRoutes from 'routes'
import extractStorage from './constants/storage'

const store = configureStore()
extractStorage(store)

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>


export default NextApp
