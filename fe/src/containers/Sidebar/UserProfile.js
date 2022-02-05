import React, { useMemo } from 'react'
import { Popover } from 'antd'
import Avatar, { genConfig } from 'react-nice-avatar'
import PropTypes from 'prop-types'
import './_styles.less'

const UserProfile = (props) => {
  const avaConfig = useMemo(() => genConfig(props.avatar), [props.avatar])

  return (
    <div className='gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row userProfile'>
      <Popover
        placement='bottomRight'
        content={
          <ul className='gx-user-popover'>
            <li>My Account</li>
            <li>Connections</li>
          </ul>
        }
        trigger='click'
      >
        <Avatar
          className='gx-size-40 gx-pointer gx-mr-3 customAvatar'
          {...avaConfig}
        />
        <span className='gx-avatar-name'>Rob Farnandies<i className='icon icon-chevron-down gx-fs-xxs gx-ml-2'/></span>
      </Popover>
    </div>
  )
}

UserProfile.propTypes = {
  avatar: PropTypes.object,
}

export default UserProfile
