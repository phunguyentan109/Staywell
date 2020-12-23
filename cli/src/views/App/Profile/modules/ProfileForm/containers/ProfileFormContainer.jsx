import React, { useCallback, memo } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { userApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'
import { sendReloadUser } from 'appRedux/actions/user'
import ProfileForm from '../components/ProfileForm'

function ProfileFormContainer({ user, sendReloadUser }) {
  const hdUpdateProfile = useCallback(async ({ profile, clearProfile }) => {
    onLoading()
    if (profile.email) {
      let keys = ['email', 'job', 'phone', 'birthDate']
      await call(...userApi.update(user._id), _.pick(profile, keys))
      sendReloadUser(user._id)
      clearProfile(...keys)
      notify('success', 'Your profile has been updated successfully.')
    } else {
      notify('error', 'Please entered valid information.')
    }
    offLoading()
  }, [ sendReloadUser, user._id])

  return (
    <>
      <ProfileForm 
        user={user}
        hdUpdateProfile={hdUpdateProfile} />
    </>
  )
}

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState, { sendReloadUser })(memo(ProfileFormContainer))

ProfileFormContainer.propTypes = {
  user: PropTypes.object,
  sendReloadUser: PropTypes.func,
}

ProfileFormContainer.defaultProps = {
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