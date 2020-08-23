import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const ContractHeader = ({ value, onChange, placeholder }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  const toggle = useCallback(async() => {
    setPopoverOpen(!popoverOpen)
  }, [popoverOpen])

  useEffect(() => { return () => toggle() }, [toggle])

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

ContractHeader.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

ContractHeader.defaultProps = {
  value: '',
  onChange: () => {},
  placeholder: 'Type something here...'
}

export default ContractHeader
