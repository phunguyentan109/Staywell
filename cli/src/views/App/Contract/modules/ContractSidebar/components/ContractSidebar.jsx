import React from 'react'
import CustomScrollbars from 'util/CustomScrollbars'
import PropTypes from 'prop-types'

export default function ContractSidebar({ children }) {
  return (
    <div className='gx-module-side'>
      <div className='gx-module-side-header'>
        <div className='gx-module-logo'>
          <i className='icon icon-wysiwyg gx-mr-3'/>
          <span>Contract List</span>
        </div>

      </div>
      <div className='gx-module-side-content'>
        <CustomScrollbars className='gx-module-side-scroll'>
          { children }
          <ul className='gx-module-nav'>
            <li className='gx-module-nav-label'><span>Rooms</span></li>
            <li onClick={() => {}}>
              <span className={'gx-link active' || 'gx-link'}>
                <i className={'icon icon-schedule'}/>
                <span>Room 1</span>
              </span>
            </li>

            <li className='gx-module-nav-label'><span>Tags</span></li>
            <li onClick={() => {}}>
              <span className={'gx-link active' || 'gx-link'}>
                <i className='icon icon-circle gx-text-green'/>
                <span>HTML</span>
              </span>
            </li>
          </ul>
        </CustomScrollbars>
      </div>
    </div>
  )
}

ContractSidebar.propTypes = {
  children: PropTypes.any
}
