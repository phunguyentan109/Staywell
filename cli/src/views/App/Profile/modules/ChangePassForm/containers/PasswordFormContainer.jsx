import React, { useCallback, memo } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { useStore } from 'hooks'
import { userApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'
import PasswordForm from '../components/PasswordForm'
import { DEFAULT_PROFILE } from '../../const'

function PasswordFormContainer({ user }) {
  const [password, repPassword] = useStore(_.cloneDeep(DEFAULT_PROFILE))

  const changePassword = useCallback(async ({ password }) => {
    onLoading()
    let { change, confirm, current } = password
    if (current && change && change === confirm) {
      const rs = await call(...userApi.password(user._id), { current, change })
      if (rs.status === 200) {
        repPassword({ change: '', confirm: '', current: '' })
        notify('success', 'Your password has been updated.')
      }
    } else {
      notify('error', 'Please entered valid information.')
    }
    offLoading()
  }, [repPassword, user._id])

  return (
    <PasswordForm 
      password={password}
      repPassword={repPassword}
      changePassword={changePassword} 
    />
  )
}

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState)(memo(PasswordFormContainer))

PasswordFormContainer.propTypes = {
  user: PropTypes.object,
}

PasswordFormContainer.defaultProps = {
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