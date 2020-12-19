import React, { useCallback } from 'react'
import { Card, Button, Input, Form, Modal } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { INPUT_OPTIONS } from '../modules/const'
import { useToggle } from 'hooks'
import { billApi, call } from 'constants/api'

function BillItem({ bill, apiParams, form, onAfterUpdate, hdCheckout, lastNumber, allowGenerate, allowPayment }) {
  const [pairs, togglePairs] = useToggle({ modal: false })

  const hdSubmit = useCallback(async() => {
    let { number } = form.getFieldsValue()
    let updateBill = await call(...billApi.generate(apiParams.contract_id, bill._id,), { number, lastNumber })
    updateBill && onAfterUpdate(updateBill)
  }, [apiParams, bill._id, form, lastNumber, onAfterUpdate])

  const hdChange = useCallback(e => {
    const { value } = e.target
    form.setFieldsValue({ number: value })
  }, [form])

  return (
    <Card className='gx-card'>
      <div className='d-flex align-items-center'>
        <div>
          <div className='d-flex align-items-center'>
            <i className='icon icon-files'/>
            <small>#{bill._id.substring(0, 4)}</small>
          </div>
          <div>Deadline on <b>{bill.deadline}</b></div>
        </div>
      </div>
      <div>Electric: { _.get(bill, 'electric.number', 'None') }</div>
      <div>Water: {bill.water || 'None'}</div>
      <div>Wifi: {bill.wifi || 'None'}</div>
      <div>Living: {bill.living || 'None'}</div>
      <div>Deadline: {bill.deadline}</div>
      { bill.paidDate && <div>Paid at {bill.paidDate}</div> }
      {
        allowGenerate && <>
          <Button type='primary'>Generate Bill</Button>
          <Modal
            title='Open new contract'
            visible={pairs.modal}
            onCancel={() => togglePairs(['modal'])}
            onOk={hdSubmit}
            confirmLoading={pairs.process}
          >
            <Form layout='horizontal'>
              <p>Last used electric number: {lastNumber}</p>
              <Form.Item
                label='Electric Number'
                labelCol={{ xs: 24, sm: 6 }}
                wrapperCol={{ xs: 24, sm: 16 }}
              >
                {
                  form.getFieldDecorator('number', INPUT_OPTIONS.electric())(
                    <Input type='number' placeholder='Enter the electric number' onChange={hdChange}/>
                  )
                }
              </Form.Item>
            </Form>
          </Modal>
        </>
      }
      { allowPayment && <Button onClick={hdCheckout}>Checkout</Button> }
    </Card>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object,
  onAfterUpdate: PropTypes.func,
  hdCheckout: PropTypes.func,
  apiParams: PropTypes.object,
  form: PropTypes.object,
  lastNumber: PropTypes.number,
  allowGenerate: PropTypes.bool,
  allowPayment: PropTypes.bool
}

BillItem.defaultProps = {
  lastNumber: 0,
  allowGenerate: false,
  allowPayment: false
}

export default Form.create({ name: 'bill-form' })(BillItem)
