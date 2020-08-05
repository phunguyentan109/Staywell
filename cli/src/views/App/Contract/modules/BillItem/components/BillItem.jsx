import React, { useState, useEffect, useCallback } from 'react'
import { Card, Button, Input, Form } from 'antd'
import PropTypes from 'prop-types'
import withToggleModal from 'hocs/withToggleModal'
import { apiBill } from 'constants/api'
import _ from 'lodash'
import { INPUT_OPTIONS } from '../modules/const'

const BillModal = withToggleModal(
  () => <Button type='primary'>Generate Bill</Button>,
  { title: 'Bill Generation' }
)

function BillItem({ bill, apiParams, form, onAfterUpdate, lastNumber }) {
  async function hdSubmit() {
    let { number } = form.getFieldsValue()
    let updateBill = await apiBill.generate({
      ...apiParams,
      bill_id: bill._id,
      data: { number, lastNumber }
    })
    onAfterUpdate(updateBill)
  }

  function hdChange(e) {
    const { value } = e.target
    form.setFieldsValue({ number: value })
  }

  return (
    <Card className='gx-card'>
      <div>Bill: #{bill._id.substring(0, 4)}</div>
      <div>Electric: { _.get(bill, 'electric.number', 'None') }</div>
      <div>Water: {bill.water || 'None'}</div>
      <div>Wifi: {bill.wifi || 'None'}</div>
      <div>Living: {bill.living || 'None'}</div>
      <BillModal onSubmit={hdSubmit}>
        <Form layout='horizontal'>
          <p>Last used electric number: {lastNumber}</p>
          <Form.Item
            label='Electric Number'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 16 }}
          >
            {
              form.getFieldDecorator('number', INPUT_OPTIONS.electric())(
                <Input type='number' placeholder='Enter the electric...' onChange={hdChange}/>
              )
            }
          </Form.Item>
        </Form>
      </BillModal>
    </Card>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object,
  onAfterUpdate: PropTypes.func,
  apiParams: PropTypes.object,
  form: PropTypes.object,
  lastNumber: PropTypes.number
}

BillItem.defaultProps = {
  lastNumber: 0
}

export default Form.create({ name: 'bill-form' })(BillItem)
