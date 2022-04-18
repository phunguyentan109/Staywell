import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

// Views
import Dashboard from './Dashboard'
import Price from './Price/Loader'
// import Profile from './Profile'
import Room from './Room/Loader'
// import Contract from './Contract'
// import Bill from './Bill'

function AppRoutes(props) {
  return (
    <div className='gx-main-content-wrapper'>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {/*<Route path={`${url}/contracts/:contractId`} component={Bill}/>*/}
          {/*<Route path={`${url}/people`} component={People}/>*/}
          {/*<Route path={`${url}/profile`} component={Profile}/>*/}

          {/*<Route path='/app/contracts' component={Contract}/>*/}
          <Route path='/app/rooms' component={Room}/>
          <Route path='/app/price' component={Price}/>

          <Route exact path='/app' component={Dashboard}/>
          <Redirect from={props.location?.pathname} to='/app' />
        </Switch>
      </Suspense>
    </div>
  )
}

AppRoutes.propTypes = {
  location: PropTypes.object,
}

export default withRouter(AppRoutes)
