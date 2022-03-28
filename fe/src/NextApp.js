import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './appRedux'
import AppRoutes from 'routes'

import 'assets/vendors/style'
import 'styles/wieldy.less'
import 'assets/css/_layout.less'

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>


export default NextApp
