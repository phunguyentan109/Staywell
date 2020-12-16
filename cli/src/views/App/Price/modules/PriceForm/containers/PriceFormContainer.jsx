import React, { useCallback } from 'react'

import PropTypes from 'prop-types'
import PriceForm from '../components/PriceForm'
import { call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'

export default function PriceFormContainer({ api, updateListPrice, ...props }) {
  const hdSubmit = useCallback(async(price) => {
    onLoading()
    let rs = await call(...api, price)
    if (rs.status === 200) {
      updateListPrice(rs.data)
      notify('success')
    }
    offLoading()
    return rs
  }, [api, updateListPrice])

  return (
    <PriceForm
      {...props}
      hdSubmit={hdSubmit}
    />
  )
}

PriceFormContainer.propTypes = {
  api: PropTypes.array,
  updateListPrice: PropTypes.func
}