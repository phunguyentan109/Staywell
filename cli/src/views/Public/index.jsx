import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Login from './Login'

function AuthRoutes({ location }) {
  return (
    <Switch>
      <Route exact path='/' component={Login}/>
      <Redirect from={location.pathname} to='/'/>
    </Switch>
  )
}

export default withRouter(AuthRoutes)

AuthRoutes.propTypes = {
  location: PropTypes.object
}
