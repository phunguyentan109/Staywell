import React from 'react'
import { Card, Button } from 'antd'
import PropTypes from 'prop-types'

export default function BillItem({ bill }) {
  return (
    <Card className='gx-card'>
      <div>Bill: #{bill._id.substring(0, 4)}</div>
      <div>Electric: {bill.electric || 'None'}</div>
      <div>Water: {bill.water || 'None'}</div>
      <div>Wifi: {bill.wifi || 'None'}</div>
      <div>Living: {bill.living || 'None'}</div>
      <Button>Generate Bill</Button>
    </Card>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object
}
