import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { selectUser } from 'appRedux/selectors'
import permissions from 'constants/permissions'

const GUEST_PERMISSIONS = {
  [permissions.login]: true
}

function Router({ permissions, redirect, ...routeProps }) {
  const user = useSelector(selectUser)

  const noPermission = useMemo(() => {
    if (!permissions) return true

    let userPerm = Object.keys(user.permissions).length > 0 ? user.permissions : GUEST_PERMISSIONS

    return permissions.some(perm => !userPerm?.[perm])
  }, [permissions, user.permissions])

  if (noPermission) return <Redirect to={redirect} />

  return <Route {...routeProps} />
}

Router.propTypes = {
  permissions: PropTypes.array,
  path: PropTypes.string,
  component: PropTypes.any,
  redirect: PropTypes.string,
  exact: PropTypes.bool,
}

Router.defaultProps = {
  permissions: [],
}

export default Router
