import React, { useCallback, useRef, useState } from 'react'
import RoomForm from '../component/RoomForm'
import PropTypes from 'prop-types'
import { call, priceApi } from 'constants/api'
import { notify, tgLoading } from 'constants/func'

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
    tgLoading()
    let rs = await call(...priceApi.get())
    if (rs.status !== 200) return notify('error')
    setPrice(rs.data)
    tgLoading()
  }, [])

  return (
    <RoomForm
      {...props}
      hdSubmit={hdSubmit}
      price={price}
      getPrice={getPrice}
    />
  )
}

RoomFormContainer.propTypes = {
  api: PropTypes.array,
  updateRooms: PropTypes.func
}

export default RoomFormContainer
