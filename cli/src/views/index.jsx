import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { PermissionRouter } from 'containers/Permissions'
import AppLayout from 'containers/Layout/AppLayout'
import AuthLayout from 'containers/Layout/AuthLayout'
import Accessing from './Accessing'

function RootRoutes({ user }) {
  let isRememberAuth = localStorage.swtoken && Object.keys(user).length === 0

  if(isRememberAuth) {
    return (
      <Switch>
        <Route path='/' component={Accessing}/>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <PermissionRouter
          path='/app'
          redirect='/'
          component={AppLayout}
          access={['OWNER_PM', 'PEOPLE_PM']}
        />
        <PermissionRouter
          path='/'
          redirect='/app'
          component={AuthLayout}
          access={['GUEST_PM', 'INACTIVE_PM']}
        />
      </Switch>
    )
  }
}

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState, null)(RootRoutes)
