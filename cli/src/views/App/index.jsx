import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import { PermissionRouter } from 'containers/Permissions'

// Views
import Dashboard from './Dashboard'
import People from './People'
import Price from './Price'
import Profile from './Profile'
import Room from './Room'
import Contract from './Contract'

function AppRoutes(props) {
  const url = props.match.url
  return (
    <Switch>
      <PermissionRouter
        path={`${url}/contracts`}
        component={Contract}
        access={['OWNER_PM']}
      />
      {/*<PermissionRouter*/}
      {/*  path={`${url}/rooms`}*/}
      {/*  component={Room}*/}
      {/*  access={['OWNER_PM']}*/}
      {/*/>*/}
      <Route path={`${url}/rooms`} component={Room}/>
      <Route path={`${url}/people`} component={People}/>
      <PermissionRouter
        path={`${url}/price`}
        component={Price}
        access={['OWNER_PM']}
        useCommon={false}
      />
      <PermissionRouter
        path={`${url}/profile`}
        component={Profile}
        access={['OWNER_PM', 'PEOPLE_PM']}
        useCommon={false}
      />
      <PermissionRouter path={url} component={Dashboard}/>
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
