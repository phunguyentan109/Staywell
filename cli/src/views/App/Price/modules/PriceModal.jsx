import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'

import { PRICE_INPUTS } from './const'

const FormItem = Form.Item

function PriceModal ({ price, refresh }) {
  const [visible, setVisible] = useState(false)
  const [price, hdPrice] = useState(price)
  const [processing, setProcessing] = useState(false)

  function hdChange(e) {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }

  function hdOk () {

  }

  function toggle() {
    setVisible(prev => !prev)
  }

  return (
    <Modal
      title='Create New Price'
      visible={visible}
      onOk={hdOk}
      confirmLoading={processing}
      onCancel={toggle}
    >
      <Form layout='horizontal'>
        {
          PRICE_INPUTS.map((input, i) => (
            <FormItem
              key={i}
              label={input.label}
              labelCol={{ xs: 24, sm: 6 }}
              wrapperCol={{ xs: 24, sm: 16 }}
            >
              <Input
                type={input.type || 'number'}
                placeholder={`Please enter the ${input.name}`}
                name={input.name}
                value={price[input.name]}
                onChange={hdChange}
              />
            </FormItem>
          ))
        }
      </Form>
    </Modal>
  )
}

export default PriceModal