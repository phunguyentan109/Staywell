import React, { useCallback } from 'react'
import Register from '../components/Register'
import PropTypes from 'prop-types'
import { notify, offLoading, onLoading } from 'constants/func'
import { call, userApi } from 'constants/api'

function RegisterContainer({ match }) {
  const { params } = match

  const hdRegister = useCallback(async(form) => {
    onLoading()
    let rs = await call(...userApi.submitRegistration(params.token), form)
    rs && notify('success', 'Information has been saved successfully!')
    offLoading()
  }, [params.token])

  return <Register hdRegister={hdRegister} />
}

RegisterContainer.propTypes = {
  match: PropTypes.object
}

export default RegisterContainer
