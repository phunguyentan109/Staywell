import React, { useRef, useEffect, useCallback, memo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { notify, userApi, call } from 'constants/api'
import Profile from '../components/Profile'
import { sendReloadUser } from 'appRedux/actions/user'
import useInitState from 'hooks/useInitState'
import { DEFAULT_PROFILE } from '../modules/const'


function ProfileContainer({ user, sendReloadUser }) {
  const [profile, setProfile, clearProfile] = useInitState(DEFAULT_PROFILE)
  const loadRef = useRef()

  const load = useCallback(() => {
    loadRef.current.toggle()
    setProfile(user)
    loadRef.current.toggle()
   
  }, [setProfile, user])

  useEffect(() => { load() }, [load])

  const changePassword = useCallback(async () => {
    loadRef.current.toggle()
    let { change, confirm, current } = profile
    if (current && change && change === confirm) {
      const data = await call(...userApi.password(user._id), { current, change })
      if (data.status === 200) {
        clearProfile('current', 'change', 'confirm')
        notify('success', 'Your password has been updated.')
      } else {
        notify('error', 'Something wrong. Can\'t update your password.')
      }
    } else {
      notify('error', 'Please entered valid information.')
    }
    loadRef.current.toggle()
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
    loadRef.current.toggle()
    if (profile.email) {
      let keys = ['email', 'job', 'phone', 'birthDate']
      const data = await call(...userApi.update(user._id), _.pick(profile, keys))
      if (data.status === 200) {
        sendReloadUser(user._id)
        clearProfile(...keys)
        notify('success', 'Your profile has been updated successfully.')
      } else {
        notify('error', 'Something wrong. Can\'t update your profile.')
      }
    } else {
      notify('error', 'Please entered valid information.')
    }
    loadRef.current.toggle()
  }, [clearProfile, profile, sendReloadUser, user._id])

  return (
    <Profile
      user={user}
      profile={profile}
      setProfile={setProfile}
      hdChange={hdChange}
      hdUpdateProfile={hdUpdateProfile}
      changePassword={changePassword}
      loadRef={loadRef}
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