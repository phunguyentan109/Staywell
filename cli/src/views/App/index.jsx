import React from 'react'
import { Switch, Redirect, Route, withRouter } from 'react-router-dom'
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
    <div className='gx-main-content-wrapper'>
      <Switch>
        <PermissionRouter
          path={`${url}/contracts`}
          component={Contract}
          access={['OWNER_PM']}
        />
        <PermissionRouter
          path={`${url}/rooms`}
          component={Room}
          access={['OWNER_PM']}
        />
        <PermissionRouter
          path={`${url}/people`}
          component={People}
          access={['OWNER_PM']}
        />
        <PermissionRouter
          path={`${url}/price`}
          component={Price}
          access={['OWNER_PM']}
        />
        <PermissionRouter
          path={`${url}/profile`}
          component={Profile}
          access={['OWNER_PM', 'PEOPLE_PM']}
        />
        <Route path={`${url}`} component={Dashboard}/>
        <Redirect from={props.location.pathname} to={`${url}`}/>
      </Switch>
    </div>
  )
}

export default withRouter(AppRoutes)
