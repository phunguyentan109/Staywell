import React, { useCallback } from 'react'
import { Card, Button, Input, Form, Modal } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { INPUT_OPTIONS } from '../modules/const'
import { useToggle } from 'hooks'

function BillItem({ bill, hdOpenBill, lastNumber, allowGenerate, hdCheckout }) {
  const [pairs, togglePairs] = useToggle({ modal: false })

  const hdSubmit = useCallback(async() => {
    //'../modules/const' let { number } = form.getFieldsValue()
    // hdOpenBill(number, bill._id)
  }, [])

  const hdChange = useCallback(e => {
    const { value } = e.target
    // form.setFieldsValue({ number: value })
  }, [])

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
          <Button type='primary' onClick={() => togglePairs()}>Generate Bill</Button>
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
                {/*{*/}
                {/*  form.getFieldDecorator('number', INPUT_OPTIONS.electric())(*/}
                {/*    <Input type='number' placeholder='Enter the electric number' onChange={hdChange}/>*/}
                {/*  )*/}
                {/*}*/}
                <Input type='number' placeholder='Enter the electric number' onChange={hdChange}/>
              </Form.Item>
            </Form>
          </Modal>
        </>
      }
      { bill.electric && !bill.paidDate && <Button onClick={hdCheckout}>Checkout</Button> }
    </Card>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object,
  hdOpenBill: PropTypes.func,
  hdCheckout: PropTypes.func,
  form: PropTypes.object,
  lastNumber: PropTypes.number,
  allowGenerate: PropTypes.bool,
}

BillItem.defaultProps = {
  lastNumber: 0,
  allowGenerate: false,
  allowPayment: false
}

export default BillItem
