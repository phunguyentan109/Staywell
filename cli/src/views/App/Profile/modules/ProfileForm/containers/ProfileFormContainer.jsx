import React, { useEffect, useCallback, memo } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { userApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'
import { sendReloadUser } from 'appRedux/actions/user'
import { useStore } from 'hooks'
import ProfileForm from '../components/ProfileForm'
import { DEFAULT_PROFILE } from '../../const'

function ProfileFormContainer({ user, sendReloadUser }) {
  const [profile, repProfile, setProfile] = useStore(_.cloneDeep(DEFAULT_PROFILE))

  const load = useCallback(() => {
    onLoading()
    repProfile(user)
    offLoading()
  }, [repProfile, user])

  useEffect(() => { load() }, [load])

  const hdUpdateProfile = useCallback(async ({ profile }) => {
    onLoading()
    if (profile.email) {
      let keys = ['email', 'job', 'phone', 'birthDate']
      const rs =await call(...userApi.update(user._id), _.pick(profile, keys))
      if (rs.status === 200) {
        sendReloadUser(user._id)
        notify('success', 'Your profile has been updated successfully.')
      }
    } else {
      notify('error', 'Please entered valid information.')
    }
    offLoading()
  }, [ sendReloadUser, user._id])

  return (
    <ProfileForm 
      profile={profile} 
      repProfile={repProfile}
      setProfile={setProfile}
      hdUpdateProfile={hdUpdateProfile} 
    />
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