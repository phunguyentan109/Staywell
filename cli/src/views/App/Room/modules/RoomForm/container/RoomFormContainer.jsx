import React, { useRef } from 'react'
import RoomForm from '../component/RoomForm'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'
import { notify, call } from 'constants/api'

function RoomFormContainer({ api, updateRooms }) {
  const loadRef = useRef({})

  async function hdSubmit(room) {
    try {
      loadRef.current.toggle()
      let createdRoom = await call(...api, room)
      updateRooms(createdRoom)
    } catch (e) {
      console.error(e)
      notify('error')
    } finally {
      loadRef.current.toggle()
    }
    notify('success', 'Process\'s completed. Room\'s list is updated successfully')
  }

  // async function hdEdit() {
  //   let rs = await apiRoom.update({ room_id: room._id, data: room })
  //   updateRooms(rs)
  //   notify('success', 'Room\'s list is updated successfully')
  // }

  return (
    <Loading ref={loadRef}>
      <RoomForm hdSubmit={hdSubmit} />
    </Loading>
  )
}

RoomFormContainer.propTypes = {
  api: PropTypes.array,
  updateRooms: PropTypes.func
}

export default RoomForm
