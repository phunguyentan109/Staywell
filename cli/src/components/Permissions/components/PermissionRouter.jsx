import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

// User Access Control
import { mapState } from '../modules/func'

function PermissionRouter({ access, inAccess=[], path, component, redirectPath, role }) {
  let allowAccess = role.verifyAccess(access, inAccess)
  if(!allowAccess) return <Redirect to={redirectPath}/>
  return <Route path={path} component={component}/>
}

export default connect(mapState, null)(PermissionRouter)
