import React, { useCallback } from 'react'
import Register from '../componentsbk/Register'
import PropTypes from 'prop-types'
import { notify } from 'constants/func'
import { call, userApi } from 'constants/api'

function RegisterContainer({ match }) {
  const { params } = match

  const hdRegister = useCallback(async(form) => {
    let rs = await call(...userApi.submitRegistration(params.token), form)
    rs && notify('success', 'Information has been saved successfully!')
  }, [params.token])

  return <Register hdRegister={hdRegister} />
}

RegisterContainer.propTypes = {
  match: PropTypes.object
}

export default RegisterContainer
