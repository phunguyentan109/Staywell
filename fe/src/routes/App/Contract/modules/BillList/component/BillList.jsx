import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Col } from 'antd'
import BillItem from '../modules/BillItem'

function BillList({ bills, lastElectric, contractId, hdCheckout }) {
  const nextGenerateAllowId = useMemo(() => {
    if (!!bills.length) {
      let nextGenerateBill = _.find(bills, b => !b.electric)
      return nextGenerateBill._id
    }
  }, [bills])

  return (
    <>
      {
        _.map(bills, bill => (
          <Col span={8} key={bill._id}>
            <BillItem
              contractId={contractId}
              bill={bill}
              lastNumber={lastElectric}
              hdCheckout={hdCheckout}
              allowGenerate={nextGenerateAllowId === bill._id}
            />
          </Col>
        ))
      }
    </>
  )
}

BillList.propTypes = {
  bills: PropTypes.array,
  lastElectric: PropTypes.number,
  hdCheckout: PropTypes.func,
  contractId: PropTypes.string
}

export default BillList
