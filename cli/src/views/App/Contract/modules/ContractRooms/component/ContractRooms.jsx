import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function ContractRooms({ rooms, onSelectRoom }) {
  const [roomId, setRoomId] = useState(null)

  const hdSelect = useCallback(roomId => {
    setRoomId(roomId)
    onSelectRoom(roomId)
  }, [onSelectRoom])

  useEffect(() => {
    if (rooms.length > 0 && !roomId) hdSelect(rooms[0]._id)
  }, [hdSelect, roomId, rooms])

  return (
    <div className='section-wrapper'>
      <div>Active Contracts</div>
      {
        _.map(rooms, r => (
          <li onClick={() => hdSelect(r._id)} key={r._id}>
            <span className={roomId === r._id ? 'gx-link active' : 'gx-link'}>
              <i className='icon icon-schedule'/>
              <span>{r.name}</span>
            </span>
          </li>
        ))
      }
    </div>
  )
}

ContractRooms.propTypes = {
  rooms: PropTypes.array,
  onSelectRoom: PropTypes.func
}

export default ContractRooms
