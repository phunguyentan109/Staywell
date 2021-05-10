import React, { useCallback, useEffect, useState } from 'react'
import Register from '../components/Register'
import PropTypes from 'prop-types'
import { userApi, call } from 'constants/api'

function RegisterContainer({ match }) {
  const [allow, setAllow] = useState(true)

  const hdAllowRegistration = useCallback(async() => {
    const { params } = match
    let rs = await call(...userApi.allowRegistration(params.token))
    rs.status === 200 && setAllow(rs.data.allow)
  }, [match])

  useEffect(() => { hdAllowRegistration() }, [hdAllowRegistration])

  return <Register allow={allow} />
}

RegisterContainer.propTypes = {
  match: PropTypes.object
}

export default RegisterContainer
