import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { routes } from '../constants/variables'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Permission from 'components/Permissions'

import Register from './Public/Register'
import Confirm from './Public/Confirm'
import Accessing from './Public/Accessing'
import GuestPages from './Guest'
import AppLayout from 'containers/App'

function App () {
  const user = useSelector(({ user }) => user?.data)

  let isRememberAuth = localStorage.swtoken && _.isEmpty(user)

  if (isRememberAuth) {
    return (
      <Switch>
        <Route path={routes.completeRegistration()} component={Confirm}/>
        <Route path={routes.registration()} component={Register}/>
        <Route path='/' component={Accessing}/>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path={routes.completeRegistration()} component={Confirm}/>
        <Route path={routes.registration()} component={Register}/>
        <Permission.Router
          path='/app'
          redirect='/'
          component={AppLayout}
          access={['OWNER_PM']}
        />
        <Permission.Router
          path='/'
          redirect='/app'
          component={GuestPages}
          access={['GUEST_PM']}
        />
      </Switch>
    )
  }
}

export default withRouter(App)
