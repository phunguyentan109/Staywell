import React, { useCallback, useEffect, useState } from 'react'
import Contract from '../components/Contract'
import _ from 'lodash'
import { contractApi, call } from 'constants/api'
import { onLoading, offLoading, notify } from 'constants/func'
import { useList, useStore } from 'hooks'
import moment from 'moment'

function ContractContainer() {
  const [contracts, setContracts, updateContracts] = useList([])
  const [lastElectricNumber, setLastElectricNumber] = useState(0)
  const [bills, setBills, updateBills, resetBills] = useList([], true)
  const [ids, repIds, setIds, clearIds] = useStore({ room_id: null, contract_id: null })

  const getLastElectric = useCallback(async() => {
    if (ids.contract_id) {
      let rs = await call(...contractApi.getElectric(ids))
      if (rs.status === 200) setLastElectricNumber(rs.data)
    }
  }, [ids])

  useEffect(() => { getLastElectric() }, [getLastElectric])

  const selectRoom = useCallback(async(room_id) => {
    onLoading()
    let rs = await call(...contractApi.get(room_id))
    if (rs.status === 200) {
      setContracts(rs.data)
      setIds({ contract_id: null, room_id })
      resetBills()
    }
    offLoading()
  }, [resetBills, setContracts, setIds])

  const hdUpdateBill = useCallback(bill => {
    updateBills(bill)
    setLastElectricNumber(bill.electric.number)
    notify('success')
  }, [updateBills])

  const selectContract = useCallback(contract_id => async() => {
    onLoading()
    let rs = await call(...contractApi.getOne(ids.roomId, contract_id))
    if (rs.status === 200) {
      setBills(_.get(rs, 'data.bill_id').sort((a, b) => moment(a).diff(moment(b))))
      repIds({ contract_id: _.get(rs, 'data._id') })
    }
    offLoading()
  }, [ids.roomId, setBills, repIds])

  return <Contract
    contracts={contracts}
    bills={bills}
    ids={ids}
    clearIds={clearIds}
    lastElectric={lastElectricNumber}
    selectRoom={selectRoom}
    hdUpdateBill={hdUpdateBill}
    selectContract={selectContract}
  />
}

export default ContractContainer
