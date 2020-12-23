import React, { useCallback, memo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { userApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'
import ChangePasswordForm from '../components/ChangePassForm'

function ChangePasswordFormContainer({ user }) {
  const changePassword = useCallback(async ({ profile, clearProfile }) => {
    onLoading()
    let { change, confirm, current } = profile
    if (current && change && change === confirm) {
      const rs = await call(...userApi.password(user._id), { current, change })
      clearProfile('current', 'change', 'confirm')
      if (rs.status === 200) {
        notify('success', 'Your password has been updated.')
      }
    } else {
      notify('error', 'Please entered valid information.')
    }
    offLoading()
  }, [user._id])

  return (
    <>
      <ChangePasswordForm changePassword={changePassword} />
    </>
  )
}

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState)(memo(ChangePasswordFormContainer))

ChangePasswordFormContainer.propTypes = {
  user: PropTypes.object,
}

ChangePasswordFormContainer.defaultProps = {
  user: { 
    _id: '',
    username: '',
    avatar: {
      link: ''
    },
    job: '',
    birthDate: '',
    phone:'',
    email: ''
  }
}