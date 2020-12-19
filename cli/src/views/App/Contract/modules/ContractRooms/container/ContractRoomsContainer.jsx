import React, { useCallback, useEffect, useState } from 'react'
import ContractRooms from '../component/ContractRooms'
import { offLoading, onLoading } from 'constants/func'
import { roomApi, call } from 'constants/api'

function ContractRoomsContainer(props) {
  const [rooms, setRooms] = useState([])

  const load = useCallback(async () => {
    onLoading()
    let rs = await call(...roomApi.get())
    if (rs.status === 200) setRooms(rs.data)
    offLoading()
  }, [])

  useEffect(() => { load() }, [load])

  return <ContractRooms {...props} rooms={rooms} />
}

export default ContractRoomsContainer
