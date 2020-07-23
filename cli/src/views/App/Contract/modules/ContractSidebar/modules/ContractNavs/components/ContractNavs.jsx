import React, { useCallback } from 'react'
import CustomScrollbars from 'util/CustomScrollbars'
import PropTypes from 'prop-types'
import _ from 'lodash'

export default function ContractNavs({ children, rooms, onSelectRoom }) {
  const selectRoom = useCallback(roomId => onSelectRoom(roomId), [onSelectRoom])

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
            {
              _.map(rooms, r => (
                <li onClick={selectRoom.bind(r._id)} key={r._id}>
                  <span className={'gx-link active' || 'gx-link'}>
                    <i className='icon icon-schedule'/>
                    <span>{r.name}</span>
                  </span>
                </li>
              ))
            }
            {/*<li className='gx-module-nav-label'><span>Tags</span></li>*/}
            {/*<li onClick={() => {}}>*/}
            {/*  <span className={'gx-link active' || 'gx-link'}>*/}
            {/*    <i className='icon icon-circle gx-text-green'/>*/}
            {/*    <span>HTML</span>*/}
            {/*  </span>*/}
            {/*</li>*/}
          </ul>
        </CustomScrollbars>
      </div>
    </div>
  )
}

ContractNavs.propTypes = {
  children: PropTypes.any,
  rooms: PropTypes.array,
  onSelectRoom: PropTypes.func
}

ContractNavs.defaultProps = {
  rooms: [],
  onSelectRoom: () => {}
}
