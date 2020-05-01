import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { PermissionRouter } from 'containers/Permissions'
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
      <PermissionRouter
        path='/activate'
        component={Activate}
        access={['INACTIVE_PM']}
      />
      <PermissionRouter
        path='/register'
        redirect='/activate'
        component={Register}
        access={['GUEST_PM']}
      />
      <PermissionRouter
        path='/forgot'
        component={Forgot}
        access={['GUEST_PM']}
      />
      <PermissionRouter
        path='/'
        redirect='/activate'
        component={Login}
        access={['GUEST_PM']}
      />
      <Redirect from={location.pathname} to='/'/>
    </Switch>
  )
}

export default withRouter(AuthRoutes)

AuthRoutes.propsTypes = {
  location: PropTypes.object
}
