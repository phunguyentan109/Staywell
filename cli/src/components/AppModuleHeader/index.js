import React, { useState, useEffect } from 'react'

const AppModuleHeader = ({ styleName, value, notification, apps, onChange, placeholder }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    return () => toggle()
  }, [toggle])

  function toggle() {
    setPopoverOpen(!popoverOpen)
  }

  return (
    <div className='gx-module-box-header-inner'>
      <div className='gx-search-bar gx-lt-icon-search-bar-lg gx-module-search-bar gx-d-none gx-d-sm-block'>
        <div className='gx-form-group'>
          <input
            className='ant-input gx-border-0'
            type='search'
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
          <span className='gx-search-icon gx-pointer'>
            <i className='icon icon-search'/>
          </span>
        </div>
      </div>
      <div className='gx-module-box-header-right'>
        <span className='gx-fs-xl'>
          <i className='icon icon-apps gx-icon-btn'/>
        </span>
        <span className='gx-fs-xl'>
          <i className='icon icon-notification gx-icon-btn'/>
        </span>
      </div>
    </div>
  )
}

export default AppModuleHeader

AppModuleHeader.defaultProps = {
  styleName: '',
  value: '',
  notification: true,
  apps: true
}
