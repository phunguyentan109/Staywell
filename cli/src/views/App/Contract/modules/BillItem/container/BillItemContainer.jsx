import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import BillItem from '../components/BillItem'
import { apiBill, billApi, call } from 'constants/api'

function BillItemContainer({ form, apiParams, onAfterUpdate, ...props }) {
  const { bill, lastNumber } = props

  const hdSubmit = useCallback(async() => {
    let { number } = form.getFieldsValue()
    let rs = await call(...billApi.generate(apiParams.contract_id, bill._id),  { number, lastNumber })
    rs.status === 200 && onAfterUpdate(rs.data)
  }, [apiParams.contract_id, bill._id, form, lastNumber, onAfterUpdate])

  const hdCheckout = useCallback(async() => {
    const paidBill = await apiBill.updatePayment({ ...apiParams, bill_id: bill._id })
    paidBill && onAfterUpdate(paidBill)
  }, [apiParams, bill._id, onAfterUpdate])

  return <BillItem
    {...props}
    hdSubmit={hdSubmit}
    hdCheckout={hdCheckout}
  />
}

BillItemContainer.propTypes = {
  form: PropTypes.object,
  onAfterUpdate: PropTypes.func,
  lastNumber: PropTypes.number,
  apiParams: PropTypes.object,
  bill: PropTypes.object
}

export default BillItemContainer
