import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { offLoading } from 'constants/func'

function Dashboard() {
  return <h1>This is the dashboard</h1>
}

Dashboard.propTypes = {
  loading: PropTypes.func
}

export default Dashboard
