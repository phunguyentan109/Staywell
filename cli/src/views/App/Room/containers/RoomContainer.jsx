import React, { useCallback, useEffect } from 'react'
import Room from '../components/Room'
import { useList } from 'hooks'
import { roomApi, call } from 'constants/api'
import { notify, tgLoading } from 'constants/func'

function RoomContainer() {
  const [rooms, setRooms, updateRooms] = useList([])

  const getRooms = useCallback(async() => {
    let rs = await call(...roomApi.get())
    if (rs.status !== 200) return notify('error')
    setRooms(rs.data)
  }, [setRooms])

  const load = useCallback(async() => {
    await getRooms()
    tgLoading()
  }, [getRooms])

  useEffect(() => { load() }, [load])

  return (
    <Room
      rooms={rooms}
      updateRooms={updateRooms}
    />
  )
}

export default RoomContainer
