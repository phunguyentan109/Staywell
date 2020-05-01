import React from 'react'
import { Avatar, Popover } from 'antd'

function UserProfile({ username, avatar, logout }) {
  const userMenuOptions = (
    <ul className='gx-user-popover'>
      <li><a href='/app/profile'>My Account</a></li>
      <li>Connections</li>
      <li onClick={logout}>Logout</li>
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

export default UserProfile
