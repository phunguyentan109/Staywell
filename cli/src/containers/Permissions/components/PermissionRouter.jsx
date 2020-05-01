import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

// User Access Control
import { mapState } from '../modules/func'

function PermissionRouter({ access, inAccess, path, component, redirect, verifyAccess }) {
  let allowAccess = verifyAccess(access, inAccess)
  if(!allowAccess) return <Redirect to={redirect || defaultUrl(path)}/>
  return <Route path={path} component={component}/>
}

function defaultUrl(url) {
  if(url.includes('/app')) return '/app'
  return '/'
}

PermissionRouter.defaultProps = {
  inAccess: []
}

export default connect(mapState, null)(PermissionRouter)
