import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ContractList from '../component/ContractList'
import { offLoading, onLoading } from 'constants/func'
import { call, contractApi } from 'constants/api'
import { useList } from 'hooks'

function ContractListContainer(props) {
  const [contracts, setContracts] = useList([])
  const [lastElectricNumber, setLastElectricNumber] = useState(0)
  const [bills, setBills, updateBills] = useList([], true)
  const { room_id, contract_id } = props

  const selectRoom = useCallback(async() => {
    if (room_id) {
      onLoading()
      let rs = await call(...contractApi.get(room_id))
      if (rs.status === 200) {
        setContracts(rs.data)
        // setIds({ contract_id: null, room_id })
        // setBills([])
      }
      offLoading()
    }
  }, [room_id, setContracts])

  const getLastElectric = useCallback(async() => {
    if (contract_id) {
      let rs = await call(...contractApi.getElectric(room_id, contract_id))
      if (rs.status === 200) setLastElectricNumber(rs.data)
    }
  }, [contract_id, room_id])

  useEffect(() => { selectRoom() }, [selectRoom])
  useEffect(() => { getLastElectric() }, [getLastElectric])

  return (
    <ContractList
      {...props}
      contracts={contracts}
      lastElectric={lastElectricNumber}
      bills={bills}
    />
  )
}

ContractListContainer.propTypes = {
  room_id: PropTypes.number,
  contract_id: PropTypes.number
}

export default ContractListContainer
