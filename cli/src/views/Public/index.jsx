import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Login from './Login'
// import Register from './Register'

function AuthRoutes({ location }) {
  return (
    <Switch>
      {/*<PermissionRouter*/}
      {/*  path='/register'*/}
      {/*  redirect='/activate'*/}
      {/*  component={Register}*/}
      {/*  access={['GUEST_PM']}*/}
      {/*  useCommon={false}*/}
      {/*/>*/}
      <Route path='/' component={Login}/>
      <Redirect from={location.pathname} to='/'/>
    </Switch>
  )
}

export default withRouter(AuthRoutes)

AuthRoutes.propTypes = {
  location: PropTypes.object
}
