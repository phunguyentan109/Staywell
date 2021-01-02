import React from 'react'
import { Avatar, Popover } from 'antd'
import PropTypes from 'prop-types'
import { clearAuthData } from 'appRedux/actions/user'
import { useDispatch } from 'react-redux'

const UserProfile = ({ username, avatar }) => {
  const dispatch = useDispatch()

  const userMenuOptions = (
    <ul className='gx-user-popover'>
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => dispatch(clearAuthData())}>Logout
      </li>
    </ul>
  )

  return (
    <div className='gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row'>
      <Popover placement='bottomRight' content={userMenuOptions} trigger='click'>
        <Avatar src={avatar} className='gx-size-40 gx-pointer gx-mr-3' alt=''/>
        <span className='gx-avatar-name'>{username}<i className='icon icon-chevron-down gx-fs-xxs gx-ml-2'/></span>
      </Popover>
    </div>
  )
}

UserProfile.propTypes = {
  logout: PropTypes.func,
  username: PropTypes.string,
  avatar: PropTypes.string
}

export default UserProfile
