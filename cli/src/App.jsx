import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import RootRoutes from './views/index'
import extractStorage from 'constants/clientStorage'

import 'assets/vendors/style'
import 'assets/style.css'
import 'assets/css/_layout.scss'

import configureStore from 'appRedux'

const store = configureStore()
extractStorage(store)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RootRoutes/>
      </Router>
    </Provider>
  )
}

export default App
