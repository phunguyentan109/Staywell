import React, { useCallback, useEffect, useState } from 'react'
import BillList from '../component/BillList'
import PropTypes from 'prop-types'
import { notify, offLoading, onLoading } from 'constants/func'
import { billApi, call, contractApi } from 'constants/api'
import _ from 'lodash'
import moment from 'moment'
import { useList } from 'hooks'

function BillListContainer(props) {
  const [bills, setBills, updateBills] = useList([], true)
  const [lastElectricNumber, setLastElectricNumber] = useState(0)
  const { contractId, roomId } = props

  const getBills = useCallback(async() => {
    if (contractId) {
      onLoading()
      let rs = await call(...contractApi.getOne(roomId, contractId))
      if (rs.status === 200) {
        setBills(_.get(rs, 'data.bill_id').sort((a, b) => moment(a).diff(moment(b))))
      }
      return offLoading()
    }

    return setBills([])
  }, [contractId, roomId, setBills])

  const getLastElectric = useCallback(async() => {
    if (contractId) {
      let rs = await call(...contractApi.getElectric(roomId, contractId))
      if (rs.status === 200) setLastElectricNumber(rs.data)
    }
  }, [contractId, roomId])

  const hdOpenBill = useCallback(async(number, billId) => {
    let rs = await call(...billApi.generate(contractId, billId,), { number, lastNumber: lastElectricNumber })
    if (rs.status === 200) {
      updateBills(rs.data)
      setLastElectricNumber(number)
      notify('success')
    }
  }, [contractId, lastElectricNumber, updateBills])

  const hdCheckout = useCallback(async(billId) => {
    const rs = await call(...billApi.updatePayment(contractId, billId))
    if (rs.status === 200) {
      updateBills(rs.data)
      setLastElectricNumber(_.get(rs, 'data.electric.number'))
      notify('success')
    }
  }, [contractId, updateBills])

  useEffect(() => { getBills() }, [getBills])
  useEffect(() => { getLastElectric() }, [getLastElectric])

  return (
    <BillList
      {...props}
      bills={bills}
      hdOpenBill={hdOpenBill}
      hdCheckout={hdCheckout}
    />
  )
}

BillListContainer.propTypes = {
  contractId: PropTypes.string,
  roomId: PropTypes.string
}

export default BillListContainer
