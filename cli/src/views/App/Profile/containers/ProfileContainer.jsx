import React, { useEffect, useCallback, memo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { userApi, call } from 'constants/api'
import Profile from '../components/Profile'
import { sendReloadUser } from 'appRedux/actions/user'
import useInitState from 'hooks/useInitState'
import { DEFAULT_PROFILE } from '../modules/const'
import { notify, offLoading, onLoading } from 'constants/func'

function ProfileContainer({ user, sendReloadUser }) {
  const [profile, setProfile, clearProfile] = useInitState(DEFAULT_PROFILE)

  const load = useCallback(() => {
    onLoading()
    setProfile(user)
    offLoading()
  }, [setProfile, user])

  useEffect(() => { load() }, [load])

  const changePassword = useCallback(async () => {
    onLoading()
    let { change, confirm, current } = profile
    if (current && change && change === confirm) {
      await call(...userApi.password(user._id), { current, change })
      clearProfile('current', 'change', 'confirm')
      notify('success', 'Your password has been updated.')
    } else {
      notify('error', 'Please entered valid information.')
    }
    offLoading()
  }, [clearProfile, profile, user._id])

  const hdChange = useCallback((e) => {
    if (e._isAMomentObject) {
      setProfile(prev => ({ ...prev, birthDate: e }))
    } else {
      const { name, value } = e.target
      setProfile(prev => ({ ...prev, [name]: value }))
    }
  }, [setProfile])

  const hdUpdateProfile = useCallback(async () => {
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
  }, [clearProfile, profile, sendReloadUser, user._id])

  return (
    <Profile
      user={user}
      profile={profile}
      setProfile={setProfile}
      hdChange={hdChange}
      hdUpdateProfile={hdUpdateProfile}
      changePassword={changePassword}
    />
  )
}

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState, { sendReloadUser })(memo(ProfileContainer))

ProfileContainer.propTypes = {
  user: PropTypes.object,
  sendReloadUser: PropTypes.func
}

ProfileContainer.defaultProps = {
  user: { _id: '' }
}