import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { PermissionRouter } from 'containers/Permissions'
import AppLayout from 'layout/AppLayout'
import GuestPages from 'views/Guest'
import Accessing from './Accessing'
import Register from './Public/Register'
import Confirm from './Public/Confirm'

import { routes } from '../constants/variables'

function RootRoutes({ user }) {
  let isRememberAuth = localStorage.swtoken && Object.keys(user).length === 0

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
        <PermissionRouter
          path='/app'
          redirect='/'
          component={AppLayout}
          access={['OWNER_PM']}
          useCommon={false}
        />
        <PermissionRouter
          path='/'
          redirect='/app'
          component={GuestPages}
          access={['GUEST_PM']}
          useCommon={false}
        />
      </Switch>
    )
  }
}

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState, null)(RootRoutes)
