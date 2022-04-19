import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import routes, { urls } from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Permission from 'components/Permissions'

import Register from './Public/Register'
import Confirm from './Public/Confirm'
import Accessing from './Public/Accessing'
import MainApp from 'containers/App/MainApp'
import { selectUser } from 'appRedux/selectors'
import { verifyUserTokenAction } from 'appRedux/actions'
import { CLI_STORE_KEYS } from 'appRedux/const'
import PublicLayout from 'layout/PublicLayout'

function App () {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyUserTokenAction())
  }, [dispatch])

  let isRememberAuth = localStorage[CLI_STORE_KEYS.token] && _.isEmpty(user.permissions)
  if (isRememberAuth) {
    return (
      <Switch>
        <Route path={urls.completeRegistration} component={Confirm}/>
        <Route path={urls.registration} component={Register}/>
        <Route path='/' component={Accessing}/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path={urls.completeRegistration} component={Confirm}/>
      <Route path={urls.registration} component={Register}/>

      <Route path='/app' render={() => (
        <MainApp>
          <div className='gx-main-content-wrapper'>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {/*<Route path={`${url}/contracts/:contractId`} component={Bill}/>*/}

                {
                  routes.app.map(r => <Permission.Router key={r.path} {...r} />)
                }

                <Redirect to='/app'/>
              </Switch>
            </Suspense>
          </div>
        </MainApp>
      )}/>

      <Route path='/' render={() => (
        <PublicLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {
                routes.guest.map(r => <Permission.Router key={r.path} {...r} />)
              }

              <Redirect to='/app'/>
            </Switch>
          </Suspense>
        </PublicLayout>
      )}/>
    </Switch>
  )
}

export default withRouter(App)
