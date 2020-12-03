import React, { useCallback, useEffect, useRef } from 'react'
import Loading from 'components/Loading'
import Room from '../components/Room'
import { useList } from 'hooks'
import { roomApi, notify, call } from 'constants/api'

function RoomContainer() {
  const [rooms, setRooms, updateRooms] = useList([])
  // const [price, setPrice] = useState([])
  const loadRef = useRef({})

  const getRooms = useCallback(async() => {
    // try {
    loadRef.current.toggle()
    let rs = await call(...roomApi.get())
    if (rs.status === 200) setRooms(rs.data)
    loadRef.current.toggle()
    // } catch (e) {
    //   console.error(e)
    //   notify('error')
    // }
  }, [setRooms])

  // const getPrice = useCallback(async() => {
  //   try {
  //     loadRef.current.toggle()
  //     let priceData = await call(...priceApi.get())
  //     setPrice(priceData)
  //   } catch (e) {
  //     console.error(e)
  //     notify('error')
  //   }
  // }, [])

  const load = useCallback(async() => {
    loadRef.current.toggle()
    await getRooms()
    // await getPrice()
    loadRef.current.toggle()
  }, [getRooms])

  useEffect(() => { load() }, [load])

  return (
    <Loading ref={loadRef}>
      <Room
        rooms={rooms}
        updateRooms={updateRooms}
        // price={price}
      />
    </Loading>
  )
}

export default RoomContainer
