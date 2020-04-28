import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import RouteControl from 'containers/Route/RouteControl'
import PropTypes from 'prop-types'

import Login from './Login'
import Register from './Register'
import Forgot from './Forgot'
import Reset from './Reset'
import { Activate, Activated } from './Activate'

function AuthRoutes({ location }) {
  return (
    <Switch>
      <Route path='/activate/:user_id' component={Activated}/>
      <Route path='/reset/:token' component={Reset}/>
      <RouteControl
        path='/activate'
        redirectPath='/app'
        component={Activate}
        access={[
          'UNACTIVE_PERMISSION'
        ]}
      />
      <RouteControl
        path='/register'
        redirectPath='/activate'
        component={Register}
        access={[
          'GUEST_PERMISSION'
        ]}
      />
      <RouteControl
        path='/forgot'
        redirectPath='/'
        component={Forgot}
        access={[
          'GUEST_PERMISSION'
        ]}
      />
      <RouteControl
        path='/'
        redirectPath='/activate'
        component={Login}
        access={[
          'GUEST_PERMISSION'
        ]}
      />
      <Redirect from={location.pathname} to='/'/>
    </Switch>
  )
}

export default withRouter(AuthRoutes)

AuthRoutes.propsTypes = {
  location: PropTypes.object
}
