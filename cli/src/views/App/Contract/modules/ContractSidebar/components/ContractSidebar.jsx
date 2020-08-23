import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { FILTERS } from '../modules/const'
import { apiRoom } from 'constants/api'
import _ from 'lodash'

export default function ContractSidebar({ children, loading, onSelectRoom }) {
  const [rooms, setRooms] = useState([])
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

  const init = useCallback(async() => {
    let rooms = await apiRoom.get()
    setRooms(rooms)
    loading(false)
  }, [loading])

  useEffect(() => { init() }, [init])

  return (
    <Card className='gx-card contract-sidebar'>
      <div className='gx-module-side-header'>
        <div className='gx-module-logo'>
          <i className='icon icon-wysiwyg gx-mr-3'/>
          <span>Contract Options</span>
        </div>
      </div>
      {children}
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
      </ul>
    </Card>
  )
}

ContractSidebar.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.func,
  onSelectRoom: PropTypes.func
}

ContractSidebar.defaultProps = {
  loading: () => {}
}
