import { lazy } from 'react'
import store from 'appRedux'
import reducer from './redux/reducer'
import saga from './redux/saga'

const People = lazy(() =>
  import('./index').then(module => {
    store.injectReducer('people', reducer)
    store.injectSaga('people', saga)

    return module
  })
)

export default People
