import React, { useCallback } from 'react'
import { Card, Input, Form } from 'antd'
import PropTypes from 'prop-types'
import { apiBill } from 'constants/api'
import _ from 'lodash'
import { INPUT_OPTIONS } from '../modules/const'
// import GenerateBill from '../modules/GenerateBill'

function BillItem({ bill, apiParams, form, onAfterUpdate, lastNumber, allowGenerate, allowPayment }) {
  async function hdSubmit() {
    let { number } = form.getFieldsValue()
    let updateBill = await apiBill.generate({
      ...apiParams,
      bill_id: bill._id,
      data: { number, lastNumber }
    })
    updateBill && onAfterUpdate(updateBill)
  }

  const hdCheckout = useCallback(async() => {
    const paidBill = await apiBill.updatePayment({ ...apiParams, bill_id: bill._id })
    paidBill && onAfterUpdate(paidBill)
  }, [apiParams, bill._id, onAfterUpdate])

  const hdChange = useCallback(e => {
    const { value } = e.target
    form.setFieldsValue({ number: value })
  }, [form])

  // return (
  //   <Card className='gx-card gx-dot-arrow-hover'>
  //     <div className='gx-user-wid-row'>
  //       <div className='d-flex align-items-center'>
  //         <div>
  //           <div className='d-flex align-items-center'>
  //             <i className='icon icon-files'/>
  //             <small>#{bill._id.substring(0, 4)}</small>
  //           </div>
  //           <div>Deadline on <b>{bill.deadline}</b></div>
  //         </div>
  //         <div className='gx-dot-arrow'>
  //           <div className='gx-bg-primary gx-hover-arrow'>
  //             <i className='icon icon-long-arrow-right gx-text-white'/>
  //           </div>
  //           <div className='gx-dot'>
  //             <i className='icon icon-ellipse-v gx-text-primary'/>
  //           </div>
  //       </div>
  //     </div>
  //     {/*<div>Bill: #{bill._id.substring(0, 4)}</div>*/}
  //     {/*<div>Electric: { _.get(bill, 'electric.number', 'None') }</div>*/}
  //     {/*<div>Water: {bill.water || 'None'}</div>*/}
  //     {/*<div>Wifi: {bill.wifi || 'None'}</div>*/}
  //     {/*<div>Living: {bill.living || 'None'}</div>*/}
  //     {/*<div>Deadline: {bill.deadline}</div>*/}
  //     {/*{ bill.paidDate && <div>Paid at {bill.paidDate}</div> }*/}
  //     {/*{*/}
  //     {/*  allowGenerate && <BillModal onSubmit={hdSubmit}>*/}
  //     {/*    <Form layout='horizontal'>*/}
  //     {/*      <p>Last used electric number: {lastNumber}</p>*/}
  //     {/*      <Form.Item*/}
  //     {/*        label='Electric Number'*/}
  //     {/*        labelCol={{ xs: 24, sm: 6 }}*/}
  //     {/*        wrapperCol={{ xs: 24, sm: 16 }}*/}
  //     {/*      >*/}
  //     {/*        {*/}
  //     {/*          form.getFieldDecorator('number', INPUT_OPTIONS.electric())(*/}
  //     {/*            <Input type='number' placeholder='Enter the electric number' onChange={hdChange}/>*/}
  //     {/*          )*/}
  //     {/*        }*/}
  //     {/*      </Form.Item>*/}
  //     {/*    </Form>*/}
  //     {/*  </BillModal>*/}
  //     {/*}*/}
  //     {/*{ allowPayment && <Button onClick={hdCheckout}>Checkout</Button> }*/}
  //   </Card>
  // )

  return (
    <Card className='gx-card gx-dot-arrow-hover'>
      <div className='gx-user-wid-row'>
        <div className='d-flex align-items-center'>
          <div>
            <div className='d-flex mb-sm'>
              <i className='icon icon-files mr-xs'/>
              <span>#{bill._id.substring(0, 4)}</span>
            </div>
            <div>Deadline on <b>{bill.deadline}</b></div>
          </div>
          {/*{ allowGenerate && <GenerateBill /> }*/}
        </div>
      </div>
    </Card>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object,
  onAfterUpdate: PropTypes.func,
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
