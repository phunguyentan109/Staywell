import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
const FILTERS = ['Pending', 'Processing', 'Complete']

export default function ContractNavs({ rooms, onSelectRoom }) {
  const [roomId, setRoomId] = useState(null)

  const selectRoom = useCallback(roomId => {
    setRoomId(roomId)
    onSelectRoom(roomId)
  }, [onSelectRoom])

  useEffect(() => {
    // Auto select the first room after accessing to the page
    const noSelectedRoom = rooms.length > 0 && !roomId
    noSelectedRoom && selectRoom(rooms[0]._id)
  }, [roomId, rooms, selectRoom])

  return (
    <ul className='gx-module-nav'>
      <div className='section-wrapper'>
        <div>Active Contracts</div>
        {
          _.map(rooms, r => (
            <li onClick={selectRoom.bind(this, r._id)} key={r._id}>
              <span className={roomId === r._id ? 'gx-link active' : 'gx-link'}>
                <i className='icon icon-schedule'/>
                <span>{r.name}</span>
              </span>
            </li>
          ))
        }
      </div>
      <div className='section-wrapper'>
        <div>Status Filters</div>
        {
          _.map(FILTERS, (f, i) => (
            <li onClick={() => {}} key={i}>
              <span className='gx-link'>
                <i className='icon icon-chart-pie'/>
                <span>{f}</span>
              </span>
            </li>
          ))
        }
      </div>
      {/*<li className='gx-module-nav-label'><span>Tags</span></li>*/}
      {/*<li onClick={() => {}}>*/}
      {/*  <span className={'gx-link active' || 'gx-link'}>*/}
      {/*    <i className='icon icon-circle gx-text-green'/>*/}
      {/*    <span>HTML</span>*/}
      {/*  </span>*/}
      {/*</li>*/}
    </ul>
  )
}

ContractNavs.propTypes = {
  rooms: PropTypes.array,
  onSelectRoom: PropTypes.func
}

ContractNavs.defaultProps = {
  rooms: [],
  onSelectRoom: () => {}
}
