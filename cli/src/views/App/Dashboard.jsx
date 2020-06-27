import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

function Dashboard({ loading }) {
  useEffect(() => { loading(false) }, [loading])

  return <h1>This is the dashboard</h1>
}

Dashboard.propTypes = {
  loading: PropTypes.func
}

export default Dashboard
