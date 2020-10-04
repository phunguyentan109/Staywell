import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'
import { INPUT_OPTIONS } from '../../const'

GenerateBill.propTypes = {}

function GenerateBill(props) {
  return (
    <Fragment>
      <div className='gx-dot-arrow'>
        <div className='gx-bg-primary gx-hover-arrow'>
          <i className='icon icon-pricing-table gx-text-white'/>
        </div>
        <div className='gx-dot'>
          <i className='icon icon-ellipse-v gx-text-primary'/>
        </div>
      </div>
      <Modal
        title='Bill Generation'
        visible={state.modal}
        onCancel={() => toggle('modal')}
        onOk={hdProcess}
        confirmLoading={state.process}
        { ...props }
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

    </Fragment>
  )
}

export default Form.create({ name: 'bill-form' })(GenerateBill)