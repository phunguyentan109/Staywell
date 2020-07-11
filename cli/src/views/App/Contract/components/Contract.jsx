import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

export default function Contract({ loading }) {
  useEffect(() => { loading(false) }, [loading])
  return <Todo/>
}

Contract.propTypes = {
  loading: PropTypes.func
}
