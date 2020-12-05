import React, { useCallback, useState } from 'react'
import RoomForm from '../component/RoomForm'
import PropTypes from 'prop-types'
import { call, priceApi } from 'constants/api'
import { notify, onLoading, offLoading } from 'constants/func'

function RoomFormContainer({ api, updateRooms, ...props }) {
  const [price, setPrice] = useState([])

  const hdSubmit = useCallback(async(room) => {
    onLoading()
    let rs = await call(...api, room)
    if (rs.status === 200) {
      updateRooms(rs.data)
      notify('success')
    }
    offLoading()
    return rs
  }, [api, updateRooms])

  const getPrice = useCallback(async() => {
    onLoading()
    let rs = await call(...priceApi.get())
    if (rs.status === 200) setPrice(rs.data)
    offLoading()
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
