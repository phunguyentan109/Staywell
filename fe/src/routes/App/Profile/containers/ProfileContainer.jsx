import React, { memo } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Profile from '../components/Profile'

function ProfileContainer({ user }) {
  return (
    <Profile user={user} />
  )
}

function mapState({ user }) {
  return { user: user.data }
}

export default connect(mapState)(memo(ProfileContainer))

ProfileContainer.propTypes = {
  user: PropTypes.object,
}

ProfileContainer.defaultProps = {
  user: { _id: '' }
}