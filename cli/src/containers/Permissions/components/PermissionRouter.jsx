import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

// User Access Control
import { mapState } from '../modules/func'

function PermissionRouter({ access, inAccess, path, component, redirect, verifyAccess }) {
  let allowAccess = verifyAccess(access, inAccess)
  if (!allowAccess) return <Redirect to={redirect || defaultUrl(path)}/>
  return <Route path={path} component={component}/>
}

function defaultUrl(url) {
  return url.includes('/app') ? '/app' : '/'
}

PermissionRouter.propTypes = {
  access: PropTypes.array,
  inAccess: PropTypes.array,
  path: PropTypes.string,
  component: PropTypes.any,
  redirect: PropTypes.string,
  verifyAccess: PropTypes.func,
}

PermissionRouter.defaultProps = {
  inAccess: [],
  useCommon: true
}

export default connect(mapState, null)(PermissionRouter)
