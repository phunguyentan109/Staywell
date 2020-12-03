import React, { useCallback, useRef, useState } from 'react'
import RoomForm from '../component/RoomForm'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'
import { notify, call, priceApi } from 'constants/api'

function RoomFormContainer({ api, updateRooms, ...props }) {
  const loadRef = useRef({})
  const [price, setPrice] = useState([])

  const hdSubmit = useCallback(async(room) => {
    loadRef.current.toggle()
    let submitRoom = await call(...api, room)
    updateRooms(submitRoom)
    notify('success', 'Process\'s completed. Room\'s list is updated successfully')
    loadRef.current.toggle()
  }, [api, updateRooms])

  const getPrice = useCallback(async() => {
    loadRef.current.toggle()
    let priceData = await call(...priceApi.get())
    setPrice(priceData)
    loadRef.current.toggle()
  }, [])

  // async function hdEdit() {
  //   let rs = await apiRoom.update({ room_id: room._id, data: room })
  //   updateRooms(rs)
  //   notify('success', 'Room\'s list is updated successfully')
  // }
  return (
    <Loading ref={loadRef}>
      <RoomForm
        {...props}
        hdSubmit={hdSubmit}
        price={price}
        getPrice={getPrice}
      />
    </Loading>
  )
}

RoomFormContainer.propTypes = {
  api: PropTypes.array,
  updateRooms: PropTypes.func
}

export default RoomFormContainer
