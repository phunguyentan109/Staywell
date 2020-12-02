import React, { useCallback, useEffect, useRef, useState } from 'react'
import Loading from 'components/Loading'
import Room from '../components/Room'
import { useList } from 'hooks'
import { roomApi, notify, priceApi, call } from 'constants/api'

function RoomContainer() {
  const [rooms, setRooms, updateRooms] = useList([])
  const [price, setPrice] = useState([])
  const loadRef = useRef({})

  const getRooms = useCallback(async() => {
    try {
      loadRef.current.toggle()
      let roomData = await call(...roomApi.get())
      setRooms(roomData)
    } catch (e) {
      console.error(e)
      notify('error')
    }
  }, [setRooms])

  const getPrice = useCallback(async() => {
    try {
      loadRef.current.toggle()
      let priceData = await call(...priceApi.get())
      setPrice(priceData)
    } catch (e) {
      console.error(e)
      notify('error')
    }
  }, [])

  const load = useCallback(async() => {
    loadRef.current.toggle()
    await getRooms()
    await getPrice()
    loadRef.current.toggle()
  }, [getPrice, getRooms])

  useEffect(() => { load() }, [load])

  return (
    <Loading ref={loadRef}>
      <Room
        rooms={rooms}
        updateRooms={updateRooms}
        price={price}
      />
    </Loading>
  )
}

export default RoomContainer
