import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function ContractRooms(props) {
  const [roomId, setRoomId] = useState(null)

  const hdSelect = roomId => {
    setRoomId(roomId)
    props.onSelectRoom(roomId)
  }

  return (
    <div className='section-wrapper'>
      <div>Active Contracts</div>
      {
        _.map(props.rooms, r => (
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
