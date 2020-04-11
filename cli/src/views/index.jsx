import React from 'react'
import { Switch, Route } from 'react-router-dom'
import RouteControl from 'containers/Route/RouteControl'
import { connect } from 'react-redux'

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
        <RouteControl
          path='/app'
          redirectPath='/'
          component={AppLayout}
          access={[
            'OWNER_PERMISSION',
            'PEOPLE_PERMISSION'
          ]}
        />
        <Route path='/' component={AuthLayout}/>
      </Switch>
    )
  }

}

function mapState({ user }) {
  return {
    user: user.data
  }
}

export default connect(mapState, null)(RootRoutes)
