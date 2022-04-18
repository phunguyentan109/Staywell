import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

// User Access Control
import { selectUser } from 'appRedux/selectors'
import { pm } from './const'

function PermissionRouter({ access, inAccess, path, component, redirect }) {
  const user = useSelector(selectUser)

  const ableToAccess = useMemo(() => {
    let userRoles = user?.role?.length === 0 ? [{ code: pm.GUEST_PM }] : user?.role
    let userRoleCodes = userRoles.map(r => r.code)

    if (!access) return true

    let considerAccept = userRoleCodes.some(p => access.some(a => pm[a] === p))
    let considerDeny = userRoleCodes.some(p => inAccess.some(a => pm[a] === p))
    return considerAccept && !considerDeny
  }, [access, inAccess, user?.role])

  if (!ableToAccess) return <Redirect to={redirect || defaultUrl(path)}/>

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

export default PermissionRouter
