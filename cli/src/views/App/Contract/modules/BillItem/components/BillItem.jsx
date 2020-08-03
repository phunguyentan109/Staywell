import React, { useState, useEffect, useCallback } from 'react'
import { Card, Button, Input, Form } from 'antd'
import PropTypes from 'prop-types'
import withToggleModal from 'hocs/withToggleModal'
import { apiContract } from 'constants/api'
import { INPUT_OPTIONS } from '../modules/const'

const BillModal = withToggleModal(
  () => <Button type='primary'>Generate Bill</Button>,
  { title: 'Bill Generation' }
)

function BillItem({ bill, apiParams, form }) {
  const [electric, setElectric] = useState(0)
  const [lastElectric, setLastElectric] = useState(0)

  const load = useCallback(async() => {
    let electricInfo = await apiContract.getElectric(apiParams)
    setLastElectric(electricInfo.electric)
  }, [apiParams])

  useEffect(() => {
    load()
  }, [load])

  function hdSubmit() {
    console.log('submit')
  }

  function hdChange(e) {
    const { value } = e.target
    setElectric(value)
  }

  return (
    <Card className='gx-card'>
      <div>Bill: #{bill._id.substring(0, 4)}</div>
      <div>Electric: {bill.electric || 'None'}</div>
      <div>Water: {bill.water || 'None'}</div>
      <div>Wifi: {bill.wifi || 'None'}</div>
      <div>Living: {bill.living || 'None'}</div>
      <BillModal onSubmit={hdSubmit}>
        <Form layout='horizontal'>
          <p>Last used electric number: {lastElectric}</p>
          <Form.Item
            label='Electric Number'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 16 }}
          >
            {
              form.getFieldDecorator('electric', INPUT_OPTIONS.electric())(
                <Input
                  type='number'
                  placeholder='Enter the electric...'
                  value={electric}
                  onChange={hdChange}
                />
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
  apiParams: PropTypes.object,
  form: PropTypes.object
}

export default Form.create({ name: 'bill-form' })(BillItem)
