import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

import { PRICE_INPUTS } from './const'
import { apiPrice } from 'constants/api'

const FormItem = Form.Item

function PriceModal ({ visible, price, refresh, notify, toggle }) {
  const [fd, setFD] = useState(price)
  const [processing, setProcessing] = useState(false)

  function hdChange(e) {
    let { value, name } = e.target
    setFD(prev => ({ ...prev, [name]: value }))
  }

  async function hdOk () {
    setProcessing(true)
    try {
      let data = fd._id ? await apiPrice.update(fd._id, fd) : await apiPrice.create(fd)
      refresh(data)
      notify('success')
    } catch (error) {
      notify('error')
    }
    setProcessing(false)
  }

  return (
    <Modal
      title={fd._id ? 'Update Price Information' : 'Create New Price'}
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
                value={fd[input.name]}
                onChange={hdChange}
              />
            </FormItem>
          ))
        }
      </Form>
    </Modal>
  )
}

PriceModal.propTypes = {
  visible: PropTypes.bool,
  price: PropTypes.object,
  refresh: PropTypes.func,
  notify: PropTypes.func,
  toggle: PropTypes.func
}

export default PriceModal
