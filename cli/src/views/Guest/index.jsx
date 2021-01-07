import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Login from './Login'
import PublicLayout from '../../layout/PublicLayout'

function AuthRoutes({ location }) {
  return (
    <PublicLayout>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Redirect from={location.pathname} to='/'/>
      </Switch>
    </PublicLayout>
  )
}

export default withRouter(AuthRoutes)

AuthRoutes.propTypes = {
  location: PropTypes.object
}
