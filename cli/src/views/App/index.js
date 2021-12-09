import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'

// Views
import Index from './Dashboard'
import People from './People'
import Price from './Price'
import Profile from './Profile'
import Room from './Room'
import Contract from './Contract'
import Bill from './Bill'

function AppRoutes(props) {
  const url = props.match.url
  return (
    <Switch>
      <Route path={`${url}/contracts/:contractId`} component={Bill}/>
      <Route path={`${url}/contracts`} component={Contract}/>
      <Route path={`${url}/rooms`} component={Room}/>
      <Route path={`${url}/people`} component={People}/>
      <Route path={`${url}/price`} component={Price}/>
      <Route path={`${url}/profile`} component={Profile}/>
      <Route path={url} component={Index}/>
      <Redirect from={props.location.pathname} to={url}/>
    </Switch>
  )
}

AppRoutes.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.func
}

export default withRouter(AppRoutes)
