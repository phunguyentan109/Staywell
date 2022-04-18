import { lazy } from 'react'
import store from 'appRedux'
import reducer from  './redux/reducer'
import saga from './redux/saga'

const Room = lazy(() =>
  import('./index').then(module => {
    store.injectReducer('room', reducer)
    store.injectSaga('room', saga)

    return module
  })
)

export default Room
