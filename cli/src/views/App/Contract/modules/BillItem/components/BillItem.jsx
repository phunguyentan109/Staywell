import React, { useState, useEffect, useCallback } from 'react'
import { Card, Button, Input, Form } from 'antd'
import PropTypes from 'prop-types'
import withToggleModal from 'hocs/withToggleModal'
import { apiContract } from 'constants/api'

const FormItem = Form.Item

const BillModal = withToggleModal(
  () => <Button type='primary'>Generate Bill</Button>,
  { title: 'Bill Generation' }
)

export default function BillItem({ bill }) {
  const [electric, setElectric] = useState(0)

  const load = useCallback(() => {

  }, [])

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
          <FormItem
            label='Type'
            labelCol={{ xs: 24, sm: 6 }}
            wrapperCol={{ xs: 24, sm: 16 }}
          >
            <Input
              type='number'
              placeholder='Enter the electric...'
              value={electric}
              onChange={hdChange}
            />
          </FormItem>
        </Form>
      </BillModal>
    </Card>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object
}
