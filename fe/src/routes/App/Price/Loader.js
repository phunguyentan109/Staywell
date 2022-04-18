import { lazy } from 'react'
import store from 'appRedux'
import reducer from  './redux/reducer'
import saga from './redux/saga'

const Price = lazy(() =>
  import('./index').then(module => {
    store.injectReducer('price', reducer)
    store.injectSaga('price', saga)

    return module
  })
)

export default Price
