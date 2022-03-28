import React, { Suspense } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Login from './Login/Loader'
import PublicLayout from 'layout/PublicLayout'
import Accessing from '../Public/Accessing'

function AuthRoutes({ location }) {
  return (
    <PublicLayout>
      <Suspense fallback={Accessing}>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Redirect from={location.pathname} to='/'/>
        </Switch>
      </Suspense>
    </PublicLayout>
  )
}

export default withRouter(AuthRoutes)

AuthRoutes.propTypes = {
  location: PropTypes.object
}
