import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ContractList from '../component/ContractList'
import { notify, offLoading, onLoading } from 'constants/func'
import { call, contractApi } from 'constants/api'
import moment from 'moment'
import _ from 'lodash'
import { useList } from 'hooks'

function ContractListContainer(props) {
  const [contracts, setContracts] = useList([])
  const [contractId, setContractId] = useState(null)
  const [lastElectricNumber, setLastElectricNumber] = useState(0)
  const [bills, setBills, updateBills] = useList([], true)
  const { roomId } = props

  const getContracts = useCallback(async() => {
    if (roomId) {
      onLoading()
      let rs = await call(...contractApi.get(roomId))
      if (rs.status === 200) {
        setContracts(rs.data)
        setContractId(null)
      }
      offLoading()
    }
  }, [roomId, setContracts])

  const getLastElectric = useCallback(async() => {
    if (contractId) {
      let rs = await call(...contractApi.getElectric(roomId, contractId))
      if (rs.status === 200) setLastElectricNumber(rs.data)
    }
  }, [contractId, roomId])

  useEffect(() => { getContracts() }, [getContracts])
  useEffect(() => { getLastElectric() }, [getLastElectric])

  const hdUpdateBill = useCallback(bill => {
    updateBills(bill)
    setLastElectricNumber(bill.electric.number)
    notify('success')
  }, [updateBills])

  const getBills = useCallback(contractId => async() => {
    if (contractId) {
      onLoading()
      let rs = await call(...contractApi.getOne(roomId, contractId))
      if (rs.status === 200) {
        setBills(_.get(rs, 'data.bill_id').sort((a, b) => moment(a).diff(moment(b))))
      }
      return offLoading()
    }
    return setBills([])
  }, [roomId, setBills])

  useEffect(() => { getBills() }, [getBills])

  return (
    <ContractList
      {...props}
      contracts={contracts}
      contractId={contractId}
      lastElectric={lastElectricNumber}
      getLastElectric={getLastElectric}
      bills={bills}
      hdUpdateBill={hdUpdateBill}
    />
  )
}

ContractListContainer.propTypes = {
  roomId: PropTypes.string
}

export default ContractListContainer
